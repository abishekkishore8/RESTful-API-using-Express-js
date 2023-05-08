const express = require('express')
const mongoose = require('mongoose')
const Movie = require('./models/moviemodel.js')
const app = express()


app.use(express.json())

//routes

//Creates a new item in the specified collection.
app.post('/api/movies',async(req,res) => {
   try {
        const movie = await Movie.create(req.body)
        res.status(200).json(movie)
   } catch (error) {
        console.log(error.message),
        res.status(500).json({message: error.message})
   }
})


//Returns all items in the specified collection with pagination
app.get('/api/movies',async(req,res) =>{
    const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;
try {
    const movie = await Movie.find().skip(skipIndex).limit(limit);
   res.json(movie);
} catch (error) {
    console.log(error.message),
    res.status(500).json({message: error.message})
   }
})

//Returns the item with the specified ID with pagination
app.get('/api/movies/:id',async(req,res) =>{
    const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;
    try {
        const movie = await Movie.findById(req.params.id).skip(skipIndex).limit(limit);
       res.json(movie);
    } catch (error) {
        console.log(error.message),
        res.status(500).json({message: error.message})
     }
    })


//Updates the item with the specified ID.
app.put('/api/movies/:id',async(req,res) =>{
    try {
        const movie = await Movie.findById(req.params.id);
        movie.name = req.body.name;
        movie.year = req.body.year;
        movie.rating = req.body.rating;
        movie.image = req.body.image;
        const updatedItem = await movie.save();
        res.json(updatedItem);
    }
    catch (error) {
        console.log(error.message),
        res.status(500).json({message: error.message})
     }
    })
//Deletes the item with the specified ID.
app.delete('/api/movies/:id',async(req,res) =>{
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted'});
    }
        catch (error) {
            console.log(error.message),
            res.status(500).json({message: error.message})
         }
        })

mongoose.
connect('mongodb+srv://abishekkishore:abishek@api.c0xp9xq.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000,()=>{
        console.log("Node API app is running on port 3000")
    });
    console.log('connected to mongodb')
}).catch((error) => {
    console.log(error.message)
})