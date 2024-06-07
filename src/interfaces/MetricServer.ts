import { Server } from "./Server";

export class Metrics extends Server{
    private loadAvg: number
    private memory: number
    private cpu: number
    private network: number
    constructor(uri:string,api:string,loadAvg: number,memory: number,cpu: number,network: number){
        super(uri,api);
        this.loadAvg=loadAvg;
        this.memory=memory;
        this.network=network;
        this.cpu=cpu;
    }
    
}