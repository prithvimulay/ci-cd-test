const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../generated/prisma');

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global;

let prisma;

if (!globalForPrisma.prisma) {
    // Read the directly exposed custom Postgres connection 
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    
    globalForPrisma.prisma = new PrismaClient({ 
        adapter, 
        log: ['query', 'info', 'warn', 'error'] 
    });
}
prisma = globalForPrisma.prisma;

module.exports = prisma;
