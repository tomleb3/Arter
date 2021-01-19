import { orderService } from "../../services/orderService"

export function loadOrders(filterBy) {
    return async dispatch => {
        try {
            const orders = await orderService.query(filterBy)
            dispatch({ type: 'SET_ORDERS', orders })
        } catch (err) {
            console.log('orderActions:', err)
        }
    }
}

export function addOrder(item) {
    // console.log('order!!', order)
    return async dispatch => {
        try {
            console.log('orderActions: (ADD)')
            const addedOrder = await orderService.add(item)
            dispatch({ type: 'ADD_ORDER', order: addedOrder })
            return addedOrder
        } catch (err) {
            console.log('orderActions:', err)
            throw err
        }
    }
}

export function editOrder(order) {
    // console.log('order', order)
    return async dispatch => {
        try {
            const editedOrder = await orderService.update(order)
            dispatch({ type: 'EDIT_ORDER', order: editedOrder })
        } catch (err) {
            console.log('orderActions:', err)
        }
    }
}

export function removeOrder(orderId) {
    return async dispatch => {
        try {
            await orderService.remove(orderId)
            dispatch({ type: 'REMOVE_ORDER', orderId })
        } catch (err) {
            console.log('orderActions:', err)
        }
    }
}