const express = require('express')
const routes = require('./routes')
const passport = require('./auth')

const session = require('express-session')

const app = express()
const port = 3001

//

app.use(express.json())

/** DEMO MIDDLEWARE */
app.use('*', (req, res, next) => {
    console.log('This middleware does nothing')
    next()
})
/** END DEMO MIDDLEWARE */


app.use(session({
  secret: process.env.SESSION_SECRET || 'the secret',
  resave: true,
  saveUninitialized: false,
  cookie: {secure: process.env.NODE_ENV === 'production'}
}))

app.use(passport.initialize());
app.use(passport.session());

/**
 * Middleware to ensure user is logged in 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isUserLoggedIn = (req, res, next) => {
  if(req.user){
    return next()
  }
  return res.status(403).send("You are not authorized")
}


app.use('/api', routes)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/second', isUserLoggedIn, (req, res) => {
//   res.send('<h1>from /second</h1>')
// })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})