import express, { Express , Request, Response} from "express"
export class LoadBalancer{
    app: Express
    port : number
    constructor(){
        this.app = express();
        this.port = 4000;
    }
    public start(){
        this.app.listen(this.port,()=>{
            console.log(":: Initialized LOAD BALANCER ::");
        })
    }
    public stop(){
        
    }
}