import { CATALOG } from './catalog.ts';
import { validateAttempt } from './validation.mjs';
const ORIGINS = new Set(['https://itztov4r.github.io', 'http://terminal.local:4173', 'http://localhost:8000']);
Deno.serve(async (req: Request) => {
 const origin=req.headers.get('Origin') || '';
 const headers={'Content-Type':'application/json','Vary':'Origin','Access-Control-Allow-Origin':ORIGINS.has(origin)?origin:'https://itztov4r.github.io','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type','Access-Control-Allow-Methods':'POST, OPTIONS'};
 const reply=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers});
 if(origin && !ORIGINS.has(origin))return reply({error:'ORIGIN_NOT_ALLOWED'},403);
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(req.method!=='POST')return reply({error:'METHOD_NOT_ALLOWED'},405);
 const authorization=req.headers.get('Authorization') || '';
 if(!authorization.startsWith('Bearer '))return reply({error:'AUTH_REQUIRED'},401);
 const url=Deno.env.get('SUPABASE_URL')!,anon=Deno.env.get('SUPABASE_ANON_KEY')!,service=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
 const identity=await fetch(url+'/auth/v1/user',{headers:{Authorization:authorization,apikey:anon}});
 if(!identity.ok)return reply({error:'AUTH_REQUIRED'},401);
 const user=await identity.json();if(!user.id || user.is_anonymous)return reply({error:'ACCOUNT_REQUIRED'},401);
 let attempt;
 try{const raw=await req.text();if(raw.length>40000)return reply({error:'REQUEST_TOO_LARGE'},413);attempt=validateAttempt(JSON.parse(raw),CATALOG);}
 catch(error){return reply({error:error instanceof Error?error.message:'INVALID_REQUEST'},400);}
 const recorded=await fetch(url+'/rest/v1/rpc/cq_record_completion',{method:'POST',headers:{Authorization:'Bearer '+service,apikey:service,'Content-Type':'application/json'},body:JSON.stringify({p_user_id:user.id,p_mission_id:attempt.missionId,p_stars:attempt.stars})});
 const result=await recorded.json();
 if(!recorded.ok){const message=String(result.message||'');if(/PREVIOUS_MISSION_REQUIRED|PROFILE_REQUIRED|INVALID_TIMEZONE/.test(message))return reply({error:message},400);return reply({error:'SAVE_UNAVAILABLE'},503);}
 return reply({completion:result});
});
