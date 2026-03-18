require('dotenv').config();
const app = require('./src/app');
const prisma = require('./src/lib/prisma');
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Backend running on http://localhost:${PORT}/api/`);

    // Check Database connection using Prisma Client
    try {
        await prisma.$connect();
        console.log('Successfully connected to the PostgreSQL database via Prisma.');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
});
console.log('Restarting...');