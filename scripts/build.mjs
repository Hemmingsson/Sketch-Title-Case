import { mkdir, cp, readFile, writeFile, rm } from 'node:fs/promises'
const root = 'plugin.sketchplugin/Contents'
await rm('plugin.sketchplugin', { recursive: true, force: true })
await mkdir(`${root}/Sketch`, { recursive: true })
await mkdir(`${root}/Resources`, { recursive: true })
await cp('src/manifest.json', `${root}/Sketch/manifest.json`)
await cp('src/icon.png', `${root}/Resources/icon.png`)
const source = await readFile('src/script.js', 'utf8')
await writeFile(`${root}/Sketch/script.js`, source.replace('export default function (context)', 'function onRun(context)'))
console.log('Built plugin.sketchplugin')
