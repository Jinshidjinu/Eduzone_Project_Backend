const express = require('express')
const router = express()
const AuthController = require('../controller/Authcontroller')

router.post("/Mentorslogin",AuthController.TeachersLogin)
router.post('/Mentorsignup',AuthController.TeachersSignup)
router.post('/mentorsOtp',AuthController.facultyverifyOtp)

module.exports = router