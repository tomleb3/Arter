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
    return httpService.put(`user/${userToSave._id}`, userToSave)
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
    // return storageService.delete('item', itemId)
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.email === userCred.email)
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
    return JSON.parse(sessionStorage.getItem('loggedInUser'))
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user))
    console.log(user)
    return user
}