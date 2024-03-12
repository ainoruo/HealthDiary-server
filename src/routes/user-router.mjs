import express from 'express';
import {body, param} from 'express-validator';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

const userRouter = express.Router();

userRouter
  .route('/')
  // update user
  .put(
    authenticateToken,
    body('username', 'username must be 3-20 characters long and alphanumeric')
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('password', 'minimum password length is 8 characters')
      .trim()
      .isLength({min: 8, max: 128}),
    body('email', 'must be a valid email address')
      .trim()
      .isEmail()
      .normalizeEmail(),
    validationErrorHandler,
    putUser
  );

// user endpoint
userRouter
  .route('/')
  // list users
  .get(authenticateToken, getUsers)

  // user registration
  .post(
    body('username', 'username must be 3-20 characters long and alphanumeric')
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('password', 'minimum password length is 8 characters')
      .trim()
      .isLength({min: 8, max: 128}),
    body('email', 'must be a valid email address')
      .trim()
      .isEmail()
      .normalizeEmail(),
    validationErrorHandler,
    postUser
  );

// /user/:id endpoint
userRouter
  .route('/:id')
  // get info of a user
  .get(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    getUserById
  )
  // delete user based on id
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteUser
  );

export default userRouter;
