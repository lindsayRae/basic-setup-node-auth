const express = require('express')
const routes = require('./routes')
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

app.use('/', routes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})