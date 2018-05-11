var _data = require('./data')
var _helpers = require('./helpers')

var reqHandler = {
    registerHandler: function(username, password, callback) {
        username = _helpers.hash(username)
        _data.read('users', username, function(err, data) {
            if (err) {
                // create a user data to store
                var userdata = {
                    username: username,
                    password: _helpers.hash(_helpers.hash(password)),
                    secret: _helpers.createRandomString(5),
                    contents: []
                }
                // create new file for new user and store their data
                _data.create('users', username, userdata, function(err) {
                    if (err) {
                        callback(201)
                    } else {
                        callback(false, userdata.secret)
                    }
                })
            } else {
                callback(101)
            }
        } )
    }
}



module.exports = reqHandler