const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/chat-room-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})

const RoomSchema = new mongoose.Schema({
    roomData:[{
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        createdAt:{
            type:String
        },
        textMessage:{
            type:String
        }

}]})

const Room = mongoose.model('Room',RoomSchema)

// const room = new Room()
// room.roomData.push({
//     username:'firstUser',
//     createdAt:new Date().getTime(),
//     textMessage:'underscoreunderscoreunderscore'
// })

// const room = Model.create({roomData:[
//     {
//             username:'firstUser',
//             createdAt:new Date().getTime(),
//             textMessage:'underscoreunderscoreunderscore'
//     }
// ]})
// room.roomData.push({
//     username:'secondUser',
//     createdAt:new Date().getTime(),
//     textMessage:'underscoreunderscorehiphen'
// })
// room.roomData.push({
//     username:'thirdUser',
//     createdAt:new Date().getTime(),
//     textMessage:'underscorehiphen'
// })

// room.save().then(() =>{
//     console.log(room)
// }).catch((error) =>{
//     console.log('Error',error)
// })
module.exports = {Room}