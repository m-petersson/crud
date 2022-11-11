const controller = {}
module.exports = controller
const User = require('../models/user.js')
const Snippet = require('../models/snippets.js')
let sessionIdUser
let id

controller.home = async (req, res) => {
  const theSession = req.session
  // if the user has already logged in, return the logged in page
  if (theSession.userid) {
    sessionIdUser = theSession.userid
    res.redirect('/loggedIn') // redirect to the logged in page
  } else {
    // read all snippets from the database and show on page
    const theSnippets = await Snippet.find(null, { snippet: 1, _id: 0 })

    const allSnippets = {
      data: theSnippets
    }
    // delete the flash message
    delete req.session.flash
    // if a user has not logged in, return the homepage
    res.render('homePage', allSnippets)
  }
}
// return the page were you register a user
controller.registerForm = (req, res) => {
  // delete the flash message
  delete req.session.flash
  res.render('registerForm', [])
}
// redirect to the startpage after sending
// the info from the registation page
controller.registerPost = (req, res) => {
  const checkIfUserExists = User.exists({ username: req.body.name })
  checkIfUserExists.then(function (result) {
    // if the username already exists, let the user try again
    if (result) {
      req.session.flash = { message: 'This username already exists, please try another one' }

      res.redirect('/register')
    } else {
      // create and add new user to database
      const newUser = new User({ username: req.body.name, password: req.body.password })
      newUser.save().catch(err => {
        console.log(err)
        res.status(500).send('500 Internal Server Error. Something went wrong')
      })
      req.session.flash = { message: 'You have successfully registered an account' }

      // redirect to the startpage to give the user a chance to log in
      res.redirect('/')
    }
  })
}
// return the page were you log in
controller.logInForm = (req, res) => {
  // delete the flash message
  delete req.session.flash
  res.render('logInForm', [])
}
// redirect to the "logged in page" after sending
// the info from the log in page
controller.logInPost = (req, res) => {
  const checkIfUserExists = User.exists({ username: req.body.nameL, password: req.body.passwordL })
  checkIfUserExists.then(function (result) {
    // if username is in database with correct password
    if (result) {
      const theSession = req.session
      theSession.userid = req.body.nameL // add the username as userid for the session
      sessionIdUser = theSession.userid

      req.session.flash = { message: 'You have successfully logged in' }

      res.redirect('/loggedIn') // redirect to the logged in page
    } else {
      req.session.flash = { message: 'The username or password is incorrect, please try again' }
      res.redirect('/logIn') // redirect to the login page again so the user can try again
    }
  })
}
// return the "logged in page"
controller.loggedIn = async (req, res) => {
  // check if a user has actually logged in and not just wrote "/loggedIn" in the browser
  // without logging in first
  const theSession = req.session
  if (theSession.userid) {
    // show only this users snippets
    const theSnippets = await Snippet.find({ username: sessionIdUser }, { snippet: 1, _id: 0 })

    const allSnippets = {
      data: theSnippets
    }

    // delete the flash message
    delete req.session.flash
    res.render('loggedInPage', allSnippets)
  } else {
    // send back 403 status code
    res.status(403).send('403 Forbidden. You must log in first')
  }
}
// redirect to the homepage after the user logs out
controller.logOut = (req, res) => {  
  req.session.destroy() // destroy session when logging out
  res.redirect('/')
}
// return the page were you create a snippet
controller.createForm = (req, res) => {
  res.render('createForm', [])
}
// put created snippet into database and redirect to the logged in page
controller.createPost = (req, res) => {
  const newSnippet = new Snippet({ username: sessionIdUser, snippet: req.body.textarea })
  newSnippet.save().catch(err => {
    console.log(err)
    res.status(500).send('500 Internal Server Error. Something went wrong')
  })

  req.session.flash = { message: 'You have successfully created a new snippet' }
  res.redirect('/loggedIn')
}
// return the page where you update a snippet
controller.updateForm = async (req, res) => {
  const theSnippets = await Snippet.find({ username: sessionIdUser }, { snippet: 1, _id: 1 })

  const allSnippets = {
    data: theSnippets
  }
  res.render('updateForm', allSnippets)
}
// get the id of the snippet the user want to update
controller.updatePost = (req, res) => {
  id = req.body.id
  res.redirect('/update2')
}
// update the snippet
controller.updatePost2 = (req, res) => {
  Snippet.findByIdAndUpdate(id, { snippet: req.body.textarea }, function (err) {
    if (err) {
      id = 0 // update id so we do not store the one the user have written for the next time
      // send back 404 status code
      res.status(404).send('404 Not Found. You might have entered a wrong id number')
    } else {
      req.session.flash = { message: 'You have successfully updated a snippet' }
      id = 0
      res.redirect('/loggedIn')
    }
  })
}
// return the page where you delete a snippet
controller.deleteForm = async (req, res) => {
  const theSnippets = await Snippet.find({ username: sessionIdUser }, { snippet: 1, _id: 1 })

  const allSnippets = {
    data: theSnippets
  }
  res.render('deleteForm', allSnippets)
}
// get the id from the user and delete that snippet
controller.deletePost = (req, res) => {
  Snippet.findByIdAndDelete(req.body.id, function (err) {
    if (err) {
      // send back 404 status code
      res.status(404).send('404 Not Found. You might have entered a wrong id number')
    } else {
      req.session.flash = { message: 'You have successfully deleted a snippet' }
      res.redirect('/loggedIn')
    }
  })
}
