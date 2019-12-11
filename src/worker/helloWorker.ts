import { add } from '../testFunc'

export default function helloWorker(params: any) {
    console.warn("test worker rec:", params, add(3));
    return params;
}