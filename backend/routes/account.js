import express from 'express';
import { authMiddleware } from '../middleware.js';
import { Account } from '../db.js';
import mongoose from 'mongoose';

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req,res) => {
    const userId = req.userId;
    try{
        const account = await Account.findOne({userId : userId});
        res.json({
            balance : account.balance
        })
    } catch(err){
        console.log(err)
        res.status(411).json({
            msg:"Something went wrong while fetching balance"
        })
    }
})

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession(); //Start a session object

    try{

    
    //Start transaction
    session.startTransaction();

    const {to , amount} = req.body; //Retrive body

    //Find the account in the session 
    const account = await Account.findOne({userId : req.userId}).session(session);

    //Check if account and amoutn is valid
    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient balance"
        })
    }

    //Get to account inside the session
    const toAccount = await Account.findOne({userId : to}).session(session);

    //Check if account is valid or not
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Invalid account"
        })
    }

    //Perform the transaction in the session
    await Account.updateOne({userId: req.userId}, { $inc : { balance : -amount }}).session(session);
    await Account.updateOne({userId: to}, { $inc : {balance : amount}}).session(session);

    //Commit the transaction
    await session.commitTransaction();
    res.json({
        msg: "Transaction complete"
    })
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        res.status(500).json({msg : "Transaction failed"})
    } finally {
        session.endSession();
    }

})



export {accountRouter}