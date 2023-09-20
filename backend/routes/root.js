const express = require('express')
const router = express.Router()
const path = require('path')

// ^/$ => will only match if the requested route '/' (root)
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router