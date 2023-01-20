const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/mongo-exercises").then(() => console.log("Connected to MongoDb...")).catch(error => console.error("Could not connect to mongodb", error.message))

const courseSchema = new mongoose.Schema({
    name : String,
    author : String,
    tags : [String],
    date : Date,
    isPublished : Boolean,
    price : Number
})

const Course = mongoose.model("Course", courseSchema)

async function getCourses () {
    return await Course
    // .find({ isPublished :true, tags: { $in : ["frontend", "backend"] } }) OR refer below
    .find({ isPublished :true })
    .or([ { tags : "frontend" }, {tags : "backend"} ])
    .sort({ price : -1 })
    .select({ name : 1, author : 1 , price: 1})
}

async function run () {
    const courses = await getCourses()
    console.log(courses)
}
run()

