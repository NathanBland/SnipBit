var express = require('express')
var router = module.exports = express.Router()

router.use(require('./auth'))
router.use('/editor',require('./editor'))

router.get('/', function (req, res, next) {
	return res.render('index', {
		title: 'SnipBit'
	})
})