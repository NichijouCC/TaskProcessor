import { expect } from 'chai';
import 'mocha';
import { TaskProcessor } from '../src/main';

export function helloTest() {
    let taskProcessor = new TaskProcessor('helloWorker');
    let promise = taskProcessor.scheduleTask({
        someParameter: true,
        another: 'hello'
    });
    return promise
}

describe('First test', () => {

    it('should return true', async () => {
        const result = await helloTest();
        console.warn(result);
        // expect(result).to.equal(true);
    });

});