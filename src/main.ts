
/**
 * @example
 * let taskProcessor = new TaskProcessor('myWorkerName');
 * let promise = taskProcessor.scheduleTask({
 *     someParameter : true,
 *     another : 'hello'
 * });
 * promise.then((res)=>{
 *   ........
 * });
 */
export class TaskProcessor {
    private _worker: Worker;
    private count: number = 0;
    constructor(workerName: string) {
        this._worker = WorkerProducer.create(workerName, this.handelWorkerMessage.bind(this), this.handleWorkerError.bind(this));
    }
    private handleWorkerError(ev: ErrorEvent) { }
    private handelWorkerMessage(msg: MessageEvent) {
    }

    scheduleTask(parameters: any, transferableObjects: Transferable[] = []): Promise<any> {
        let msg = {
            parameters: parameters,
            id: this.count++,
        }
        this._worker.postMessage(msg, transferableObjects);
        return new Promise((resolve, reject) => {

        });
    }
    dispose() {
        this._worker.terminate();
    }
}

export interface Imsg{
    id:number;
    parameters:any;
}

class WorkerProducer
{
    /**
     * worker 启动器位置
     */
    private static _bootstrapperUrl:string="Workers/workerBootstrapper.js";
    /**
     * worker 模块所在目录
     */
    static baseUrl="workers"
    static create(workerName: string, onMessage?: (msg: MessageEvent) => void, onError?: (ev: ErrorEvent) => void) {
        let worker = new Worker(this._bootstrapperUrl, { name: workerName });
        let bootstrapMessage = {
            loaderConfig: {
                baseUrl: this.baseUrl,
            },
            workerModule:workerName 
        };
        worker.postMessage(bootstrapMessage);
        worker.onmessage = onMessage;
        worker.onerror = onError;
        return worker;
    }
}



