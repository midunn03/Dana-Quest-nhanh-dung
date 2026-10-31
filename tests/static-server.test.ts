import { afterEach, expect, it } from 'vitest'
import { spawn, type ChildProcess } from 'node:child_process'
import { createServer, request } from 'node:http'
let child:ChildProcess|undefined
afterEach(()=>{child?.kill();child=undefined})
it('rejects malformed escaped paths without crashing the production server',async()=>{
 const reservation=createServer();await new Promise<void>(resolve=>reservation.listen(0,'127.0.0.1',resolve))
 const port=(reservation.address() as {port:number}).port
 await new Promise<void>(resolve=>reservation.close(()=>resolve()))
 child=spawn(process.execPath,['server/index.mjs'],{cwd:process.cwd(),env:{...process.env,API_PORT:String(port),API_HOST:'127.0.0.1'},stdio:['ignore','pipe','pipe']})
 await new Promise<void>((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Server did not start')),5000);child!.stdout!.on('data',()=>{clearTimeout(timer);resolve()});child!.once('error',error=>{clearTimeout(timer);reject(error)})})
 const get=(path:string)=>new Promise<number>((resolve,reject)=>{const req=request({hostname:'127.0.0.1',port,path},res=>{res.resume();resolve(res.statusCode!)});req.on('error',reject);req.end()})
 await expect(get('/%ZZ')).resolves.toBe(400)
 await expect(get('/')).resolves.toBe(200)
})
