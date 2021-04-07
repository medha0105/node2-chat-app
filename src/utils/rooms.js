const {Room} = require('../db/mongoose')


const addUserToRoom = async({ username }) => {
    
    const room = new Room()
    room.roomData.push({
        username:username,
        createdAt:new Date().getTime(),
        textMessage:'underscoreunderscoreunderscore'
    })
    await room.save()
}

addUserToRoom({
    username:'Medha'
})
addUserToRoom({
    username:'Manasi'
})
addUserToRoom({
    username:'Krutika'
})
