import {Router,Request,Response} from "express";
import { BaseAlgo } from "../algorithm/BaseAlgo";
import {createProxyMiddleware} from "http-proxy-middleware";
export class ProxyRouter{
    private static instance: ProxyRouter;
    private cookie: string;
    router: Router;
    constructor(){
        this.router = Router();
        this.cookie = 'lb-affinity';
    }
    public initializeProxy(algorithm: BaseAlgo){
        this.router.all('*',async(req,res)=>{
            try{
                let server =await algorithm.getHealthyServer();
                let proxyOpts = this.getProxyOpts(server.getURI());
                let proxy =createProxyMiddleware(proxyOpts);
                proxy(req,res,(err:any)=>{
                    if(err){
                        console.log('ERROR in proxy')
                    };
                })
            }
            catch(err){
                console.log(err);
                res.send('All servers offline');
            }
        })
    }
    public getRouter(): Router{
        return this.router;
    }
    private getProxyOpts(uri: string){
        return {
            target: uri,
            changeOrigin: true,
            onProxyReq : (proxyReq : any, req: any)=>{
                proxyReq.setHeader('X-Special-Proxy-Header', '<LOAD-BALANCER>');
            },
            logLevel:'debug'
        };
    }
    public static getInstance(): ProxyRouter{
        if(!ProxyRouter.instance){
            ProxyRouter.instance = new ProxyRouter();
        }
        return ProxyRouter.instance;
    }
}