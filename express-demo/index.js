const express = require("express")
const Joi = require("joi")

const app = express()
app.use(express.json())

const courses = [
    {
        id : 1,
        name : "course1"
    },
    {
        id : 2,
        name : "course2"
    },
    {
        id : 3,
        name : "course3"
    }
]

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/api/courses", (req, res) => {
    res.send(courses)
})

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send("The course with the given id was not found")
    } else {
        res.send(course)
    }
})

app.post("/api/courses", (req,res) => {

    const result = validateCourse(req.body) 
    // console.log(result)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const course = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put("/api/courses/:id", (req, res) => {
    // First look up the course else return error

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send("The course with the given id was not found")
        return
    }

    //Then validate
    const result = validateCourse(req.body)
    // invalidate
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    //update the course
    course.name = req.body.name
    res.send(course)
})

const validateCourse = (course) => {
    const schema = {
        name : Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send("The course with the given id was not found")
        return
    }

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
})


// PORT
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})