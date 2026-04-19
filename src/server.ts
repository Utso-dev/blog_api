import { prisma } from '../lib/prisma.js';
import app from './app.js';
const PORT = process.env.PORT || 4000;
const main = async () => {
  try {
    await prisma.$connect();
    console.log('Prisma Database connect successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    prisma.$disconnect();
    process.exit(1);
  }
};

main();
