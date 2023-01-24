const mongoose = require('mongoose');
const express = require('express')
const Joi = require('joi');

const router = express.Router()

const genreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    }
})

const Genre = mongoose.model("Genre", genreSchema)

// const genres = [
//     { id: 1, name: 'Action' },  
//     { id: 2, name: 'Horror' },  
//     { id: 3, name: 'Romance' },  
//   ];

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort("name")
    res.send(genres);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre ({
        // id: genres.length + 1,
        name: req.body.name
    });
    // genres.push(genre)
    genre = await genre.save()
    res.send(genre);
});

router.put('/:id', async (req, res) => {

    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name : req.body.name }, {
        new : true
    })

    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    // genre.name = req.body.name; 
    res.send(genre);
});

router.delete('/:id', async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id)

    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);

    res.send(genre);
});

router.get('/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id)

    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    // const result = schema.validate(genre)
    // return Joi.validate(genre, schema);
    return schema.validate(genre)
}


module.exports = router