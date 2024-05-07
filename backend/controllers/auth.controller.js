import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return next(errorHandler(400, "All fields are Required"));
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "Email Address already exists!" });
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();
        return res.json({ success: true, message: "Sign Up Successful!" });

    } catch (error) {
        next(error)
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, "All fields are Required"));
    }

    try {
        // check the user is valid or not
        const validUser = await User.findOne({ email })
        if(!validUser){
            return next(errorHandler(404, "User not found"))
        }

        // compare the password
        const validPassword = bcrypt.compare(password, validUser.password)
        if(!validPassword) {
            return next(errorHandler(400, "Invalid Password"))
        }

        // if the user email or password is valid then will generate a token to uniqueness
        const token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET)
        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)

    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    const {email, name, googlePhotoUrl} = req.body

    try {
        const user = await User.findOne({email})
        
        if(user) {
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)
            const {password, ...rest} = user._doc
            return res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = await bcrypt.hash(generatePassword, 10)
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            })
            
            await newUser.save()

            const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET)
            const {password, ...rest} = newUser._doc

            return res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
        }

    } catch (error) {
        next(error)
    }
}
