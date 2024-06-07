
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
export class Server{
    private id : string
    private uri : string
    private api : string
    private alive : Boolean
    //private timerId : NodeJS.Timeout
    constructor(uri:string,api:string){
        this.id = uuidv4();
        this.uri = uri;
        this.api = api || '';
        this.alive = false;
        //initiate watcher
        //this.timerId =setTimeout(this.checkHealth,2000);
    }
    public async checkHealth(): Promise<Boolean>{
        try{
            const actualURI = (this.api)? this.uri+"/"+this.api : this.uri;
            let resp = await axios.get(actualURI,{
                timeout: 1000
            });
            if(resp.status != 200)
                throw new Error('Error');
            this.alive = true;
        }
        catch(err){
            this.alive = false;
        }
        return this.alive;
    }
    public async getHealth(): Promise<Boolean>{
        return  await this.checkHealth();
    }
    public getURI(){
        return this.uri;
    }
    // public shutWatcher(){
    //     if(this.timerId)
    //         clearInterval(this.timerId);
    // }
}