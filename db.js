const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: String,
    password: String,
    age: Number
})

const User = mongoose.model('users', usersSchema)

async function getUsers() {
    const users = await User.find()
    return users
}

async function getUserByID(userId) {
    const user = await User.findOne({_id: userId})
    return user
}

async function createUser(newUser) {
    const user = await User.create(newUser)
    return user;
}

async function deleteUserByID(userId) {
    const result = await User.deleteOne({_id: userId})
    return result.deletedCount === 1
}

async function updateUserName(userId, newUserName) {
    const result = await User.updateOne({_id: userId}, {$set: {name: newUserName}})
    return result.modifiedCount === 1
}

async function createConnection() {
    try {
        let dbName = 'exampleDB'
        await mongoose.connect('mongodb://localhost:27017/' + dbName)
        console.log('database connected');
    } catch(error) {
        console.log(error);
    }
}

createConnection()

module.exports = {
    getUsers,
    getUserByID,
    createUser,
    deleteUserByID,
    updateUserName
}