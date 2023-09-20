const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const PORT = process.env.PORT || 3500


app.use(logger)

app.use(cors(corsOptions))

// will allow the app to receive and parse the json data
app.use(express.json())

// will allow the app to parse the cookies received
app.use(cookieParser())

// Tell express where to find static files like css, images etc.
app.use('/', express.static(path.join(__dirname, 'public')))

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

app.use(errorHandler)

// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))