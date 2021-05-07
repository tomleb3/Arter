import { httpService } from './httpService'

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

function query() {
    return httpService.get(`user`)
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

async function save(userToSave) {
    const loggedInUser = getLoggedinUser()
    const savedUser = await httpService.put(`user/${userToSave._id}`, userToSave)
    savedUser._id === loggedInUser._id && _saveLocalUser(savedUser)
    return savedUser
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}

async function logout() {
    localStorage.clear()
    return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'))
}

function _saveLocalUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    return user
}