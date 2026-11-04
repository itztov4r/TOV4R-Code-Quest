'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const Core=require('../core.js'),Curriculum=require('../curriculum.js');
function harness(storage=new Map()){
 const rows={cq_profiles:{user_id:'a',name:'A',avatar:'robot',skill_level:1,daily_goal:1,preferred_track:'html',last_track:'html',sound:false},cq_progress:[],cq_drafts:[]},writes=[];
 let upsert=async()=>({error:null});
 let invoke=async()=>({data:{completion:{mission_id:'html-01',stars:3,date:'2026-11-04'}},error:null});
 const client={auth:{onAuthStateChange(){},getSession:async()=>({data:{session:null}})},functions:{invoke:(...args)=>invoke(...args)},from(table){return {select(){return this},eq(){return this},maybeSingle:async()=>({data:rows[table],error:null}),then(resolve){return Promise.resolve({data:rows[table],error:null}).then(resolve)},upsert:async data=>{writes.push({table,data});return upsert(table,data)}}}};
 const window={QUEST_CONFIG:{supabaseUrl:'https://example.invalid',publishableKey:'public'},supabase:{createClient:()=>client},addEventListener(){}};
 const context={window,location:{hash:''},QuestCore:Core,QuestCurriculum:Curriculum,EventTarget,CustomEvent,Intl,navigator:{onLine:true},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setTimeout:()=>1,clearTimeout(){}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../cloud.js'),'utf8'),context);
 return {cloud:window.QuestCloud,rows,writes,storage,context,setInvoke(fn){invoke=fn},setUpsert(fn){upsert=fn}};
}
test('cloud writes account-owned profile and drafts, never client XP',async()=>{const h=harness();h.cloud.attach({id:'a'});const state=await h.cloud.load();state.profile.name='Changed';state.drafts['html-01']='<h1>My code</h1>';state.completed['html-10']={stars:3,date:'2026-11-04'};h.cloud.stage(state);await h.cloud.flush();assert.deepEqual(h.writes.map(w=>w.table),['cq_profiles','cq_drafts']);assert.equal(h.writes[0].data.user_id,'a');assert.equal(h.writes[1].data[0].user_id,'a');assert.equal(h.cloud.status,'synced');});
test('only pending fields merge after reload; another device draft is preserved',async()=>{const storage=new Map(),a=harness(storage);a.rows.cq_drafts=[{mission_id:'lab-html',code:'old remote'}];a.cloud.attach({id:'a'});const state=await a.cloud.load();state.drafts['html-01']='my pending edit';a.context.navigator.onLine=false;a.cloud.stage(state);const b=harness(storage);b.rows.cq_drafts=[{mission_id:'lab-html',code:'new remote'}];b.cloud.attach({id:'a'});const loaded=await b.cloud.load();assert.equal(loaded.drafts['lab-html'],'new remote');assert.equal(loaded.drafts['html-01'],'my pending edit');b.cloud.attach({id:'b'});assert.equal((await b.cloud.load()).drafts['html-01'],undefined);});
test('failed completion queues code without granting progress',async()=>{const h=harness();h.cloud.attach({id:'a'});h.setInvoke(async()=>({error:{message:'network down'}}));const r=await h.cloud.complete({missionId:'html-01',code:'<h1>Code</h1>'});assert.equal(r.queued,true);assert.equal(h.cloud.status,'pending');assert.equal(h.writes.length,0);assert.equal(JSON.parse(h.storage.get('codequest-queue-a')).attempts.length,1);});
test('a response from a former account cannot complete a new account mission',async()=>{const h=harness();h.cloud.attach({id:'a'});let release,started;const began=new Promise(r=>started=r);h.setInvoke(()=>{started();return new Promise(r=>release=r)});const request=h.cloud.complete({missionId:'html-01',code:'code'});await began;h.cloud.attach({id:'b'});release({data:{completion:{mission_id:'html-01',stars:3,date:'2026-11-04'}}});await assert.rejects(request,/ACCOUNT_CHANGED/);assert.equal(h.storage.has('codequest-queue-b'),false);});


test('a stalled former account cannot block or clear a new account flush',async()=>{
 const h=harness();h.cloud.attach({id:'a'});const a=await h.cloud.load();a.profile.name='Old edit';h.cloud.stage(a);
 let releaseA,releaseB;
 h.setUpsert((table,data)=>new Promise(resolve=>{if(data.user_id==='a')releaseA=resolve;else releaseB=resolve;}));
 const old=h.cloud.flush();assert.ok(releaseA);
 h.cloud.attach({id:'b'});h.rows.cq_profiles={...h.rows.cq_profiles,user_id:'b',name:'B'};
 const b=await h.cloud.load();b.profile.name='New edit';h.cloud.stage(b);
 const current=h.cloud.flush();assert.ok(releaseB,'new account starts without waiting for old network request');
 releaseA({error:null});await old;
 let finished=false;const joined=h.cloud.flush().then(()=>finished=true);
 await Promise.resolve();assert.equal(finished,false,'old finalizer did not clear current in-flight task');
 releaseB({error:null});await Promise.all([current,joined]);
 assert.equal(h.cloud.status,'synced');assert.equal(h.writes.length,2);
});
