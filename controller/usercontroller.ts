import { Request, Response } from 'express';
import { db } from '../firebase';
import { user } from '../dto/usermodel';

const usersRef = db.ref('users');

// Create
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUserRef = usersRef.push();
    await newUserRef.set(req.body);
    res.status(200).json({ id: newUserRef.key, ...req.body });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
};

// Get All
export const getUsers = async (_: Request, res: Response) => {
  try {
    const snapshot = await usersRef.once('value');
    const data = snapshot.val();
    const result: { id: string; user: user }[] = [];
    if (data) {
      Object.entries(data).forEach(([id, user]) => {
        result.push({ id, user: user as user });
      });
    }

   res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

// Get by ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const snapshot = await usersRef.child(req.params.id).once('value');
    if (snapshot.exists()) {
      const user = snapshot.val() as user;
      res.send({ id: req.params.id, user:user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
};

// Update
export const updateUser = async (req: Request<{id:string}, {}, Partial<user>>, res: Response) => {
  try {
    await usersRef.child(req.params.id).update(req.body);
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
};

// Delete
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await usersRef.child(req.params.id).remove();
    res.json({ message: 'User deleted' });
  } catch (error) { 
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};
