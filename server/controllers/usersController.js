const User = require("../models/User")
const Books = require("../models/Books")

const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")

//get all users
//method get
//route /users
const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean()
    //check if their is any users
    if(!users?.length) {
        return res.status(400).json({message: "No users found"})
    }
    res.json(users)

})

//get create new users
//method post
//route /users
const createNewUser = asyncHandler(async (req, res) => {
    const {username, password, roles} = req.body
    //confirmming data
    if(!username || !password ||!Array.isArray(roles) || !roles.length){
        return res.status(400).json({message: "All fields are required"})

    }
    //check for dulicate
    const duplicate = await User.findOne({username}).lean().exec()

    if(duplicate){
        return res.status(409).json({message : "Duplicate username"})

    }
    //hashpassword
    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = {username , "password":hashedPwd , roles}

    //creae and store
    const user = await User.create(userObject)
    if(user){
        res.status(201).json({message: `New user ${username} created`})
    }else{
        res.status(400).json({message : "Invalid user data received"})
    }


})
//get create update users
//method is Patch
//route /users
const updateUser = asyncHandler(async (req, res) => {
    const {id , username , roles , active , password} = req.body
    //confirming the data
    if(!id || !username || !Array.isArray(roles) ||!roles.length || typeof active !== "boolean"){
       return res.status(400).json({message: "All field are requred"})
    }
    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message: "User not found"})
    }
    //duplicate check
    const duplicate = await User.findOne({username}).lean().exec()
    //allow update to original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        //hash password
        user.password = await bcrypt.hash(password , 10)
    }
    const updateUser = await user.save()

    res.json({message : ` ${updateUser.username} updated`})
})

//get create delet users
//method is delete
//route /users
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id){
        return res.status(400).json({message : "user ID requred"}) 
    }
    const book =await Books.findOne({user: id}).lean().exec()

    if(book){
        return res.status(400).json({message : "User has assigned books"})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message : "User not found"})

    }
    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted `
    res.json(reply)
})


module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
}