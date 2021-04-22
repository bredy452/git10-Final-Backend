const express = require ('express')
const users = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')

//index
users.get('/', (req, res) => {
    UsersModel.find({}, (error, foundUsers) => {
        if (error){
            res.status(400).json({error: error.message})
        }
            res.status(200).json(foundUsers)
        })
    })

    
    //new user route
    users.get('/new', (req,res)=>{
        res.render('users/new.ejs', {
            currentUser: req.session.currentUser
        })
    })
    
    //user create
    users.post('/', (req,res)=>{
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        console.log(req.body)
        UsersModel.create(req.body, (err, userNew)=>{
            if(err){
                res.send(err)
            } else {
            res.send(userNew)
            }
        })
    })












// //create
// users.post("/", (req, res) => {
//   UsersModel.create(req.body, (error, createdUser) => {
//     if (error){
//       res.status(400).json({error:error.message})
//   }
//       res.status(201).json(createdUser)
//     })
// })



//update
users.put('/:id', (req, res) => {
    UsersModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(updatedUser)
    })
})

//delete
users.delete('/:id', (req, res) => {
    UsersModel.findByIdAndDelete(req.params.id, (error, deletedUser) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      else if (deletedUser === null){
          res.status(404).json({message: 'User Not Found'})
      }
      res.status(200).json({message: 'User ' + deletedUser.name + ' deleted successfully'}) 
    })
  })


module.exports = users