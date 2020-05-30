const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport') //not important since it's not used
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignIn = passport.authenticate('local', { session: false})

module.exports = function(app) {

    app.get('/', requireAuth, function(req, res) {
        res.send({Hi: "there"})
    })

    app.post('/signup', Authentication.signup)

    app.post('/signin', requireSignIn, Authentication.signin)
}