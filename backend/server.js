require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConnection')
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')

const PORT = process.env.PORT || 3500


connectDB()

app.use(logger)

app.use(cors(corsOptions))

// will allow the app to receive and parse the json data
app.use(express.json())

// will allow the app to parse the cookies received
app.use(cookieParser())

// Tell express where to find static files like css, images etc.
app.use('/', express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

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

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    
    // Start the Express server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.once('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})