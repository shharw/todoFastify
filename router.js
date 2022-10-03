const path = require('path')
const Notes = require('./model')

module.exports = async function Router (router, opts){
    router.get('/', async function (req, res) {
        try{
            const notes = await Notes.find()
            return res.view('./static/templates/index.ejs', {notes})
        }
        catch (e) {
            console.log(e);
            return res.code(400).send('404')
        }
    })

    router.post('/update', async function(req, res){
        try {
            const note = await Notes.findById(req.body.id).exec()
            return res.view('./static/templates/update.ejs', {note})
        }catch (e) {
            console.log(e)
            return res.code(400).send('404')
        }
    })

    router.post('/updated', async function(req, res){
        try {
            const {id, note_name, sub_note} = req.body
            const updateNote = await Notes.findOneAndUpdate({_id: id}, {
                note_name,
                sub_notes: sub_note,
            })
            const notes = await Notes.find()
            return res.view('./static/templates/index.ejs', {notes})
        }catch (e) {
            console.log(e)
            return res.code(400).send('404')
        }
    })

    router.post('/delete', async function(req, res){
        try {
            const _id = req.body.id
            await Notes.findOneAndDelete({_id})
            const notes = await Notes.find()
            return res.view('./static/templates/index.ejs', {notes})
        }catch (e) {
            console.log(e)
            return res.code(400).send('404')
        }
    })

    router.get('/create', async function(req, res){
        try {
            return res.view('./static/templates/create.ejs')
        }catch (e) {
            console.log(e)
            return res.code(400).send('404')
        }
    })

    router.post('/create', async function(req, res) {
        try {
            const {note_name, sub_note} = req.body
            const createNote = await Notes.create({
                note_name,
                sub_notes: sub_note,
            })
            const notes = await Notes.find()
            return res.view('./static/templates/index.ejs', {notes})
        } catch (e) {
            console.log(e);
            return res.code(400).send('404')
        }
    })
}