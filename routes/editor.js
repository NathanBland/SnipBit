var express = require('express')
var redis = require('redis')
var redisClient = redis.createClient()

var router = module.exports = express.Router()
router.route('/:bit')
	.get(function (req, res, next) {
		if (!req.params.bit) {
			return res.redirect('/')
		}
		redisClient.hmset(req.params.bit, {
			title: req.params.bit,
			content: ''
		}, function (err, object) {
			console.log('[editor.js](/:bit) err:', err)
			console.log('[editor.js](/:bit) object:', object)
			return res.render('editor', {
				title: req.params.bit,
				store: object
			})
		})
	})