const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')

function tokenForUser(user) {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next) {                   // SIGN - IN
    //user has already authenticated with help of passport
    //now just send token
    res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req, res, next) {                  // SIGN - UP
   //see if user exists
   const email = req.body.email
   const password = req.body.password

   if(!email || !password) {
       return res.status(422).send({ error: 'You must provide email and password. '})
   }

   User.findOne({ email: email }, function(err, existingUser) {
       //throws an error while searching for user with email
       if(err) { return next(err) }
       
       //throws an error if the user is already registerd
       if(existingUser) {
           return res.status(422).send({ error: 'Email is in use.'})
       }

       //if entered user is new
       const user = new User({
           email: email,
           password: password
       })

       user.save(function(err) {
            if(err) {
                return next(err)
            }

            //Respond to request indicating user was created
            res.json({ token: tokenForUser(user) })
       })
   })
}