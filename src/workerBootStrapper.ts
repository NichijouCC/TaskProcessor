interface Imessage {
    initConfig: string;
    params: any;
}
self.addEventListener("message", ev => {
    console.warn("worker rec Msg:", ev);
    postMessageToMain("hello! main");
});

function postMessageToMain(msg: any) {
    self.postMessage(msg);
}
function initWorker(workerName: string) {
    importScripts("./" + workerName);
}
