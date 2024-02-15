import bcrypt from 'bcryptjs';
import {
  deleteUserById,
  insertUser,
  listAllUsers,
  selectUserById,
  updateUserById,
} from '../models/user-model.mjs';

// TODO: use userModel (db) insted of mock data
// implement route handlers below for users (real data)

const getUsers = async (req, res) => {
  const result = await listAllUsers();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const getUsersById = async (req, res) => {
  const result = await selectUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const postUser = async (req, res) => {
  const {username, password, email} = req.body;
  if (username && password && email) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await insertUser({
      username,
      email,
      password: hashedPassword,
    });
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

const putUser = async (req, res) => {
  const user_id = req.params.id;
  const {username, password, email} = req.body;
  // check that all needed fields are included in request
  if (user_id && username && password && email) {
    const result = await updateUserById({user_id, ...req.body});
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

const deleteUser = async (req, res) => {
  const result = await deleteUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getUsers, getUsersById, postUser, putUser, deleteUser};
