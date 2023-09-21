const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')

router.route('/') // this will match '/notes' 
    .get(notesController.getAllNotes)
    .post(notesController.createNewNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote)

module.exports = router