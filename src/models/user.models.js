import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        require: true,
        unique: true,
        lowercase:true,
        trim: true,
        index: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase:true,
        trim: true,
    },
    role:{
        type: String,
        require: true,
        lowercase:true,
        trim: true,
    },
    phoneNumber:{
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
},
{
timestamps: true,
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)