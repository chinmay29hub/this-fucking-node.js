console.log("Before")
// getUser(1, (user) => {
//     console.log("User :", user)

//     getRepos(user.githubUsername, displayRepos)
// })

// getUser(1).then(user => {
//     console.log(user)
//     getRepos(user.githubUsername).then(repos => console.log(repos))
// }).catch(error => console.log(error))


// async and await

async function displayAwaits() {
    try {
        const user = await getUser(1)
        console.log(user)
        const repos = await getRepos(user.githubUsername)
        console.log(repos)
    } catch (error) {
        console.log(error.message)
    }
    
}

displayAwaits()


console.log("After")



function displayRepos (repos){
    console.log("Repositories : ", repos)
}

function getUser (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a user from a database")
            resolve({ id: id, githubUsername: "chinmay29hub" })
        }, 2000)
    })
}

function getRepos(username) {
    return new Promise((resolve
        , reject) => {
        setTimeout(() => {
            console.log(`Getting repos from @${username} username`)
            // resolve(["repo1", "repo2", "repo3"])
            reject(new Error("Some went wrong Chinmay..."))
        }, 2000)
    })
}