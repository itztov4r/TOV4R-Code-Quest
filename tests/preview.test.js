const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
test('cancelling learner execution settles the promise and revokes its blob URL',async()=>{
 const source=fs.readFileSync(require.resolve('../app.js'),'utf8');
 const functions=source.slice(source.indexOf('function stopWorker(){'),source.indexOf('function openMission('));
 const revoked=[],workers=[];const box={replaceChildren(){},append(){}};
 const context={$:()=>box,document:{createElement:()=>({setAttribute(){},textContent:''})},Blob,URL:{createObjectURL:()=> 'blob:test',revokeObjectURL:url=>revoked.push(url)},clearTimeout(){},setTimeout:()=>1,workerTimer:null,activeWorker:null,pendingWorker:null,Worker:class{constructor(){workers.push(this)}terminate(){this.stopped=true}}};
 vm.createContext(context);vm.runInContext(functions,context);
 const result=context.renderPreview('js','while(true){}','preview',true);context.stopWorker();
 assert.equal((await result).cancelled,true);assert.equal(workers[0].stopped,true);assert.deepEqual(revoked,['blob:test']);
});
