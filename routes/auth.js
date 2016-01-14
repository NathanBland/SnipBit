var express = require('express')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
// var User = require('../models/user')

var router = module.exports = express.Router()

router.use(passport.initialize())
router.use(passport.session())
router.use(function (req, res, next) {
	if (req.user) {
		res.locals.user = req.user
	}
	next()
})
