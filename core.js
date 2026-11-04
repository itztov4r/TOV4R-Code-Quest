/* Pure game state and educational checks. No learner JavaScript executes here. */
(function(root){
'use strict';
const VERSION=1;
function today(date=new Date()){return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');}
function initial(){return {version:VERSION,profile:null,completed:{},drafts:{},lastTrack:'html',sound:false};}
function normalize(raw,missions){
 if(!raw||typeof raw!=='object'||raw.version!==VERSION)throw new Error('Format de sauvegarde non reconnu.');
 const state=initial(),ids=new Set(missions.map(m=>m.id));
 if(raw.profile!==null){const p=raw.profile;if(!p||typeof p.name!=='string'||!p.name.trim()||p.name.length>24||![1,2,3].includes(p.level)||!['html','css','js'].includes(p.track)||![1,2,3].includes(p.goal)||!['robot','fox','cat','alien'].includes(p.avatar))throw new Error('Profil invalide.');state.profile={name:p.name.trim(),level:p.level,track:p.track,goal:p.goal,avatar:p.avatar};}
 if(!raw.completed||typeof raw.completed!=='object'||Array.isArray(raw.completed)||!raw.drafts||typeof raw.drafts!=='object'||Array.isArray(raw.drafts))throw new Error('Progression invalide.');
 for(const [id,value]of Object.entries(raw.completed)){if(!ids.has(id)||!value||![1,2,3].includes(value.stars)||!/^\d{4}-\d{2}-\d{2}$/.test(value.date)||Number.isNaN(Date.parse(value.date+'T12:00:00Z'))||new Date(value.date+'T12:00:00Z').toISOString().slice(0,10)!==value.date)throw new Error('Mission sauvegardée invalide.');state.completed[id]={stars:value.stars,date:value.date};}
 for(const [id,value]of Object.entries(raw.drafts)){if((!ids.has(id)&&!['lab-html','lab-css','lab-js'].includes(id))||typeof value!=='string'||value.length>20000)throw new Error('Brouillon invalide.');state.drafts[id]=value;}
 state.lastTrack=['html','css','js'].includes(raw.lastTrack)?raw.lastTrack:(state.profile?.track||'html');state.sound=raw.sound===true;return state;
}
function xp(state,missions){return missions.reduce((total,m)=>total+(state.completed[m.id]?m.xp:0),0);}
function streak(state,date=new Date()){
 const dates=new Set(Object.values(state.completed).map(v=>v.date));let current=new Date(date.getFullYear(),date.getMonth(),date.getDate(),12),count=0;
 if(!dates.has(today(current)))current.setDate(current.getDate()-1);
 for(let i=0;i<3660&&dates.has(today(current));i++){count++;current.setDate(current.getDate()-1);}return count;
}
function unlocked(mission,state,missions){const track=missions.filter(m=>m.track===mission.track),i=track.findIndex(m=>m.id===mission.id);if(state.completed[mission.id]||i===0)return true;const level=state.profile?.level||1;if(mission.level<level)return true;if(mission.level===level&&track.find(m=>m.level===level)?.id===mission.id)return true;return Boolean(state.completed[track[i-1]?.id]);}
function recommend(state,missions,track=state.lastTrack){const list=missions.filter(m=>m.track===track),level=state.profile?.level||1;return list.find(m=>m.level>=level&&!state.completed[m.id]&&unlocked(m,state,missions))||list.find(m=>!state.completed[m.id]&&unlocked(m,state,missions))||list.at(-1);}
function award(state,mission,stars,date=today()){const prior=state.completed[mission.id];state.completed[mission.id]={stars:Math.max(prior?.stars||0,Math.max(1,Math.min(3,stars))),date:prior?.date||date};return !prior;}
function checkCode(code,mission){if(typeof code!=='string'||code.length>20000)return [{label:'Code limité à 20 000 caractères',passed:false}];let source=code.replace(/\/\*[\s\S]*?\*\//g,'').replace(/<!--[\s\S]*?-->/g,'');return mission.challenge.checks.map(check=>({label:check.label,passed:new RegExp(check.pattern,check.flags||'').test(source)}));}
const api={VERSION,today,initial,normalize,xp,streak,unlocked,recommend,award,checkCode};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.QuestCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);

