import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get all resources
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 