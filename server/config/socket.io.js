module.exports = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: process.env.SOCKETIO_ORIGIN,
            credentials: true
        },
            allowEIO3: true
        });  
    return io
}