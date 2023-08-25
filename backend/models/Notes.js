const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NotesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        require: true,

    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        default: "general"

    },
    timestamp: {
        type: Date,
        default: Date.now
    }


});


module.exports = mongoose.model("Note", NotesSchema); 