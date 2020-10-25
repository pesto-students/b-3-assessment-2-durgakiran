import { iterWindow } from './iterWindow';

describe('Iterwindow', () => {
    test('iter is a iterable', () => {
        expect(() => iterWindow(1, 3).next()).toThrow();
        expect(() => iterWindow({}, 3).next()).toThrow();
        expect(() => iterWindow([1, 2 , 3], 3).next()).not.toThrow();
    })

    test('second argument must be a number', () => {
        expect(() => iterWindow([1], '3').next()).toThrow();
        expect(() => iterWindow([1], 3).next()).not.toThrow();
    })

    test('step should be greater than zero', () => {
        expect(() => iterWindow([1, 2 , 3], 3).next()).not.toThrow();
        expect(() => iterWindow([1, 2 , 3], 3, NaN,-1).next()).toThrow();
        expect(() => iterWindow([1, 2 , 3], 3, NaN, 0).next()).toThrow();
    })

    test('should yield an Array for every step', () => {
        let gen = iterWindow(new Map([[1, 'a'], [2, 'b'], [3, 'c']]), 3);
        const window = gen.next();
        expect(window.value).toBeInstanceOf(Array);
        expect(window.value).toStrictEqual([[1, 'a'], [2, 'b'], [3, 'c']])
    });

    test('Array from of iterWindow  should be an Array', () => {
        let gen = iterWindow(new Map([[1, 'a'], [2, 'b'], [3, 'c']]), 3);
        expect(Array.from(gen)).toBeInstanceOf(Array);
    })

    test('Array from of iterWindow  should have proper length', () => {
        let gen = iterWindow(new Map([[1, 'a'], [2, 'b'], [3, 'c']]), 3);
        expect(Array.from(gen).length).toBe(1);
        gen = iterWindow(new Map([[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]), 3);
        expect(Array.from(gen).length).toBe(2);
    })

    test('when array is insufficient length it should use fill value to fill reamianing indexes', () => {
        let gen = iterWindow(new Map([[1, 'a'], [2, 'b']]), 3);
        expect(gen.next().value).toStrictEqual([[1, 'a'], [2, 'b'], null]);
        gen = iterWindow(new Map([[1, 'a'], [2, 'b']]), 3, NaN);
        expect(gen.next().value).toStrictEqual([[1, 'a'], [2, 'b'], NaN]);
    })

    test('when step is provided it should skip elements in between', () => {
        let gen = iterWindow(new Map([[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]), 3, NaN, 2);
        expect(Array.from(gen).length).toBe(2);
        gen = iterWindow(new Map([[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]), 3, NaN, 2);
        expect(gen.next().value).toStrictEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
        const nextvalue = gen.next();
        expect(nextvalue.done).toBe(false);
        expect(nextvalue.value).toStrictEqual([[3, 'c'], [4, 'd'], NaN]);
    })
})
