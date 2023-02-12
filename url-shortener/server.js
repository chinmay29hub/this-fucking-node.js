const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config()
const ShortUrl = require("./models/shortUrl")

mongoose.set('strictQuery', false);
mongoose.connect(process.env.ATLAS_URI, {
    useUnifiedTopology : true
})
    .then(() => console.log("Connected to mongodb atlas"))

const app = express()

app.use(cors())
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended : false }))

app.get("/", async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render("index", { shortUrls })
})

app.post("/shortUrls", async (req, res) => {
    await ShortUrl.create({ full : req.body.fullUrl })
    res.redirect("/")
})

app.get("/:shortUrl", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short : req.params.shortUrl })

    if (shortUrl == null) {
        return res.sendStatus(404)
    }

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Express server started")
})