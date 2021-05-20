import { httpService } from './httpService'
// import { storageService } from './asyncStorageService'
// import userService from './userService'
// import { utilService } from './utilService'

export const itemService = {
    add,
    update,
    query,
    remove,
    getById
}

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterTxt) {
    var queryStr = (!filterTxt) ? '' : `?txt=${filterTxt}`
    return httpService.get(`item${queryStr}`)
    // return storageService.query('item')
}

function getById(itemId) {
    return httpService.get(`item/${itemId}`)
}

function remove(itemId) {
    return httpService.delete(`item/${itemId}`)
}

function add(item) {
    return httpService.post('item', item)
}

function update(item) {
    return httpService.put(`item/${item._id}`, item)
}