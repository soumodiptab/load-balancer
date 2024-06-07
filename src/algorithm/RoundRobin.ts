import { BaseAlgo } from "./BaseAlgo";
import { Server } from "../interfaces/Server";
export class RoundRobinAlgo extends BaseAlgo{
    private counter: number
    constructor(){
        super();
        this.counter = 0;
    }
    public getServer(): Server{
        let server = this.servers[this.counter];
        this.counter = (this.counter+1)%this.servers.length;
        return server;
    }
} 