import { randomInt } from "crypto";
import { Server } from "../interfaces/Server";
/**
 * Random server selector
 */
export class BaseAlgo{
    protected servers: Server[]
    constructor(){
        this.servers = [];
    }
    public getServer(): Server{
        let idx =randomInt(0,this.servers.length);
        return this.servers[idx];   
    }
    public async getHealthyServer(): Promise<Server>{
        let tries = 0;
        while(tries!=this.servers.length){
            let server = this.getServer();
            if(await server.getHealth())
                return server;
            tries++;
        }
        throw new Error('No healthy server found');
    }
    public setServers(servers: Server[]): BaseAlgo{
        this.servers = servers;
        return this;
    }
}