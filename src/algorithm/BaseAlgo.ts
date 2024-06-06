import { randomInt } from "crypto";
import { Server } from "../interfaces/Server";
/**
 * Random server selector
 */
export class BaseAlgo{
    protected servers: Server[]
    constructor(servers: Server[]){
        this.servers =servers;
    }
    public getServer(): Server{
        let idx =randomInt(0,this.servers.length);
        return this.servers[idx];   
    }
}