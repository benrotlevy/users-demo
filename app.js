const db = require('./db.js')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/users', async (req, res) => {
    try {
        const users = await db.getUsers()
        res.send(users)
    } catch(error) {
        console.log(error);
        res.status(500).send()
    }
})

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await db.getUserByID(req.params.id)
        if(!user) {
            res.status(404).send()
            return
        }
        res.send(user)
    } catch(error) {
        console.log(error);
        res.status(500).send()
    }
})

app.post('/api/users', async(req, res) => {
    try {
        const newUser = req.body
        const user = await db.createUser(newUser)
        res.status(201).send(user)
    } catch(error) {
        console.log(error);
        res.status(500).send()
    }
})

app.delete('/api/users/:id', async(req, res) => {
    try {
        const result = await db.deleteUserByID(req.params.id)
        if(!result) {
            res.status(404).send()
            return
        }
        res.status(204).send()
    } catch(error) {
        console.log(error);
        res.status(500).send()
    }
})

app.put('/api/users/:id', async(req, res) => {
    try {
        const newUserName = req.body.name;
        const result = await db.updateUserName(req.params.id, newUserName)
        if(!result) {
            res.status(404).send()
            return
        }
        res.status(204).send()
    } catch(error) {
        console.log(error);
        res.status(500).send()
    }
})



const port = 3000

app.listen(port, () => {
    console.log(`server is up and running in port: ${port}`);
})
