const dbService = require('../../services/db.service')
const userService = require('../user/user.service')
// const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
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
        logger.error(`while finding user ${itemId}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
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
        const seller = await userService.getById(item.sellerId)
        item.seller = seller
        return itemToSave;
    } catch (err) {
        logger.error(`cannot update item ${item._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        // peek only updatable fields!
        const userToAdd = {
            email: user.email,
            password: user.password,
            fullname: user.fullname
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
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