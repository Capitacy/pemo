var _data = require('./data')
var _helpers = require('./helpers')

var reqHandler = {
    registerHandler: function(username, password, cPassword, callback) {
        username = typeof(username) == 'string' && username.length > 0 ? username : false
        password = typeof(password) == 'string' && password.length > 0 ? password : false
        cPassword = typeof(cPassword) == 'string' && cPassword.length > 0 ? cPassword : false
        
        // Run some validation
        if (username && password && cPassword) {
            if (username.length >= 4) {
                if (username.length <= 20) {
                    if (password.length >= 8) {
                        if (password == cPassword) {
                            username = _helpers.hash(username)
                            _data.read('users', username, function(err, data) {
                                if (err) {
                                    // create a user data to store
                                    var userdata = {
                                        username: username,
                                        password: _helpers.hash(_helpers.hash(password)),
                                        secret: _helpers.createRandomString(140),
                                        tokenExpiration: Date.now() + 1000 * 60 *5, // 5 minutes
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
                        } else {
                            callback(113)
                        }
                    } else {
                        callback(114)
                    }
                } else {
                    callback(105)
                }
            } else {
                callback(103)
            }
        } else {
            callback(119)
        }
    },
    loginHandler: function(username, password, callback) {
        username = typeof(username) == 'string' && username.length > 0 ? username : false
        password = typeof(password) == 'string' && password.length > 0 ? password : false
        
        // Run some validation
        if (username && password) {
            if (username.length >= 4) {
                if (username.length <= 20) {
                    if (password.length >= 8) {

                        // Start verification
                        username = _helpers.hash(username)
                        _data.read('users', username, function(err, data) {
                            if (!err) {
                                if (data.password === _helpers.hash(_helpers.hash(password))) {
                                    data.tokenExpiration += Date.now() + 1000 * 60 * 5 // Extend token for next five minutes
                                    data.secret = _helpers.createRandomString(140) // Generate new token string

                                    // Store new userData to user's file
                                    _data.update('users', data.username, data, function(err) {
                                        if (!err) {
                                            callback(false, data.secret)
                                        } else {
                                            callback()
                                        }
                                    })
                                    
                                } else {
                                    callback(111)
                                }
                            } else {
                                callback(102)
                            }
                        })


                    } else {
                        callback(114)
                    }
                } else {
                    callback(105)
                }
            } else {
                callback(103)
            }
        } else {
            callback(119)
        }
    },

    authorizedLogin: function(username, token, callback) {
        username: typeof(username) == 'string' && username.length > 0 ? username : false
        token = typeof(token) == 'string' && token.length !== 0 ? token : false

        if  (username && token) {
            if (username.length >= 4) {
                if (username.length <= 20) {
                    if (token.length > 0) {
                        if (token.length == 140) {

                            _data.read('users', _helpers.hash(username), function(err, data){
                                if (!err) {
                                    if (data.secret == token) {
                                        if (data.tokenExpiration >= Date.now()) {
                                            callback(false, data.contents)
                                        } else {
                                            callback(302)
                                        }
                                    } else {
                                        callback(301)
                                    }
                                } else {
                                    callback(102)
                                }
                            })
                            
                        } else {
                            callback(303)
                        }
                    } else {
                        callback(304)
                    }
                } else {
                    callback(105)
                }
            } else {
                callback(103)
            }
        } else {
            callback(119)
        }

    }
    
}



module.exports = reqHandler