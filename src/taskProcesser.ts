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
        this._worker = createWorker(workerName, this.handelWorkerMessage.bind(this), this.handleWorkerError.bind(this));
    }
    private handleWorkerError(ev: ErrorEvent) { }
    private handelWorkerMessage(msg: MessageEvent) {
    }

    scheduleTask(Parameter: any, transferableObjects: Transferable[] = []): Promise<any> {
        let msg = {
            Parameter: Parameter,
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

function createWorker(workerName: string, onMessage?: (msg: MessageEvent) => void, onError?: (ev: ErrorEvent) => void) {
    let jsUrl = "./" + workerName;
    let worker = new Worker(jsUrl, { name: workerName });
    let bootstrapMessage = {
        workerModule: workerName,
    };
    worker.postMessage(bootstrapMessage);
    worker.onmessage = onMessage;
    worker.onerror = onError;
    return worker;
}
