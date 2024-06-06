import { BaseAlgo } from "./BaseAlgo";
import { Server } from "../interfaces/Server";
export class RoundRobin extends BaseAlgo{
    private counter: number
    constructor(servers: Server[]){
        super(servers);
        this.counter = 0;
    }
    public getServer(){
        let server = this.servers[this.counter];
        this.counter = (this.counter+1)%this.servers.length;
        return server;
    }
} 