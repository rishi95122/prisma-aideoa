import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteData() {
  try {
    await prisma.transferRequest.deleteMany();
    console.log('All records deleted.');
  } catch (error) {
    console.error('Error deleting records:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteData();
