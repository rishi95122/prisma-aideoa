// routes/postRoutes.mjs
import express from "express";
import {
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/latestnewscontroller.js";

const router = express.Router();

// Create a new post
router.post("/posts", addPost);

// Get all posts
router.get("/posts", getPosts);

// Get a specific post by ID
router.get("/posts/:id", getPostById);

// Update a post by ID
router.put("/posts/:id", updatePost);

// Delete a post by ID
router.delete("/posts/:id", deletePost);

export default router;
