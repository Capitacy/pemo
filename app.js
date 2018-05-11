/**
 * Title: Core Server Controller
 * Description: Core server processor for the application
 * 
*/

// Dependencies
var express = require('express')
var config = require('./.config')
const bodyParser = require('body-parser')
var _handler = require('./libs/requestHandler')
var _helper = require('./libs/helpers')


// Server init
var server = express()


// Server suppliments
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))

server.use("/static", express.static('public'))
server.set('view engine', 'ejs')



// Routes
server.get("/", function(req, res) {
    res.render("index", {username: "",users: []})
})
server.get("/:username", function(req, res) {
    res.render("index", {username: req.params.username, users: []})
})


server.post('/userRegistration', function(req, res) {
    console.log(req.body)

    _handler.registerHandler(req.body.username, req.body.password, req.body.confirmPassword, function(err, secretData) {
        if (!err) {
            res.send({
                error: false,
                token: secretData
            })
        } else {
            res.send({
                error: _helper.determineError(err)
            })
        }
    })
    
})

server.post('/loginRequest', function(req, res) {


    _handler.loginHandler(req.body.username, req.body.password, function(err, secretData) {
        if (!err) {
            res.send({
                error: false,
                token: secretData
            })
        } else {
            res.send({
                error: _helper.determineError(err)
            })
        }
    })
    
    
})




server.listen(config.port, () => {
    console.log(`Server is live at http://localhost:${config.port}`)
})