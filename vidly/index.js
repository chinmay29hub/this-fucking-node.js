const mongoose = require("mongoose")
const genres = require("./routers/genres")
const customers = require("./routers/customers")

const express = require('express');
const app = express();

mongoose.connect("mongodb://localhost:27017/vidly")
    .then(() => console.log("Connected to MongoDb...."))
    .catch(error => console.error("Could not connect to mongodb ..."))

app.use(express.json());
app.use("/api/genres", genres)
app.use("/api/customers", customers)





const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`));