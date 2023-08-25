//Express Package
const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator')

//Note Model
const Note = require('../models/Notes')

//Decode Token 
const decodeToken = require('../middleware/decodeToken');
const { ExpressValidator } = require('express-validator');

//Get all notes ROUTE 1 ; Login
router.get('/fetchallnotes', decodeToken, async (req, res) => {
    try {
        const userid = req.userId
        const notes = await Note.find({ userId: userid })
        if (!notes) {
            return res.send("No Notes")
        }
        res.json(notes)
    } catch (err) {
        return res.status(500).send("Internal Error")
    }
})

//Add note ROUTE 2: Login

router.post('/addnote', decodeToken,
    [
        body('title', "Short Title").isLength({ min: 3 }),
        body('description', "Short Description").isLength({ min: 5 })
    ],
    async (req, res) => {

        const e = validationResult(req)
        if (!e.isEmpty()) {
            return res.json(e)
        }


        try {

            // console.log(req.body.description)
            let note = new Note(req.body)
            note.userId = req.userId
            await note.save()
            // console.log(note)
            res.json(note)
        } catch (err) {
            // console.log(err)
            return res.status(500).send("Internal Error")
        }
    })

//Update Note ROUTE 3 : Login
router.put('/updatenote/:id', decodeToken, async (req, res) => {


    try {
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.send("No note")
        }
        if (note.userId.toString() != req.userId) {
            return res.send("No Autherization")
        }
        let newNote = {}

        const { title, description, tag } = req.body

        if (title) newNote.title = title
        if (description) newNote.description = description
        if (tag) newNote.tag = tag

        note = await Note.findByIdAndUpdate(req.params.id, newNote)

        res.json(note)
    } catch (err) {
        return res.status(500).send(err)
    }
})

//Delete Note ROUTE 4 Login
router.delete('/deletenote/:id', decodeToken, async (req, res) => {


    try {
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.send("No note")
        }
        if (note.userId.toString() != req.userId) {
            return res.send("No Autherization")
        }


        await Note.findByIdAndDelete(req.params.id)
        res.send("Note deleted")
    } catch (err) {
        return res.status(500).send("Internal Error")
    }
})


//Delet All Notes ROUTE 5 :Login
router.delete('/deleteallnotes', decodeToken, async (req, res) => {


    try {
        let notes = await Note.find({ userId: req.userId })
        if (!notes) {
            return res.send("No note")
        }
        notes.forEach(async note => {
            await Note.findByIdAndDelete(note.id)
        });

        res.send("Notes deleted")
    } catch (err) {
        return res.status(500).send("Internal Error")
    }
})


module.exports = router