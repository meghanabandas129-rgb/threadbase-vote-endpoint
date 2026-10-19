import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Test User",
    },
  });

  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "First Post",
      body: "Welcome to Threadbase",
    },
  });

  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      title: "Second Post",
      body: "Testing the vote endpoint",
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
