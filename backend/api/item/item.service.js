const dbService = require('../../services/db.service')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('item')
        var items = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    from: 'user',
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
        const seller = await userService.getById(item.sellerId)
        item.seller = seller
        return item
    } catch (err) {
        logger.error(`while finding item ${itemId}`, err)
        throw err
    }
}

async function add(item) {
    try {
        const itemToAdd = {
            ...item,
            sellerId: ObjectId(item.sellerId),
            createdAt: Date.now(),
            purchasedAt: null
        }
        const collection = await dbService.getCollection('item')
        await collection.insertOne(itemToAdd)
        itemToAdd.seller = await userService.getById(itemToAdd.sellerId)
        delete itemToAdd.sellerId
        console.log('add:',itemToAdd)
        return itemToAdd

    } catch (err) {
        logger.error('cannot add item', err)
        throw err
    }
}

async function update(item) {
    try {
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
        const seller = await userService.getById(itemToSave.sellerId)
        itemToSave.seller = seller
        return itemToSave;
    } catch (err) {
        logger.error(`cannot update item ${item._id}`, err)
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


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                title: txtCriteria
            },
            {
                tags: txtCriteria
            }
        ]
    }
    return criteria
}

module.exports = {
    query,
    getById,
    add,
    remove,
    update
}