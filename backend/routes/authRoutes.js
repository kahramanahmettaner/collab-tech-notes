const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

router.route('/') // this will match '/auth' 
    .post(loginLimiter, authController.login)

router.route('/refresh') // this will match '/auth/refresh' 
    .get(authController.refresh)

router.route('/logout') // this will match '/auth/logout' 
    .post(authController.logout)

module.exports = router