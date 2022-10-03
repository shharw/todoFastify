const {Schema, model} = require('mongoose')

const Notes = new Schema({
    note_name: {type: String, required: true},
    sub_notes: {type: Array, of: String, required: true},
})

module.exports = model('Notes', Notes)