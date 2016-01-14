var redis = require('redis')
var express = require('express')
var bodyParser = require('body-parser')
var sass = require('node-sass-middleware')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)
var cookieParser = require('cookie-parser')

var app = express()

app.set('port', process.env.PORT || 3000)
app.set('ip', process.env.IP || '0.0.0.0')

var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app listening on https://%s:%s', address.address, address.port)
})
var io = require('socket.io').listen(server)

var routes = require('./routes/')

app.use(		
  sass({
    root: __dirname,
	indentedSyntax: true,
    src: '/sass',
    dest: '/public/css',
    prefix: '/css',
    debug: false
  })
)

app.use(express.static('public'))

app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

var redisClient = redis.createClient()
redisClient.on('connect', function () {
	console.log('redis connected')
})

app.use(session({
    store: new RedisStore({
    	client: redisClient
    }),
    resave: true,
    saveuninitialized: false,
    secret: 'too many secrets are not good for you. Also hard to track'
}))
app.use(routes)