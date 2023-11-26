const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/') // this will match '/auth' 
    .post(authController.login)

router.route('/refresh') // this will match '/auth/refresh' 
    .get(authController.refresh)

router.route('/logout') // this will match '/auth/logout' 
    .post(authController.logout)

module.exports = router