import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'

export const home = (req, res) => {
    res.json({message: "API is working"})
}

// controller to update the user profile...
export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, "You are not allowed to update this user."))
    }

    if(req.body.password) {
        if(req.body.password.length < 6){
            return next(errorHandler(400, "Password must be at least 6 characters"))
        }
        
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    if(req.body.username) {
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return res.next(errorHandler(400, "Username must be between 7 and 20 characters"))
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, "Username cannot contain spaces"))
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, "Username must be lowercase"))
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, "Username can only contain letters and numbers"))
        }

        try {
            const updateUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password
                }
            }, {new: true})

            const {password, ...rest} = updateUser._doc;
            return res.status(200).json(rest)
        } catch (error) {
            next(error)
        }
    }
}

// controller to delete the user profile...
export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, "You are not allowed to delete this user."))
    }

    try {
        await User.findByIdAndDelete(req.params.userId)
        return res.status(200).json("User has been deleted")
    } catch (error) {
        next(error)
    }
}

// controller to signout the user profile
export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json("User has been Sign Out")
    } catch (error) {
        next(error)
    }
}