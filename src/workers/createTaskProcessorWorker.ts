import { Imsg } from "../main";

function executeWorkerFunction(workerFunction:(params,transferableObjects)=>any,parameters:any,transferableObjects)
{
    return new Promise((resolve,reject)=>{
        try {
            let result = workerFunction(parameters, transferableObjects);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    })
}

export function createTaskProcessorWorker(workerFunc:(...args)=>any)
{
    return (event)=>{
        let data = event.data as Imsg;
        let transferableObjects = [];
        let responseMessage = {
            id : data.id,
            result : undefined,
            error : undefined
        };        
        return executeWorkerFunction(workerFunc,data.parameters,transferableObjects)
            .then((res)=>{
                responseMessage.result=res;
                self.postMessage(responseMessage);
            })
            .catch((err)=>{
                responseMessage.error=err.message;
                self.postMessage(responseMessage);
            })
    }
}