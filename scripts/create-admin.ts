import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const db = new PrismaClient();
const rl = createInterface({ input, output });

async function main() {
  const email = (await rl.question("Admin email: ")).trim().toLowerCase();
  const password = await rl.question("Admin password (min 12 chars): ");
  if (!email || password.length < 12) throw new Error("Use a valid email and a password of at least 12 characters.");

  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN" },
    create: { email, passwordHash, role: "ADMIN", name: "Ozaib Admin" },
  });

  await db.siteSettings.upsert({ where: { id: "site" }, update: {}, create: { id: "site" } });
  await db.profile.upsert({ where: { id: "profile" }, update: {}, create: { id: "profile" } });

  console.log("Admin account created/updated successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
}).finally(async () => {
  await rl.close();
  await db.$disconnect();
});