import express from 'express';
import {
  deleteItem,
  getItemById,
  getItems,
  postItem,
  putItems,
} from '../controllers/item-controller.mjs';

const itemRouter = express.Router();

// define routes here
// GET http://127.0.0.1:3000/items
itemRouter.get('/', getItems);
// GET http://127.0.0.1:3000/items/<ID>
itemRouter.get('/:id', getItemById);
// POST http://127.0.0.1:3000/items/
itemRouter.post('/', postItem);
// PUT
itemRouter.put('/:id', putItems);
// DELETE
itemRouter.delete('/:id', deleteItem);

export default itemRouter;
