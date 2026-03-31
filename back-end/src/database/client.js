import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";


// 1. Configuramos o log para emitir eventos do nível 'query'
const prisma = new PrismaClient({
 log: [
   { emit: 'event', level: 'query' },
   { emit: 'stdout', level: 'error' },
   { emit: 'stdout', level: 'info' },
   { emit: 'stdout', level: 'warn' },
 ],
});


// 2. Criamos o listener que intercepta o evento e exibe no console
prisma.$on('query', (e) => {
 console.log('---');
 console.log('Query: ' + e.query);
 console.log('Params: ' + e.params);
 console.log('Duration: ' + e.duration + 'ms');
});


export { prisma };