// src/routes/newsRoutes.mjs
import express from 'express';
import { getAllNews, createNews, updateNews, deleteNews } from '../controllers/studentNews.js';

const router = express.Router();

// GET all news
router.get('/', getAllNews);

// POST create a new news item
router.post('/', createNews);

// PUT update a news item
router.put('/:id', updateNews);

// DELETE a news item
router.delete('/:id', deleteNews);

export default router;
