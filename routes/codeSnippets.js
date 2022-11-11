const express = require('express')
const router = express.Router()
const controller = require('../controllers/codeSnippetsController.js')

router
  .get('/', controller.home)
  .get('/register', controller.registerForm)
  .post('/register', controller.registerPost)
  .get('/logIn', controller.logInForm)
  .post('/logIn', controller.logInPost)
  .get('/loggedIn', controller.loggedIn)
  .post('/loggedIn', controller.logOut)
  .get('/create', controller.createForm)
  .post('/create', controller.createPost)
  .get('/update', controller.updateForm)
  .post('/update', controller.updatePost)
  .get('/update2', controller.updateForm)
  .post('/update2', controller.updatePost2)
  .get('/delete', controller.deleteForm)
  .post('/delete', controller.deletePost)

module.exports = router
