export class Metrics{
    private loadAvg: number
    private memory: number
    private cpu: number
    private network: number
    constructor(){}
    public set(loadAvg,memory,cpu,network) : void {
        this.loadAvg=loadAvg;
        this.memory=memory;
        this.network=network;
        this.cpu=cpu;
    }/**
     * 
     * @returns get weight from metrics
     */
    public get(): number{
        return this.loadAvg;
    }
}