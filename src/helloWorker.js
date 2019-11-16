export default function helloWorker(params) {
    console.warn("test worker rec:", params);
    return params;
}