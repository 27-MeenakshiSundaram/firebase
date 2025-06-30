import express from 'express';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controller/usercontroller';

const router = express.Router();

router.post('/', createUser);
router.get('/abc', getUsers);
router.get('/abcc/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
