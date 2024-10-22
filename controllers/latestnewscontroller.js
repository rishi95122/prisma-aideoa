// controllers/postController.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add a new post
export const addPost = async (req, res) => {
  const { title, description, images } = req.body;

  try {
    const post = await prisma.LatestNews.create({
      data: {
        title,
        description,
        images,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.LatestNews.findMany();
    const formattedPosts = posts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        images: post.images.split(",").map((url) => ({ url: url.trim() })),
        createdAt: post.createdAt,
      };
    });
    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.LatestNews.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const formattedPosts = {
      id: post.id,
      title: post.title,
      description: post.description,
      images: post.images.split(",").map((url) => ({ url: url.trim() })),
      createdAt: post.createdAt,
    };
    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, images } = req.body;

  try {
    const post = await prisma.LatestNews.update({
      where: { id: parseInt(id) },
      data: { title, description, images },
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.LatestNews.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
};
