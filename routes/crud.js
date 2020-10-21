const express = require('express');
const router = express.Router()

module.exports = router

/** CRUD APP */
let counter = 0;

const createItem = (title, id = false) => ({
    title,
    id: id ? id : counter++
})

//Gratitude (fake DB...)
const items = []
console.log("items", items)
items.push(createItem("Never gogin to give you up..."))
console.log("items", items)

router.get('/', (req, res) => {
    res.send(items)
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    const found = items.find((el) => el.id ==id)
    if(found){
        res.send(found)
    } else {
        res.status(404).send("No item with such id")
    }
})

router.post('/', (req, res) => {

    const {title} = req.body
    if(!title){
        res.status(400).send({error: "Please add a title"})
    }

    const item = createItem(title)

    items.push(item)

    res.send(item)
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {title} = req.body

    if(!title){
        res.status(400).send("Please add a title")
    }

    const index = items.findIndex((el) => el.id == id)
    if(index > -1){
        const newItem = createItem(title, id)
        items.splice(index, 1, newItem)
        res.send(items[index])
    } else {
        res.status(404).send("No item with such id")
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    const index = items.findIndex((el)=> el.id == id)
    if (index > -1) {
        const copy = {...items[index]}

        //delte
        items.splice(index, 1)
        res.send(copy)
    } else {
        res.status(404).send('No id was found.')
    }
})
/** END CRUD APP */