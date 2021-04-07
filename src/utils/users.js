//require('../db/mongoose')
const users = []

const addUser = ({ id,username,room }) => {
    //Clean data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Validate the data
    if(!username || !room){
        return {
            error:'Username and room are required!'
        }
    }
    //Check for existing user
    const existingUser = users.find((user) =>{
        return user.room === room && user.username === username
    })

    //Validate username
    if(existingUser){
        return{
            error:'Username exists!'
        }
    }

    //store user
    const user = {id,username,room}
    users.push(user)
    return{ user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) =>{
        return user.id === id
    })
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id) => {
    //console.log(users)
   return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}


// addUser({
//     id:22,
//     username:'Medha   ',
//     room:'  South Philly'
// })
// addUser({
//     id:42,
//     username:'Mitali',
//     room:'  South Philly'
// })
// addUser({
//     id:32,
//     username:'Medha   ',
//     room:'Center City'
// })
