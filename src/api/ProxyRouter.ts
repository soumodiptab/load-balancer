import {Router,Request,Response} from "express";
import { BaseAlgo } from "../algorithm/BaseAlgo";
import * as proxy from "http-proxy-middleware";
export class ProxyRouter{
    router: Router;
    constructor(algo : BaseAlgo){
        this.router = Router();
    }
    public initializeProxy(algorithm: BaseAlgo){
        this.router.all('*',(req,res)=>{
            let server = algorithm.getServer();
            let proxyOpts = this.getProxyOpts(server.getURI());
            proxy(proxyOpts)(req,res);
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
    
}