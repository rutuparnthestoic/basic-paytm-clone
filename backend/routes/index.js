import express from 'express'
import { userRouter } from './user.js' ;
import { accountRouter } from './account.js';

const router = express.Router();

//As we know all our routes will be /user prefixed, we create a user router for same.
router.use("/user", userRouter);
router.use("/account", accountRouter)

export {router}