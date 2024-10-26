import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all quizzes
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};



// Create a new quiz
export const createQuiz = async (req, res) => {
  const { title, description, quizUrl, category } = req.body;
  console.log(req.body)
  try {
    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        description,
        quizUrl,
        category
      }
    });
    res.status(200).json({message:"Test Added"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Update a quiz by ID
export const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, description, quizUrl, category } = req.body;
  console.log(id)
  try {
    const updatedQuiz = await prisma.quiz.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        quizUrl,
        category
      }
    });
    res.status(200).json({message:"Test updated"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update quiz' });
  }
};

// Delete a quiz by ID
export const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    await prisma.quiz.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).send({message:"Test deleted"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};
