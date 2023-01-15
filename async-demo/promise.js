const p = new Promise((resolve, reject) => {
    // async work
    setTimeout(() => {
        // resolve(1)
        reject(new Error("message"))
    }, 2000);
    

})

p.then(result => console.log("Result : " + result)).catch(error => console.log("Error : " + error.message))