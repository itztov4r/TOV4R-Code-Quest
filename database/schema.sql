-- Code Quest cloud storage. This migration adds only cq_* application objects.
create table public.cq_missions (
 id text primary key, track text not null check(track in ('html','css','js')),
 position smallint not null check(position between 1 and 10), level smallint not null check(level between 1 and 3),
 xp smallint not null check(xp in (60,80,100)), title text not null, unique(track,position)
);
create table public.cq_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 name text not null check(char_length(btrim(name)) between 1 and 24),
 avatar text not null default 'robot' check(avatar in ('robot','fox','cat','alien')),
 skill_level smallint not null default 1 check(skill_level between 1 and 3),
 daily_goal smallint not null default 1 check(daily_goal between 1 and 3),
 preferred_track text not null default 'html' check(preferred_track in ('html','css','js')),
 last_track text not null default 'html' check(last_track in ('html','css','js')),
 sound boolean not null default false,
 timezone text not null default 'Europe/Paris' check(char_length(timezone) between 1 and 64),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.cq_progress (
 user_id uuid not null references public.cq_profiles(user_id) on delete cascade,
 mission_id text not null references public.cq_missions(id),
 stars smallint not null check(stars between 1 and 3),
 completed_on date not null, completed_at timestamptz not null default now(),
 updated_at timestamptz not null default now(), primary key(user_id,mission_id)
);
create table public.cq_drafts (
 user_id uuid not null references public.cq_profiles(user_id) on delete cascade,
 mission_id text not null check(mission_id ~ '^(html|css|js)-(0[1-9]|10)$|^lab-(html|css|js)$'),
 code text not null check(char_length(code)<=20000),
 updated_at timestamptz not null default now(), primary key(user_id,mission_id)
);
create index cq_progress_mission_id_idx on public.cq_progress(mission_id);
create index cq_progress_recent on public.cq_progress(user_id,completed_at desc);
create function public.cq_touch_updated_at() returns trigger language plpgsql security invoker set search_path='' as $$
begin new.updated_at=now(); return new; end $$;
revoke all on function public.cq_touch_updated_at() from public,anon,authenticated;
create trigger cq_profiles_touch before update on public.cq_profiles for each row execute function public.cq_touch_updated_at();
create trigger cq_drafts_touch before update on public.cq_drafts for each row execute function public.cq_touch_updated_at();
alter table public.cq_missions enable row level security;
alter table public.cq_profiles enable row level security;
alter table public.cq_progress enable row level security;
alter table public.cq_drafts enable row level security;
revoke all on public.cq_missions,public.cq_profiles,public.cq_progress,public.cq_drafts from anon,authenticated;
grant select on public.cq_missions to authenticated;
grant select,insert,update on public.cq_profiles,public.cq_drafts to authenticated;
grant select on public.cq_progress to authenticated;
grant all on public.cq_missions,public.cq_profiles,public.cq_progress,public.cq_drafts to service_role;
create policy cq_catalog_read on public.cq_missions for select to authenticated using(true);
create policy cq_profile_read on public.cq_profiles for select to authenticated using((select auth.uid())=user_id);
create policy cq_profile_insert on public.cq_profiles for insert to authenticated with check((select auth.uid())=user_id);
create policy cq_profile_update on public.cq_profiles for update to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
create policy cq_progress_read on public.cq_progress for select to authenticated using((select auth.uid())=user_id);
create policy cq_draft_read on public.cq_drafts for select to authenticated using((select auth.uid())=user_id);
create policy cq_draft_insert on public.cq_drafts for insert to authenticated with check((select auth.uid())=user_id);
create policy cq_draft_update on public.cq_drafts for update to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
create view public.cq_my_stats with (security_invoker=true) as
select p.user_id,count(q.mission_id)::integer as completed,coalesce(sum(m.xp),0)::integer as xp,
 coalesce(sum(q.stars),0)::integer as stars,max(q.completed_at) as last_completed_at
