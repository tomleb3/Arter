import { httpService } from './httpService'
import { utilService } from './utilService'
// import { storageService } from './asyncStorageService'
// import userService from './userService'
// import { utilService } from './utilService'

export const userService = {
    query,
    save,
    remove,
    getById
}

function query(filterBy) {
    var queryStr = (!filterBy) ? '' : `?fullname_like=${filterBy.name}&sort=anaAref`
    return httpService.get(`user/${queryStr}`)
    // return storageService.query('item')
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

function save(userToSave) {
    if (userToSave._id)
        return httpService.put(`user/${userToSave._id}`, userToSave) // UPDATE
    else
        return httpService.post('user/', userToSave) // CREATE
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
    // return storageService.delete('item', itemId)
}

// function add(user) {
//     return httpService.post(`user`, user)
// }