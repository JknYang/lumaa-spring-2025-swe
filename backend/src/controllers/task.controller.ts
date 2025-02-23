import { Request, Response } from 'express';
import { pool } from '../models/db';
import { AuthRequest } from '../middleware/auth.middleware';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT * FROM tasks WHERE "userId" = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'INSERT INTO tasks (title, description, "userId") VALUES ($1, $2, $3) RETURNING *',
      [title, description, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, "isComplete" = $3 WHERE id = $4 AND "userId" = $5 RETURNING *',
      [title, description, isComplete, id, userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND "userId" = $2 RETURNING *', [id, userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
