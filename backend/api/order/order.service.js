const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')
const itemService = require('../item/item.service')

async function query(filterBy = {}) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        const orders = await collection.find({}).toArray()
        // const orders = await collection.find(criteria).toArray()
        // var orders = await collection.aggregate([
        //     {
        //         $match: filterBy
        //     },
        //     {
        //         $lookup:
        //         {
        //             from: 'user',
        //             localField: 'byUserId',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     },
        //     {
        //         $lookup:
        //         {
        //             from: 'user',
        //             localField: 'aboutUserId',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     },
        //     {
        //         $unwind: '$aboutUser'
        //     }
        // ]).toArray()
        // orders = orders.map(order => {
        //     order.byUser = { _id: order.byUser._id, fullname: order.byUser.fullname }
        //     order.aboutUser = { _id: order.aboutUser._id, fullname: order.aboutUser.fullname }
        //     delete order.byUserId
        //     delete order.aboutUserId
        //     return order
        // })

        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function add(item) {
    try {
        // peek only updatable fields!
        console.log('ORDER.SERVICE:', item)
        const store = asyncLocalStorage.getStore()
        const { userId } = store
        const orderToAdd = {
            createdAt: Date.now(),
            // status: 'pending',
            itemId: ObjectId(item._id),
            sellerId: ObjectId(item.seller._id),
            buyerId: ObjectId(userId)
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        item.purchasedAt = Date.now()
        itemService.update(item)
        return orderToAdd;
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    add
}