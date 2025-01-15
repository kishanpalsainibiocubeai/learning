import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {User} from '../models/user.models.js'
// import jwt from 'jsonwebtoken'

const registerUser = asyncHandler(async(req, res) => {

    // get the user data from request body
    // validate the user input
    // check if the user already exists : username, email
    // check for image, check for avatar
    // uploade them on cloudinary, avatar
    // create the user in database
    // revome the password and refresh token feilds from response
    // check for user creation
    // save the user
    // send the response
    const { userName, email, password, phoneNumber, role} = req.body;

    console.log("email:", email);
        // if(=== "" || userName === "" || email === "" || password === ""){

        // }
        // or
        if(
            [ userName, email, password, phoneNumber, role].some((field) => field?.trim() === "")
        ){
            return new ApiError(400, "Please fill in all fields")
        }

    const existedUser = await User.findOne({$or: [{userName}, {email}]})

    if(existedUser){
        throw new ApiError(400, "userName or email already exists")
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        password,
        phoneNumber, 
        role,
        bioMetric: [],
    })

    // const createdUser = await User.findById(user._id).select("-password -refreshToken")

    console.log("user._id :", user);
    

    const createdUser = await User.findById(user._id).select("-password")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong!! Failed to create user")
    }

    

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    )
})


const getAllUsers = asyncHandler(async(req, res) => {

    const users = await User.find(); // Fetch all users
    
    if(!users){
        throw new ApiError(500, "Something went wrong!! Failed to get users")
    }

    res.status(200).json(  new ApiResponse(200, users, "User fetch successfully")); // Respond with the users
})

export {registerUser, getAllUsers}