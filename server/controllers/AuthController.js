const User = require('./../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
module.exports = {   // this is exporting of our file to use in every where
	loginAttempt : (req, res, next) => {
        
        // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

        // check if password matches
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);		    
        
        if (!passwordIsValid){
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

            // if user is found and password is right
            // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
            id: user._id
        };
            var token = jwt.sign(payload, config.secret, {
            expiresIn: 1440 // expires in 24 hours
            });
            console.log(token);
            // return the information including token as JSON
            res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
            });
        }   

        }

    });
    },
    checkToken : (req, res, next) => {  // this method is use for checking token, expire or not
		var token = req.headers['x-access-token'];
		if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
			res.status(200).send(decoded); // if valid return decoded token, it contain id, expire time and ...
		});
	}

}