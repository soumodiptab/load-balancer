import express, { Express , Request, Response} from "express"
import { ProxyRouter } from "./api/ProxyRouter";
import { Server } from "./interfaces/Server";
import { AlgoService } from "./service/AlgoService";
import serverConfigs from "./servers.json"
export class LoadBalancer{
    app: Express
    port : number
    proxyRouter: ProxyRouter;
    constructor(){
        this.app = express();
        this.port =4000;
        this.proxyRouter = ProxyRouter.getInstance();
        this.init();
    }
    private init(){
        let servers = this.serverLoader();
        let algo = AlgoService.get("roundRobin").setServers(servers);
        this.proxyRouter.initializeProxy(algo);
        this.app.use("/",this.proxyRouter.getRouter());
    }
    private serverLoader(): Server[]{
        let servers =serverConfigs.map((server: any)=>{
            return new Server(server.uri,server.api);
        });
        return servers;
    }
    public start(){
        this.app.listen(this.port,()=>{
            console.log(":: Initialized LOAD BALANCER ::");
        })
    }
    public stop(){
        
    }
}