const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validations/userValidations');
const keys = require('../config/keys')

// REGISTER 

router.post('/register', async (req, res) => {
    
    // Lets validate the user data 
    const { error } = registerValidation(req.body)
    if(error) {
        return res.status(400).send(error.details[0])
    }
    
    const { name, email, password } = req.body

    // Check if the user is already in the database 
    const emailExists = await User.findOne({ email:email })
    if(emailExists) return res.status(400).send({ 'error': 'user already exists' })

    // Hash the password
    let salt, hashedPassword;
    try {
        salt = await bcrypt.genSalt(10)
        hashedPassword = await bcrypt.hash(password, salt);
    } 
    catch (err) {
        console.log('could not save password')
    }
    

    // Create new user 
    const user = new User({
        name: name, 
        email: email,
        password: hashedPassword
    })

    // Save new user 
    try {
        const savedUser = await user.save()
        res.send({ user: savedUser._id })
    } 
    catch(err) {
        res.status(400).send(err)
    }
})


// LOGIN

router.post("/login", async (req, res) => {
    // Lets validate the user data 
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0])
    
    const { email, password } = req.body
    
    // Check if the user is not in the database 
    const user = await User.findOne({ email: email })
    if(!user) return res.status(400).send({ 'error': 'No user exists with this email' })

    // Verify the password
    const validPass = await bcrypt.compare(password, user.password)
    if(!validPass) return res.status(400).send({ 'error': 'Invalid password' })

    // Create and assign token

    const token = jwt.sign({ _id: user._id }, keys.TOKEN_SECRET);
    res.header('auth-token', token).send({ token: token })
})

module.exports = router