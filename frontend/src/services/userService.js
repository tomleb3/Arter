import { httpService } from './httpService'
import { utilService } from './utilService'
// import { storageService } from './asyncStorageService'
// import userService from './userService'
// import { utilService } from './utilService'

export const userService = {
    query,
    save,
    remove,
    getById,
    login,
    signup,
    logout,
    getLoggedinUser
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
    // else
    //     return httpService.post('user/', userToSave) // CREATE
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
    // return storageService.delete('item', itemId)
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    // return _handleLogin(user)

    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.clear()
    return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}