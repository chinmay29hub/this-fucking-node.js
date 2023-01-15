const genres = require("./routers/genres")

const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
app.use("/api/genres", genres)



const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`));