from public.cq_profiles p left join public.cq_progress q on q.user_id=p.user_id
left join public.cq_missions m on m.id=q.mission_id group by p.user_id;
revoke all on public.cq_my_stats from anon,authenticated;
grant select on public.cq_my_stats to authenticated,service_role;
-- Only the authenticated Edge Function may record a completion. It verifies
-- quiz answer and educational code checks before calling this invoker function.
create function public.cq_record_completion(p_user_id uuid,p_mission_id text,p_stars integer)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare v_profile public.cq_profiles%rowtype; v_mission public.cq_missions%rowtype; v_previous text; v_day date; v_row public.cq_progress%rowtype; v_new boolean;
begin
 select * into v_profile from public.cq_profiles where user_id=p_user_id;
 if not found then raise exception 'PROFILE_REQUIRED'; end if;
 select * into v_mission from public.cq_missions where id=p_mission_id;
 if not found then raise exception 'MISSION_NOT_FOUND'; end if;
 if p_stars<1 or p_stars>3 then raise exception 'INVALID_STARS'; end if;
 if not exists(select 1 from pg_catalog.pg_timezone_names where name=v_profile.timezone) then raise exception 'INVALID_TIMEZONE'; end if;
 v_day=(now() at time zone v_profile.timezone)::date;
 if v_mission.position>1 and v_mission.level>=v_profile.skill_level and not
   (v_mission.level=v_profile.skill_level and v_mission.position=(case v_profile.skill_level when 1 then 1 when 2 then 5 else 8 end)) then
  select id into v_previous from public.cq_missions where track=v_mission.track and position=v_mission.position-1;
  if not exists(select 1 from public.cq_progress where user_id=p_user_id and mission_id=v_previous)
     and not exists(select 1 from public.cq_progress where user_id=p_user_id and mission_id=p_mission_id) then
    raise exception 'PREVIOUS_MISSION_REQUIRED';
  end if;
 end if;
 v_new=not exists(select 1 from public.cq_progress where user_id=p_user_id and mission_id=p_mission_id);
 insert into public.cq_progress(user_id,mission_id,stars,completed_on) values(p_user_id,p_mission_id,p_stars,v_day)
 on conflict(user_id,mission_id) do update set stars=greatest(cq_progress.stars,excluded.stars),updated_at=now()
 returning * into v_row;
 return jsonb_build_object('new_completion',v_new,'mission_id',v_row.mission_id,'stars',v_row.stars,'date',v_row.completed_on,'completed_at',v_row.completed_at,'xp',v_mission.xp);
end $$;
revoke all on function public.cq_record_completion(uuid,text,integer) from public,anon,authenticated;
grant execute on function public.cq_record_completion(uuid,text,integer) to service_role;
insert into public.cq_missions(id,track,position,level,xp,title) values
('html-01','html',1,1,60,'Le premier bloc'),
('html-02','html',2,1,60,'L’ossature du document'),
('html-03','html',3,1,60,'Les portes du web'),
('html-04','html',4,1,60,'L’inventaire'),
('html-05','html',5,2,80,'Le monde en images'),
('html-06','html',6,2,80,'La carte de la page'),
('html-07','html',7,2,80,'Le message au camp'),
('html-08','html',8,3,100,'Les archives'),
('html-09','html',9,3,100,'Les portes accessibles'),
('html-10','html',10,3,100,'Boss : ta carte d’explorateur'),
('css-01','css',1,1,60,'La première couleur'),
('css-02','css',2,1,60,'La boîte à outils'),
('css-03','css',3,1,60,'Le texte lisible'),
('css-04','css',4,1,60,'L’alignement parfait'),
('css-05','css',5,2,80,'La grille du monde'),
('css-06','css',6,2,80,'Le petit écran'),
('css-07','css',7,2,80,'La palette magique'),
('css-08','css',8,3,100,'Le retour visuel'),
('css-09','css',9,3,100,'Le mouvement maîtrisé'),
('css-10','css',10,3,100,'Boss : le tableau de missions'),
('js-01','js',1,1,60,'Ton premier score'),
('js-02','js',2,1,60,'Le dialogue du héros'),
('js-03','js',3,1,60,'La porte du niveau'),
('js-04','js',4,1,60,'Le sac de récompenses'),
('js-05','js',5,2,80,'La fiche du joueur'),
('js-06','js',6,2,80,'Le total des récompenses'),
('js-07','js',7,2,80,'Le tri des missions'),
('js-08','js',8,3,100,'Le colis de données'),
('js-09','js',9,3,100,'Le bouclier des erreurs'),
('js-10','js',10,3,100,'Boss : le bilan de la quête');

