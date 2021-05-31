const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)

    const user = await userService._getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')

    delete user.password
    return user
}

async function signup(email, password, fullname) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with email: ${email}, fullname: ${fullname}`)
    if (!email || !password || !fullname) return Promise.reject('All fields are required')

    try {
        await _checkEmail(email)
    } catch (err) {
        logger.error(`while checking email - ${email}`, err)
        throw err
    }
    try {
        await _checkPassword(password)
    } catch (err) {
        logger.error('password less than 6 characters', err)
        throw err
    }

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, password: hash, fullname })
}

async function _checkEmail(email) {
    try {
        if (!email) return
        email = email.toLowerCase()
        var emailPattern = new RegExp
            (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
        const isEmailValid = emailPattern.test(email)
        if (!isEmailValid) return Promise.reject('Enter a valid email address')
        const isEmailTaken = !!await userService._getByEmail(email)
        if (isEmailTaken) return Promise.reject(`Another account is using ${email}`)
        return Promise.resolve(true)
    } catch (err) {
        logger.error(`while finding user ${email}`, err)
        throw err
    }
}
async function _checkPassword(password) {
    try {
        if (!password) return
        if (password.length < 6) return Promise.reject('Password must be at least 6 characters')
        return Promise.resolve(true)
    } catch (err) {
        throw err
    }
}

module.exports = {
    signup,
    login,
}