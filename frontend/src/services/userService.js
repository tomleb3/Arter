import { httpService } from './httpService'
// import { storageService } from './asyncStorageService'
// import userService from './userService'
// import { utilService } from './utilService'

export const userService = {
    add,
    query,
    remove,
    getById
}


function query(filterBy) {
    var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    return httpService.get(`user/${queryStr}`)
    // return storageService.query('item')
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
    // return storageService.delete('item', itemId)

}
function add(user) {
    return httpService.post(`user`, user)
}