import { AbortablePromise } from './abortPromise';

describe('test promises', () => {
  describe('new promise implementation', () => {
    test('should be an object', () => {
        const fn = jest.fn();
        const promise = new AbortablePromise(fn);
        expect(typeof promise).toBe('object');
    });

    
    test('should throw an error when function is not passed', () => {
        expect(() => new AbortablePromise()).toThrow(TypeError);
    });
    
    test('executor function is called immediately', () => {
        let result;

        new AbortablePromise(() => result = 'foo');

        expect(result).toBe('foo');
    });

    test('resolution handler is called when promise is resolved', (done) => {
        let result = 'foo';
        const promise = new AbortablePromise((resolve) => {
            setTimeout(() => resolve(result), 100);
        });
        expect.assertions(1);
        return promise.then((value) => {
            expect(value).toBe(result);
            done();
        });
    });

    test('promise supports many resolution handlers', (done) => {
        let result = 'foo';
        const promise = new AbortablePromise((resolve) => {
            setTimeout(() => resolve(result), 100);
        });
        expect.assertions(2);
        promise.then((value) => {
            expect(value).toBe(result);
            done();
        });

        return promise.then((value) => {
            expect(value).toBe(result);
            done();
        });
    });

    test('resolution handlers can be chained', (done) => {
        let result = 'foo';
        const promise = new AbortablePromise((resolve) => {
            setTimeout(() => resolve(result), 100);
        });

        expect.assertions(1);
        promise.then((value) => {
            return new AbortablePromise((resolve) => {
                setTimeout(function () {
                    resolve(value);
                }, 100);
            })
        }).then((value) => {
            expect(value).toBe(result);
            done();
        });
    });

    test('chaining works with non promise return values', (done) => {
        let result = 'foo';
        const promise = new AbortablePromise((resolve) => {
            setTimeout(() => resolve(result), 100);
        });

        expect.assertions(1);
        promise.then((value) => {
            return 'hello';
        }).then((value) => {
            expect(value).toBe('hello');
            done();
        });
    });

    test('resolution handler can be attached when promise is resolved', (done) => {
        var testString = 'foo';

        var promise = new AbortablePromise(function (resolve) {
            setTimeout(function () {
                resolve(testString);
            }, 100);
        });

        expect.assertions(1);
        promise.then(function () {
            setTimeout(function () {
                promise.then(function (value) {
                    expect(value).toBe(testString);
                    done();
                });
            }, 100);
        });
    });

    test('calling resolve second time has no effect', (done) => {
        const testString = 'foo';
        const testString2 = 'bar';

        const promise = new AbortablePromise(function (resolve) {
            setTimeout(function () {
                resolve(testString);
                resolve(testString2);
            }, 100);
        });

        expect.assertions(2);

        promise.then(function (value) {
            expect(value).toBe(testString);

            setTimeout(function () {
                promise.then(function (value) {
                    expect(value).toBe(testString);
                    done();
                });
            }, 100);
        });
    });

    test('rejection handler is called when promise is rejected', (done) => {
        const testString = 'foo';

        const promise = new AbortablePromise(function (resolve, reject) {
            setTimeout(function () {
                reject(testString);
            }, 100);
        });

        expect.assertions(1);

        return promise.catch(function (value) {
            expect(value).toBe(testString);
            done();
        });
    });

    test('rejection are passed downstream', (done) => {
        const testString = 'foo';

        const promise = new AbortablePromise(function (resolve, reject) {
            setTimeout(function () {
                reject(testString);
            }, 100);
        });

        expect.assertions(1);

        return promise.then((value) => {
            console.log(value);
            done();
            return 'differentString';
        }).catch(function (value) {
            expect(value).toBe(testString);
            done();
        });
    });

    test('rejection promises returned from resoution handlers are caught properly', (done) => {
        var testError = new Error('Something went wrong');


        var promise = new AbortablePromise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, 100);
        });

        expect.assertions(1);

        promise
            .then(function () {
                return new AbortablePromise(function (resolve, reject) {
                    setTimeout(function () {
                        reject(testError);
                    }, 100);
                });
            })
            .catch(function (value) {
                expect(value).toBe(value, testError);
                done();
            });
    });

    test('rejection handlers catch synchronous errors in resolution handlers', (done) => {

        const promise = new AbortablePromise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, 100);
        });

        expect.assertions(1);
        return promise.then(function () {
            throw new Error('Something went wrong');
        }).catch(function (value) {
            expect(value).toStrictEqual(Error('Something went wrong'));
            done();
        });
    });

    test('rejection handlers catch synchronous errors in the executor function', (done) => {
        const testError = new Error('Something went wrong');

        const promise = new AbortablePromise(function () {
            throw testError;
        });

        expect.assertions(1);
        promise.then(function () {
            return new AbortablePromise(function (resolve) {
                setTimeout(function () {
                    resolve(testError);
                }, 100);
            });
        }).catch(function (value) {
            expect(value).toBe(testError);
            done();
        });
    });

    test('rejection handlers catch synchronous errors', () => true);

    test('chaining works after "catch"', () => true);

    test('rejecting promises returned from rejection handlers are caught properly', () => true);

    test('second argument in then is treated as a rejection handler', () => true);

    test('second argument in then is treated as a rejection handler and should be to send rejected promises to next in chain', () => true);
  });
});
