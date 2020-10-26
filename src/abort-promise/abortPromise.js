// class CustomPromise {
//     constructor(executor) {

        
//         if(typeof executor !== 'function') {
//             throw new TypeError(`promise resolver ${executor} should be a function`);
//         }


//         this.state = 'pending';
//         this.value = null;
//         this.error = null;
//         this.handlerChain = [];


        

//         try {
//             executor(this.resolve.bind(this), this.reject.bind(this));
//         } catch (e) {
//             this.reject(e);
//         }
//     }

//     resolver() {
//         const handlers = this.handlerChain.splice(0);
//         const callBackToCall = this.state === 'fulfilled' ? 'onFulFilled' : 'onRejected';
//         console.log(handlers);
//         handlers.forEach((handler) => {
//             try {
//                 if(handler[callBackToCall]) {
//                     const promiseValue = handler[callBackToCall](this.value);
//                     if(promiseValue && promiseValue instanceof CustomPromise) {
//                         promiseValue.then((v) => {
//                             handler.promise.resolve(v);
//                         }).catch((reason) => {
//                             handler.promise.reject(reason);
//                         })
//                     } else {
//                         handler.promise.resolve(promiseValue);
//                     }
        
//                 } else {
//                     if(this.state === 'rejected') {
//                         handler.promise.reject(this.value);
//                     } else {
//                         handler.promise.resolve(this.value);
//                     }
//                 }
//             } catch (e) {
//                 if(handler.onRejected) {
//                     const promiseValue = handler.onRejected(this.value);
//                     if(promiseValue && promiseValue instanceof CustomPromise) {
//                         promiseValue.then((v) => {
//                             handler.promise.resolve(v);
//                         }).catch((reason) => {
//                             handler.promise.reject(reason);
//                         })
//                     } else {
//                         handler.promise.resolve(promiseValue);
//                     }
//                 } else {
//                     handler.promise.reject(e);
//                 }
//             }
//         })
//     }

//     resolve(value) {
//         if(this.state === 'pending') {
//             this.value = value;
//             this.state = 'fulfilled';
//             this.resolver();
//         }
//     }

//     reject(err) {
//         if(this.state === 'pending') {
//             console.log('I am called');
//             this.value = err;
//             this.state = 'rejected';
//             this.resolver();
//         }
//     }

//     then(onFulFilled, onRejected) {

//         const thenPromise = new CustomPromise(() => {});

//         onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : null;
//         onRejected = typeof onRejected === 'function' ? onRejected : null;

//         // add promise to promise chain array
//         this.handlerChain.push({ onFulFilled, onRejected, promise: thenPromise });

//         if(this.state !== 'pending') {
//             this.resolver();
//         }
        
//         return thenPromise; 
//     }

//     catch(onRejected) {
//         const catchPromise = new CustomPromise(() => {});

//         onRejected = typeof onRejected === 'function' ? onRejected : null;

//         // add promise to promise chain array
//         this.handlerChain.push({ onFUlFilled: null, onRejected, promise: catchPromise });
        
//         return catchPromise; 
//     }

//     finally() {

//     }
// }

class AbortPromise extends Error {
    constructor(message = 'Aborted') {
        super(message);
        this.name = 'AbortError';
    }
}

class AbortablePromise extends Promise {

    constructor(executor) {
        super(executor);
        this.isAborted = false;
    }


    abort(reason) {
        if(!this.isAborted) {
            this.isAborted = false;
        }
    }

}

export { AbortablePromise };
