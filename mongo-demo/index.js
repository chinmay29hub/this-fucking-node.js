const mongoose = require("mongoose")
const isAsync = require('isasync');

mongoose.connect("mongodb://localhost:27017/playground").then(() => console.log("Connected to MongoDb...")).catch(error => console.error("Could not connect to mongodb", error.message))

const courseScheme = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255
        // match : /pattern/
    },
    category : {
        type : String,
        enum : ["web", "app", "network"],
        required : true,
        lowercase : true,
        // uppercase : true,
        trim : true
    },
    author : String,
    tags : {
        type : Array,
        validate : {
            isAsync : true,
            validator : async function (v) {
                // setTimeout(() => {
                //     // some async work
                //     // const result = await(v && v.length > 0)
                //     // callback(result)
                //     return await v && v.length > 0
                // }, 4000)
                return await v && v.length > 0
            },
            message : "A course should have at least 1 tag!" 
        }
    },
    date : { type: Date, default : Date.now },
    isPublished : Boolean,
    price : { 
        type : Number,
        min : 10,
        max : 200,
        get : v => Math.round(v),
        set : v => Math.round(v),
        required : function () {
            return this.isPublished
        }
     }
})

const Course = mongoose.model("Course", courseScheme)

async function createCourse () {
    const course = new Course({
        name : "Mongoose Practice _ 100",
        category : "WEb",
        author : "@chinmay29hub_2",
        tags : ["frontend"],
        isPublished : true,
        price : 15.8888
    })
    try {
        const result = await course.save()
        console.log(result)
    } catch (error) {
        // console.log(error.errors)
        for (field in error.errors) {
            console.log(error.errors[field].message)
        }
    }
    
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
        // author : "@chinmay29hub",
        // isPublished : true
        _id : "63ceb33f33f672cb8e85bea4"
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

    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({
        name: 1
    })
    .select({
        name : 1,
        tags : 1,
        price : 1
    })
    // .count()
    console.log(courses[0].price)
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

    const course = await Course.findByIdAndUpdate(id, {
        $set : {
            author : "@hello",
            isPublished : true
        }
    }, { new : true })

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
    console.log(course)
    // }
}

async function removeCourse (id) {
    // const result = await Course.deleteOne({ _id : id })
    const course = await Course.findOneAndRemove(id)
    console.log(course)
}


// createCourse()
// updateCourse("63cc1528e1d5868fdd1990b5")
// removeCourse("63cce32d4832db3e456bd04c")
getCourses()


