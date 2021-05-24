const express = require('express')
const router = express.Router()
const SQLManager = require('../sql/SQLManager')
const sqlManager = new SQLManager

router.get('/clients', async (req, res) => {
    try {
        const clients = await sqlManager.getClientsData()
        res.status(200).send(clients)
    } catch (error) {
        res.status(401).send(error)
    }
})
router.get('/owners', async (req, res) => {
    try {
        const owners = await sqlManager.getOwners()
        res.status(200).send(owners)
    } catch (error) {
        res.status(401).send(error)
    }
})
router.get('/client/:clientEmail', async (req, res) => {
    const { clientEmail } = req.params
    try {
        const client = await sqlManager.getClient(clientEmail)
        res.status(200).send(client)
    } catch (error) {
        res.status(401).send(error)
    }
})
router.post('/client', async (req, res) => {
    const client = req.body
    const response = await sqlManager.addClient(client)
    res.send({ response })
})
router.put('/client/:clientId', async (req, res) => {
const { clientId } = req.params
const newInfo = req.body
const response = await sqlManager.updateClient(clientId, newInfo)
res.send({response})
})
router.put('/update/owner/:clientId', async (req, res) => {
    const { clientId } = req.params
    const { newOwner } = req.body
    console.log(clientId)
    console.log(newOwner)
    const response = await sqlManager.transferOwner(clientId, newOwner)
    res.send({response})
})
router.put('/update/email_type/:clientId', async (req, res) => {
    const { clientId } = req.params
    const { ET } = req.body
    const response = await sqlManager.sendET(clientId, ET)
    res.send({response})
})
router.put('/update/declaration/:clientId', async (req, res) => {
    const { clientId } = req.params
    const response = await sqlManager.declaration(clientId)
    res.send({response})
})

module.exports = router