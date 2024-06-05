
import axios from "axios"
export class Server{
    private id : string
    private uri : string
    private api : string
    private alive : Boolean
    private timerId : NodeJS.Timeout
    constructor(uri,api){
        this.id = 
        this.uri = uri;
        this.api = api || 'health';
        this.alive = false;
        //initiate watcher
        //this.timerId =setTimeout(this.checkHealth,2000);
    }
    public async checkHealth(){
        try{
            let resp = await axios.get(this.uri+"/"+this.api,{
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
    public getHealth(){
        return this.alive;
    }
    public shutWatcher(){
        if(this.timerId)
            clearInterval(this.timerId);
    }
}