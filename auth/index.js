const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const crypto = require('crypto')

const db = require('../db')

// Serialization - how to pass the user around on the web
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// Deserialize - once you have a token, fetch the data when you need it 
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db('users').where({id}).first()
        const {email} = user
        done(null, {id, email})
    // proof that req.user comes from deserializeUser
     //   done(null, {id, email, isThisFromServer: true})
    } catch (err){
        done(err, null)
    }
})

// set up for logging in
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
   // user from passport comes from below function 
    async function(email, password, done){
        const user = await db('users').where({email}).first()

        if(!user) return done(null, false, {message: "Incorrect Email or Password"})

        const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
        const passwordMatch = user.password === hash

        if(!passwordMatch){
            return done(null, false, {message: "Inncorrect Email or Password"})
        }

        return done(null, user)
    //return done(null, {id: user.id, email})
    }
))

module.exports = passport