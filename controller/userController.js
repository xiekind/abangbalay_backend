const User = require('../model/user');
const jwt = require('jsonwebtoken')
const sercet = "madam1234"

exports.create = (req, res) => {
    var response = { error: {}, data: {}, response_status: 200, access_token: null }

    var user = new User(
        req.body
    )
    user.save().then(result => {
        response.error = null
        response.data.status = true
        response.data.body = result
        response.data.message = "successfully registered"
        res.send(response)
    }).catch(err => {
        response.error.status = true
        response.response_status=500
        response.data = null
        response.error.body = err
        response.error.message = "failed to register"
        res.send(response)
    })
    // const register = new User({
    //     email: req.body.email,
    //     password: req.body.password,
    // });

    // register.save((err, user) => {
    //     if(err){
    //         res.send(err);
    //     }    
    //     res.json(user);
    // });
}

exports.get = (req, res) => {

    var pass = req.body.password
    var query = User.findOne({ email: req.body.username })

    query.exec(function (err, result) {
        var respass = result.password
        if (pass == respass) {
            var token = jwt.sign(req.body, sercet, { expiresIn: "7d" })
            res.send({
                user: {
                    email: result.email,
                    password: result.password
                },
                access_token: token
            })
        }
    })
    // Movie.find({}, (err, movies) => {
    //     if(err){
    //         res.send(err);
    //     }    
    //     res.json({ data : movies});
    // });
}