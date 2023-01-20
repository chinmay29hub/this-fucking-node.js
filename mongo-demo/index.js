const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/playground").then(() => console.log("Connected to MongoDb...")).catch(error => console.error("Could not connect to mongodb", error.message))

const courseScheme = new mongoose.Schema({
    name : String,
    author : String,
    tags : [ String ],
    date : { type: Date, default : Date.now },
    isPublished : Boolean
})

const Course = mongoose.model("Course", courseScheme)

async function createCourse () {
    const course = new Course({
        name : "Regex Practice",
        author : "@chinmay",
        tags : ["nodejs", "frontend"],
        isPublished : true
    })
    
    const result = await course.save()
    console.log(result)
}

async function getCourses () {

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // le (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    //logical operators
    // or
    // and

    const pageNumber = 2
    const pageSize = 10

    const courses = await Course
    .find({
        author : "@chinmay29hub",
        isPublished : true
    })

    // .find()
    // .or([ {author : "@chinmay29hub"}, {isPublished : true} ])
    
    // starts with chinmay
    // .find({ author : /^chinmay/})

    // ends with "hub"
    // .find({ author : /hub$/i })

    // contains chin
    // .find({ author: /.*chin.*/i })

    // .find({
    //     price : { $gte : 10, $lte: 20 }
    // })
    // .find({ price : { $in : [10, 15, 20] } })

    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({
        name: 1
    })
    .select({
        name : 1,
        tags : 1
    })
    // .count()
    console.log(courses)
}


async function updateCourse (id) {
    // Approach 1 : query first
    // findById
    // Modify its properties
    // save()
    // const course = await Course.findById(id)

    // if (!course) {
    //     return
    // } else {
    //     // course.isPublished = true,
    //     // course.author = "Another author"
    //     course.set({
    //         isPublished : true,
    //         author : "random author"
    //     })
    //     const result = await course.save()
    //     console.log(result)
    // }

    // Approach 2 : Update first
    // update directly
    // optionally : get the updated document

    const course = await Course.updateOne({ _id : id }, {
        
    })

    if (!course) {
        return
    } else {
        // course.isPublished = true,
        // course.author = "Another author"
        course.set({
            isPublished : true,
            author : "random author"
        })
        const result = await course.save()
        console.log(result)
    }
}


// createCourse()
updateCourse("63c788991933748d83387dae")
// getCourses()


