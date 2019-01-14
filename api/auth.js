var mongoose = require('mongoose');
var User = require("../models/User");

var express = require('express')
var router = express.Router()

// JWT middleware
const jwt = require('express-jwt')
var jsonwebtoken = require('jsonwebtoken')
const site_secret = require('./config/secret')

// [POST] /login
router.post('/login', (req, res, next) => {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // site_secret should be same with express-jwt (index.js)
          const accessToken = jsonwebtoken.sign({ name: user.username, role: user.role }, site_secret)
//          const accessToken = jsonwebtoken.sign({ user }, site_secret)
          res.json({ token: { accessToken } })
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      })
    }
  })
})

// [GET] /user
router.get('/user', jwt({secret: site_secret}), (req, res, next) => {
  res.json({ user: req.user })
})

// [POST] /logout
router.post('/logout', (req, res, next) => {
  res.json({ status: 'OK' })
})

// [POST] /register
router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password || !req.body.role) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.status(401).json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
})

module.exports = router
