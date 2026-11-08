const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const utils = fs.readFileSync(path.join(root,'javascript/_utils.js'),'utf8');
const autocomplete = fs.readFileSync(path.join(root,'javascript/tagAutocomplete.js'),'utf8');

function anima(preset, hashFallback) {
  const code=utils.slice(utils.indexOf('function currentUiPreset()'),utils.indexOf('// Fallback for pages without a UI preset'));
  const context={gradioApp:()=>({querySelector:()=>preset===null?null:{value:preset}}),currentModelIsAnima:hashFallback};
  vm.createContext(context);vm.runInContext(code,context);return context.checkpointIsAnima();
}
test('Anima UI preset takes precedence over a stale model hash',()=>{assert.equal(anima('anima',false),true);});
test('non-Anima UI preset clears stale Anima classification',()=>{assert.equal(anima('xl',true),false);});
test('hash detection is retained when no UI preset exists',()=>{assert.equal(anima(null,true),true);assert.equal(anima(null,false),false);});
test('settings synchronize only when autocomplete options change',()=>{
  const start=autocomplete.indexOf('let lastTacOptions = null;');
  const end=autocomplete.indexOf('\nonUiUpdate',start);
  let callback,calls=0;
  const context={opts:{tac_tagFile:'a.csv',other:0},TAC_CFG:{},syncOptions:()=>calls++,onOptionsChanged:fn=>callback=fn};
  vm.createContext(context);vm.runInContext(autocomplete.slice(start,end),context);
  callback();assert.equal(calls,1);callback();assert.equal(calls,1);
  context.opts.other=1;callback();assert.equal(calls,1);
  context.opts.tac_tagFile='b.csv';callback();assert.equal(calls,2);
});
