const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')
const itemService = require('../item/item.service')
const userService = require('../user/user.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        var orders = await collection.aggregate([
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
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'buyerId',
                    foreignField: '_id',
                    as: 'buyer'
                }
            },
            {
                $unwind: '$buyer'
            },
            {
                $lookup:
                {
                    from: 'item',
                    localField: 'itemId',
                    foreignField: '_id',
                    as: 'item'
                }
            },
            {
                $unwind: '$item'
            }
        ]).toArray()
        console.log(orders)
        return orders.map(order => {
            delete order.sellerId
            delete order.buyerId
            delete order.itemId
            delete order.seller.password
            delete order.buyer.password
            return order
        })
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function add(item) {
    try {
        console.log('ORDER.SERVICE:', item)
        const store = asyncLocalStorage.getStore()
        const { userId } = store
        const orderToAdd = {
            createdAt: Date.now(),
            status: 'pending',
            shippingStatus: 'pending',
            itemId: ObjectId(item._id),
            sellerId: ObjectId(item.seller._id),
            buyerId: ObjectId(userId)
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        item.purchasedAt = Date.now()
        await itemService.update(item)
        const fullbuyer = await userService.getById(userId)
        orderToAdd.item = item
        orderToAdd.seller = item.seller
        orderToAdd.buyer = fullbuyer 
        return orderToAdd; 
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const user = await collection.findOne({ '_id': ObjectId(orderId) })
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
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