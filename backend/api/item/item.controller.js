const itemService = require('./item.service')
const logger = require('../../services/logger.service')

async function getItems(req, res) {
    try {
        const filterTxt = req.query.txt || ''
        const items = await itemService.query(filterTxt)
        res.send(items)
    } catch (err) {
        logger.error('Failed to get items', err)
        res.status(500).send({ err: 'Failed to get items' })
    }
}

async function getItem(req, res) {
    try {
        const item = await itemService.getById(req.params.id)
        res.send(item)
    } catch (err) {
        logger.error('Failed to get item', err)
        res.status(500).send({ err: 'Failed to get item' })
    }
}

async function deleteItem(req, res) {
    try {
        await itemService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete item', err)
        res.status(500).send({ err: 'Failed to delete item' })
    }
}

async function updateItem(req, res) {
    try {
        const item = req.body
        const savedItem = await itemService.update(item)
        res.send(savedItem)
    } catch (err) {
        logger.error('Failed to update item', err)
        res.status(500).send({ err: 'Failed to update item' })
    }
}

module.exports = {
    getItem,
    getItems,
    deleteItem,
    updateItem
}