import { PrismaClient } from "@prisma/client";

// const client = global.prismadb || new PrismaClient();
// if (process.env.NODE_ENV === "production") {
//   global.prismadb = client;
// }

const client = new PrismaClient();

export default client;
