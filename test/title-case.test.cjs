const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
function load(extra = {}) {
 const ctx = vm.createContext(extra)
 vm.runInContext(fs.readFileSync('src/script.js','utf8').replace('export default function (context)', 'function onRun(context)'),ctx)
 return ctx
}
test('articles stay lowercase inside a title',()=>{
 assert.equal(load().toTitleCase('a walk in a park'),'A Walk in a Park')
})
test('processing symbol overrides continues to the next selected layer',()=>{
 const symbolClass = {}, textClass = {}, stringClass = {}
 const old = {title:{class:()=>({isSubclassOfClass_:()=>true}),toString:()=> 'a walk in a park'}}
 old.objectForKey = key=>old[key]
 const overrides={...old,allKeys:()=>({count:()=>1,objectAtIndex:()=> 'title'})}
 let value
 const symbol={class:()=>symbolClass,overrides:()=>old}
 const text={class:()=>textClass,stringValue:()=> 'the next layer',setStringValue:v=>value=v}
 const ctx=load({MSSymbolInstance:symbolClass,MSTextLayer:textClass,NSString:{class:()=>stringClass},NSMutableDictionary:{dictionaryWithDictionary:()=>overrides}})
 const selection=[symbol,text];selection.count=()=>selection.length
 ctx.eachTextLayer(selection)
 assert.equal(overrides.title,'A Walk in a Park')
 assert.equal(value,'The next Layer')
})
