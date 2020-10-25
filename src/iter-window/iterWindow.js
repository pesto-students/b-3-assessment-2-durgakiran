/**
 * 
 * @param {Iterable} iter 
 * @param {Number} n 
 * @param {any} fillValue 
 * @param {*} step 
 */
function* iterWindow(iter, n, fillValue = null, step = 1) {
    
    if(!iter || typeof iter[Symbol.iterator] !== 'function') {
        throw new TypeError(`Expected iterable, instead got ${iter}`);
    }

    if(!n || !Number.isSafeInteger(n)) {
        throw new TypeError(`Expected a safe integer, instead got ${n}`);
    }

    if( step < 1 || !Number.isSafeInteger(step)) {
        throw new TypeError(`Expected a safe integer and greater than 0, instead got ${step}`);
    }



    // make iterable to Array
    const arr = Array.from(iter);

    let numberOfStepsToSkip = step;

    const numberOfWindows = (arr.length - n) > 0 ? ( arr.length - n + step ) : 1;

    for(let i = 0; i < numberOfWindows; i += step) {


        const tmpArray = [...arr];

        const window = tmpArray.splice(i, n);


        if( window.length < n ) {

            while(window.length < n ) {
                window.push(typeof fillValue === 'function' ? fillValue() : fillValue);
            }
        }

        numberOfStepsToSkip = step - 1;

        yield window;

    }

    


}

export { iterWindow };
