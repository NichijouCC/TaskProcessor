import { add } from '../testFunc'

export default function helloWorkerB(params: any) {
    console.warn("test worker rec:", params, add(4));
    return params;
}