const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

// Tell express where to find static files like css, images etc.
app.use('/', express.static(path.join(__dirname, '/public')))

// Use the 'root' route defined in 'root.js'
app.use('/', require('./routes/root'))

// Handle 404 errors
app.all('*', (req, res) => {
    res.status(404)

     // Check the 'Accept' header to respond with HTML, JSON, or plain text
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found');
    }
})

// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))