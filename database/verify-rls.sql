begin;
insert into auth.users(id) values('00000000-0000-4000-8000-00000000c001'),('00000000-0000-4000-8000-00000000c002');
insert into public.cq_profiles(user_id,name) values('00000000-0000-4000-8000-00000000c001','Fixture A'),('00000000-0000-4000-8000-00000000c002','Fixture B');
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"00000000-0000-4000-8000-00000000c001","role":"authenticated"}',true);
do $$begin
 if (select count(*) from public.cq_profiles)<>1 then raise exception 'profile isolation failed'; end if;
 if (select count(*) from public.cq_my_stats)<>1 then raise exception 'stats isolation failed'; end if;
 update public.cq_profiles set name='A changed' where user_id='00000000-0000-4000-8000-00000000c001';
 update public.cq_profiles set name='B hacked' where user_id='00000000-0000-4000-8000-00000000c002';
 if found then raise exception 'cross-account update permitted'; end if;
 insert into public.cq_drafts(user_id,mission_id,code) values('00000000-0000-4000-8000-00000000c001','html-01','<h1>Test</h1>');
 begin
 insert into public.cq_drafts(user_id,mission_id,code) values('00000000-0000-4000-8000-00000000c002','html-01','forbidden');
 raise exception 'cross-account insert permitted';
 exception when insufficient_privilege then null; end;
 begin
 insert into public.cq_progress(user_id,mission_id,stars,completed_on) values('00000000-0000-4000-8000-00000000c001','html-01',3,current_date);
 raise exception 'direct completion write permitted';
 exception when insufficient_privilege then null; end;
 begin
 perform public.cq_record_completion('00000000-0000-4000-8000-00000000c001','html-01',3);
 raise exception 'client completion RPC permitted';
 exception when insufficient_privilege then null; end;
end $$;
set local role service_role;
do $$begin
 begin
 perform public.cq_record_completion('00000000-0000-4000-8000-00000000c001','html-03',3);
 raise exception 'skipping locked mission permitted';
 exception when raise_exception then if sqlerrm<>'PREVIOUS_MISSION_REQUIRED' then raise; end if; end;
 perform public.cq_record_completion('00000000-0000-4000-8000-00000000c001','html-01',1);
 perform public.cq_record_completion('00000000-0000-4000-8000-00000000c001','html-01',3);
 perform public.cq_record_completion('00000000-0000-4000-8000-00000000c001','html-01',1);
 if (select count(*) from public.cq_progress where user_id='00000000-0000-4000-8000-00000000c001')<>1 then raise exception 'duplicate completions'; end if;
 if (select xp from public.cq_my_stats where user_id='00000000-0000-4000-8000-00000000c001')<>60 then raise exception 'XP farm possible'; end if;
 if (select stars from public.cq_progress where user_id='00000000-0000-4000-8000-00000000c001')<>3 then raise exception 'best stars not retained'; end if;
 if (select name from public.cq_profiles where user_id='00000000-0000-4000-8000-00000000c002')<>'Fixture B' then raise exception 'B changed'; end if;
end $$;
set local role anon;
do $$begin
 begin perform * from public.cq_profiles; raise exception 'anon profile read permitted';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
select 'PASS: account isolation, own writes, blocked foreign writes, blocked anonymous reads, server-only completions, unlocks, replay XP and best stars' as verification;
rollback;