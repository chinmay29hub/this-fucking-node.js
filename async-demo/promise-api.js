// const p = Promise.reject(new Error("reason for rejection..."))
// p.catch(error => console.log(error))

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("operation 1...")
        resolve(1)
        // reject(new Error("Some is wrong"))
    }, 2000)
})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("operation 2...")
        resolve(2)
    }, 2000)
    
})

Promise.race([p1, p2]).then(result => console.log(result)).catch(error => console.log(error.message))