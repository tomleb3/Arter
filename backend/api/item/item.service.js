const dbService = require('../../services/db.service')
const itemService = require('../item/item.service')
// const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByItemname,
    remove,
    update,
    add
}


async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    const criteria = {}
    try {
        const collection = await dbService.getCollection('item')

        var items = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    from: 'item',
                    localField: 'sellerId',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            {
                $unwind: '$seller'
            }]).toArray()


        return items.map(item => {
            delete item.sellerId
            delete item.seller.password
            return item
        })
    } catch (err) {
        logger.error('cannot find items', err)
        throw err
    }
}

async function getById(itemId) {
    try {
        const collection = await dbService.getCollection('item')
        const item = await collection.findOne({ '_id': ObjectId(itemId) })
        const seller = await itemService.getById(item.sellerId)
        item.seller = seller
        return item
    } catch (err) {
        logger.error(`while finding item ${itemId}`, err)
        throw err
    }
}

async function getByItemname(email) {
    try {
        const collection = await dbService.getCollection('item')
        const item = await collection.findOne({ email })
        return item
    } catch (err) {
        logger.error(`while finding item ${email}`, err)
        throw err
    }
}

async function remove(itemId) {
    try {
        const collection = await dbService.getCollection('item')
        await collection.deleteOne({ '_id': ObjectId(itemId) })
    } catch (err) {
        logger.error(`cannot remove item ${itemId}`, err)
        throw err
    }
}

async function update(item) {
    try {
        // peek only updatable fields!
        const itemToSave = {
            _id: ObjectId(item._id),
            title: item.title,
            price: +item.price,
            description: item.description,
            createdAt: item.createdAt,
            purchasedAt: item.purchasedAt,
            tags: item.tags,
            sellerId: ObjectId(item.seller._id),
            imgUrl: item.imgUrl
        }
        const collection = await dbService.getCollection('item')
        await collection.updateOne({ '_id': itemToSave._id }, { $set: itemToSave })
        const seller = await itemService.getById(itemToSave.sellerId)
        itemToSave.seller = seller
        return itemToSave;
    } catch (err) {
        logger.error(`cannot update item ${item._id}`, err)
        throw err
    }
}

async function add(item) {
    try {
        // peek only updatable fields!
        const itemToAdd = {
            email: item.email,
            password: item.password,
            fullname: item.fullname
        }
        const collection = await dbService.getCollection('item')
        await collection.insertOne(itemToAdd)
        return itemToAdd
    } catch (err) {
        logger.error('cannot insert item', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                email: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}