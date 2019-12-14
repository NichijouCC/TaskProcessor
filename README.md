# taskProcessor
    简单封装webworker为taskprocessor来使用。
   
使用介绍:
```
let taskProcessor = new TaskProcessor('myWorkerName');
let promise = taskProcessor.scheduleTask({
    someParameter : true,
    another : 'hello'
});
promise.then((res)=>{
  ........
});
```

workerModule:
>在workers文件夹编写 执行task的方法,即可通过 文件名(workerModuleA、workerModuleB)创建对应的taskprocessor.

Reference:
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API




