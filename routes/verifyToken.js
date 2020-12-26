const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

// middleware function for any route 
// that is protected

const verify = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send('Access Denied, Not auth-token provided')
    }
    
    try { 
        console.log(token)
        const authenticated_user = jwt.verify(token, keys.TOKEN_SECRET, (err, decoded) => {
            if(err) {
                console.log(err, 'Probably token expired os somwthing!')
            }
        })
        req.user = authenticated_user;
        // go to whatever the main task/function was 
        // this is a middleware 
        next();
    }
    catch (err) {
        return res.status(400).send('Invalid Token');
    }
}

module.exports = verify