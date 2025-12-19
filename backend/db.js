import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI)

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required : true,
        maxLength : 50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const accountSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    balance: {
        type: Number,
        required : true
    }
})


const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

export {User, Account} 
