const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByUsername,
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
        return item
    } catch (err) {
        logger.error(`while finding user ${itemId}`, err)
        throw err
    }
}

async function getByUsername(email) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        logger.error(`while finding user ${email}`, err)
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

async function update(user) {
    try {
        // peek only updatable fields!
        const userToSave = {
            _id: ObjectId(user._id),
            email: user.email,
            fullname: user.fullname
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
        return userToSave;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
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