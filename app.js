const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
/*Add your connect string to mongodb here*/
//const connectString = ....
const session = require('express-session')

// setup the view engine to use hbs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// used to parse html from a post request
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')))

app.use(session({
  name: 'crud session',
  secret: '',
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // keep cookie for one day
  resave: false,
  saveUninitialized: false // wait to make session until something is stored
}))

app.use((req, res, next) => {
  // if a flash message is in the request put it into the response
  res.locals.flash = req.session.flash
  next()
})

// connect the routes file to the start url
app.use('/', require('./routes/codeSnippets'))
// connect to the database
mongoose.connect(connectString)

app.listen(3000, () => console.log('Listening on http://localhost:3000'))
