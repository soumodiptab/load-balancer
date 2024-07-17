import {Router,Request,Response} from "express";
import { BaseAlgo } from "../algorithm/BaseAlgo";
import {createProxyMiddleware} from "http-proxy-middleware";
export class ProxyRouter{
    private static instance: ProxyRouter;
    private cookie: string;
    private proxy:any;
    private serverURI:string;
    router: Router;
    constructor(){
        this.router = Router();
        this.cookie = 'lb-affinity';
        this.serverURI ='localhost:5000'
    }
    public initializeProxy(algorithm: BaseAlgo){
        this.proxy = createProxyMiddleware({
            target: this.serverURI,
            changeOrigin:true,
            proxyTimeout:1000,
            on:{
                proxyReq: async(proxyReq,req, res)=>{
                    console.log(proxyReq,req,res);
                }
            }
        });
        this.router.use(async (req,res,next)=>{
            try{
                let server =await algorithm.getHealthyServer();
                this.proxy.target = server.getURI();
                next();
            }
            catch(err){
                console.log(err);
                res.send('All servers offline');
            }
        })
        this.router.all('/',this.proxy);
    }
    public getRouter(): Router{
        return this.router;
    }
    public static getInstance(): ProxyRouter{
        if(!ProxyRouter.instance){
            ProxyRouter.instance = new ProxyRouter();
        }
        return ProxyRouter.instance;
    }
}