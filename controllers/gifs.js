const express = require ('express')
const gifs = express.Router()
const GifsModel = require('../models/gifs')


//index
gifs.get('/', (req, res) => {
    GifsModel.find({}, (error, foundGifs) => {
        if (error){
            res.status(400).json({error: error.message})
        }
            res.status(200).(foundGifs)
        })
    })


//create
gifs.post('/', (req, res) => {
  GifsModel.create(req.body, (error, createdGif) => {
    if (error){
      res.status(400).json({error:error.message})
  }
      res.status(201).json(createdGif)
      console.log(createdGif)
    })
})


//update increment likes
gifs.put('/likes/:id', (req, res) => {
    GifsModel.findByIdAndUpdate(req.params.id, { $inc: { likes : 1}}, { new: true }, (err, updatedGif) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(updatedGif)
    })
})



//update
gifs.put('/:id', (req, res) => {
    GifsModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedGif) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(updatedGif)
    })
})

//delete
gifs.delete('/:id', (req, res) => {
    GifsModel.findByIdAndDelete(req.params.id, (error, deletedGif) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      else if (deletedGif === null){
          res.status(404).json({message: 'Gif Not Found'})
      }
      res.status(200).json({message: 'Gif ' + deletedGif.name + ' deleted successfully'}) 
    })
  })


module.exports = gifs