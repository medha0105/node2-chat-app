const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage,generateLocation} = require('./utils/messgaes')
const {addUser,removeUser,getUser,getUsersInRoom} = require('./utils/users')

const app = express()
//creating a server using the core module http
const server = http.createServer(app)
//instance of socketio
const io = socketio(server)

const port = process.env.PORT || 3000
//console.log(__dirname)

const publicDirectoryPath = path.join(__dirname,'../public')
//express middleware to serve the html
app.use(express.static(publicDirectoryPath))

//server (emit)(.emit) => client(receives)(.on) => countUpdated
//client(emit) => server(receives) => increment

io.on('connection',(socket) =>{
    console.log('New WebSocket connection')

    socket.on('join',({username,room},callback) =>{
        const { error,user } = addUser({ id: socket.id,username,room})
        if(error) {
            return callback(error)
        }
        
        socket.join(user.room)
        
        socket.emit('message',generateMessage('Admin','Welcome!'))
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username} has joined!`))
        io.to(user.room).emit('roomData',{
            room:user.room,
            users:getUsersInRoom(user.room)
        })
        //io.to.emit- sends an event to all clients in a room
        //socket.broadcast.to.emit
        callback()
    })

    socket.on('sendMessage',(message, callback) =>{
        const user = getUser(socket.id)
        
        const filter = new Filter()
        if(filter.isProfane(message)) {
            return callback('Profanity is prohibited!')
        }
        if(user) {
            io.to(user.room).emit('message',generateMessage(user.username,message))
        }
        callback()
    })

    //custom event
    socket.on('sendLocation',(position,callback) =>{
        console.log(socket.id)
        const user = getUser(socket.id)
        
        io.to(user.room).emit('locationMessage',generateLocation(user.username,`https://google.com/maps?q=${position.lattitude},${position.longitude}`))
        callback()
        
    })

    //client disconnected- predefined
    socket.on('disconnect' ,() =>{
        const user = removeUser(socket.id)
        if(user) {
            io.to(user.room).emit('message',generateMessage('Admin',`${user.username} has left!`))
            io.to(user.room).emit('roomData',{
                room:user.room,
                users:getUsersInRoom(user.room)
            })
        }
    })

})
server.listen(port, () =>{
    console.log(`Server is up and running on ${port}`)
})