import express from 'express'
import zod from 'zod';
import { Account, User } from '../db.js';
import { JWT_SECRET } from './../config.js';
import jwt from 'jsonwebtoken'
import { authMiddleware } from '../middleware.js';
 
const userRouter = express.Router(); 

const userZodSchema = zod.object({
    firstName : zod.string(),
    lastName: zod.string(),
    username: zod.string(),
    password: zod.string()
})

const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

userRouter.get('/me', async (req, res) => {
    const token = req.headers.authorization;

    if(!token){
        return res.json({
            flag : false
        })
    }

    try{
        const tokenData = jwt.verify(token, JWT_SECRET);
        console.log(tokenData);
        const userId = tokenData.userId;
        const userData = await User.findOne({_id : userId}).select('-password').lean();
        res.json({
        flag : true,
        userData : userData
        })
    } catch (err) {
        console.log(err);
        res.json({
            flag : true,
        })
    }

    

})
 
userRouter.post('/signup', async(req, res) => {
    const userInput = req.body;
    const parsedInput = userZodSchema.safeParse(userInput);

    if(!parsedInput.success){
       return res.status(403).json({
            msg: "Invalid Input"
        })
    }

    const user = await User.findOne({username : userInput.username})

    if(user && user._id){
        return res.status(403).json({
            msg: "User already exists"
        })
    }

    try{
        const newUser = await User.create({
        firstName : userInput.firstName,
        lastName : userInput.lastName,
        username : userInput.username,
        password : userInput.password
    })
 
    await Account.create({
       userId :  newUser._id,
       balance : 1 + Math.random() * 10000
    })


    const token = jwt.sign({userId: newUser._id}, JWT_SECRET);

    res.json({
        msg: "User created successfully",
        token: token
    })

    } catch (err) {
        console.log(err);
        res.status(411).json({
            msg:"Something went wrong"
        })
    }

})

userRouter.post('/signin', async (req, res) => {
     const userInput = req.body;
     try{
        const user = await User.findOne({username : userInput.username});
        if(!user){
            return res.status(411).json({
                msg : "Sign in failed, user does not exists"
            })
        }
        if(userInput.password !== user.password){
            return res.status(411).json({
                msg : "Sign in failed, password incorrect"
            })
        }
        const token = jwt.sign({userId: user._id}, JWT_SECRET);
        res.json({
            msg: "Sign in success",
            token : token
        })
     } catch (err){
        console.log(err)
        res.status(411).json({
            msg: "Sign in failed"
        })
     }
})

userRouter.put('/', authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg : "Invalid input"
        })
    }

    try{
        await User.updateOne({_id: req.userId}, req.body);
        res.json({
            msg: "Updated successfully"
        })
    } catch (errr){
        console.log(errr);
        res.status(411).json({
            msg: "Something went wrong."
        })
    }
})

userRouter.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter;
    
    if(!filter){
        try{
            const allUsers = await User.find().select('-password').lean();
            return res.json({
                users : allUsers
            })
        } catch (err){
            console.log(err)
            return res.status(411).json({
                msg: "Failed to fetch users from DB"
            })
        }
    }
    
    const searchQuery = {
    $or: [
    { firstName: {$regex : filter, $options: 'i' } },
    { lastName: { $regex : filter, $options: 'i' }}
  ]
   };

   const filteredUsers = await User.find(searchQuery).select('-password').lean();
   
   res.json({
    users : filteredUsers
   })

})


export { userRouter }