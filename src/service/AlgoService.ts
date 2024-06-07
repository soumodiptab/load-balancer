import { Server } from "../interfaces/Server";
import { RoundRobinAlgo } from "../algorithm/RoundRobin";
import { WeightBasedAlgo } from "../algorithm/WeightBasedAlgo";
import { BaseAlgo } from "../algorithm/BaseAlgo";
export class AlgoService{
    static instances: Map<string, BaseAlgo> = new Map();
    static getRoundRobin(): RoundRobinAlgo{
        return new RoundRobinAlgo();
    }
    static getWeightBased(): WeightBasedAlgo{
        return new WeightBasedAlgo();
    }
    static getBaseAlgo(){
        return new BaseAlgo();
    }
    static get(algorithm: string): BaseAlgo{
        if(!algorithm)algorithm = 'default';
        if(AlgoService.instances.has(algorithm)){
            return AlgoService.instances.get(algorithm) || new BaseAlgo();
        }
        switch(algorithm){
            case 'roundRobin':
                AlgoService.instances.set(algorithm,AlgoService.getRoundRobin());
            case 'weightBased':
                AlgoService.instances.set(algorithm,AlgoService.getWeightBased());
            default:
                AlgoService.instances.set(algorithm,AlgoService.getBaseAlgo());
        }
        return AlgoService.instances.get(algorithm) || new BaseAlgo();
    }
}