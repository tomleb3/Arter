import { httpService } from './httpService'

export const orderService = {
    add,
    update,
    query,
    // save,
    getById
    // remove,
}

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterTxt) {
    var queryStr = (!filterTxt) ? '' : `?tags_like=${filterTxt}`
    return httpService.get(`order/${queryStr}`)
    // return storageService.query('order')
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}

// function save(orderToSave) {
//     if (orderToSave._id)
//         return httpService.put(`order/${orderToSave._id}`, orderToSave) // UPDATE
//     else
//         return httpService.post('order/', orderToSave) // CREATE
// }

function add(item) {
    console.log('orderService: (ADD)')
    return httpService.post(`order/`, item)
}

function update(order) {
    // console.log('order', order)
    return httpService.put(`order/${order._id}`, order)
}

// function remove(orderId) {
//     return httpService.delete(`order/${orderId}`)
//     // return storageService.delete('order', orderId)
// }