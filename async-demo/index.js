console.log("Before")
getUser(1, (user) => {
    console.log("User :", user)

    getRepos(user.githubUsername, displayRepos)
})
console.log("After")

function displayRepos (repos){
    console.log("Repositories : ", repos)
}

function getUser (id, callback) {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a user from a database")
            callback({ id: id, githubUsername: "chinmay29hub" })
        }, 2000)
    })
    
}

function getRepos(username, callback) {

    setTimeout(() => {
        console.log(`Getting repos from @${username} username`)
        callback(["repo1", "repo2", "repo3"])
    }, 2000)
    
}