const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users')



// USER NEW ROUTE
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser})
})

// USER LOGIN ROUTE (CREATE SESSION ROUTE)
router.post('/', (req, res) => {


    User.findOne({ username: req.body.username}, (err, foundUser) => {
        if (err) {
                res.send(err)
        }
        else {

            if (foundUser){

                if (bcrypt.compareSync(req.body.password, foundUser.password)){
                    //login user and create session
                    foundUser.loggedIn = true
                    console.log(foundUser)
                    req.session.currentUser = foundUser
                    
                    // let user = JSON.parse(JSON.stringify(
                    //     req.session.currentUser
                    // ))


                    // res.status(201).json(foundUser)


                    res.json({
                        cookie: setCookie = (foundUser, next) => {
                                res.cookie('user', user, { signed: true, httpOnly: true });
                            }, 
                        user: foundUser
                      });
                      req.session.cookie = req.signedCookies
                      console.log(req.signedCookies)
                      console.log(foundUser)
                      console.log(req.session, 'cookietest')
                    // res.status(200).req.session.cookie('id', foundUser.id, { signed: true, httpOnly: true });
                    // setCookie = (foundUser, next) => {
                    //     res.cookie('user', user, { signed: true, httpOnly: true });
                    // } 
                    // res.status(200).json(req.session.currentUser)
                    // setCookie(foundUser)
                    // console.log(req.signedCookies)
                    
                    
                }
                else{
                    console.log("<h1>invalid password</h1>")
                }    

            }
            else{
                console.log("<h1>user not found</h1>")
            }
        }
    })
})


router.delete('/', (req, res) => {
    User.findOne({ username: req.body.username}, (err, foundUser) => {
        if (err) {
                res.send(err)
        }
        else
        if (foundUser) {
            console.log("this req.body", req.body)
        console.log(req.session)
        foundUser.loggedIn = false
        res.status(201).json(foundUser)    
        req.session.destroy(() => {
    })
    console.log(req.session)
    }
    
})
})


    

    




module.exports = router;