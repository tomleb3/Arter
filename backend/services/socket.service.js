const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}
var gSocketByUserIdMap = {}

function emit({ type, data }) {
    gIo.emit(type, data);
}

function connectSockets(http, session) {
    gIo = require('socket.io')(http);

    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', socket => {
        // console.log('socket.handshake', socket.handshake)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            if (socket.handshake) {
                delete gSocketBySessionIdMap[socket.handshake.sessionID]
            }
        })
        socket.on('LOGIN', user => {
            console.log('LOGGED IN !!!!!!')
            gSocketByUserIdMap[user._id] = socket
        })
        socket.on('ORDER_OUT', order => {
            console.log('ORDER OUT !!!!!!')
            const sellerSocket = gSocketByUserIdMap[order.sellerId]
            if (sellerSocket) sellerSocket.emit('ORDER_IN', order)
        })
    })
}

// Send to all sockets BUT not the current socket 
function broadcast({ type, data }) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map', gSocketBySessionIdMap)
    excludedSocket.broadcast.emit(type, data)
}

module.exports = {
    connectSockets,
    emit,
    broadcast
}