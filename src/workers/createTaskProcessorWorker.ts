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

export function createTaskProcessorWorker(workerFunc:any)
{
    return (event)=>{
        let data = event.data;
        let transferableObjects = [];
        let responseMessage = {
            id : data.id,
            result : undefined,
            error : undefined
        };

        return new Promise((resolve,reject)=>{
            try {
                let result = workerFunc(data.parameters, transferableObjects);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }).then((res)=>{
            responseMessage.result=res;
            return responseMessage;
        },(err:Error)=>{
            responseMessage.error=err.message;
            return responseMessage
        }).catch((err)=>{
            console.error(err);
        })
    }
}