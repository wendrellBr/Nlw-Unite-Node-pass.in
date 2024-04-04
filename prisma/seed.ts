import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "e8b19ded-be09-440b-97ae-26221072e63d",
      title: "Unite Summit",
      slug: "unite-summit",
      details: "Um evento p/ devs apaixonados(as) por código!",
      maximumAttendees: 120,
    },
  });
}
seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
