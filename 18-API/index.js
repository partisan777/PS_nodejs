import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class App {
    async init() {
        await prisma.$connect();
    };
};

const app = new App();
app.init();
