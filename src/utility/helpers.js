/**
 * Convert a node-style method to a promise-based method 
 * 
 * @param {any} obj The object containing the method
 * @param {string} method The method name to promisify 
 * @param {boolean} single True if a single arg is returned by the callback
 * @returns {function} The promisified method. The promise resolves with the callback data, or an array if not single=true
 */
function promisify(obj, method, single = true) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            obj[method](...args, (err, ...cbArgs) => {
                if (err) return reject(err);
                resolve(single ? cbArgs[0] : cbArgs)
            })
        })
    }
}

function partition(arr, test) {
    let a=[]
    let b=[]

    arr.forEach((e)=> {
        if (test(e)) {
            a.push(e);
        } else {
            b.push(e);
        }
    })
    return [a,b]
}

export { promisify, partition }
