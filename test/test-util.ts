import { prismaClient } from "./../src/application/database";
import bcrypt from "bcrypt";
import { Substation, User } from "@prisma/client";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "test",
        name: "test",
        role: "test",
        password: await bcrypt.hash("test", 10),
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "test",
      },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    return user;
  }
}

export class SubstationTest {
  static async deleteAll() {
    await prismaClient.substation.deleteMany({
      where: {
        name: "Ploso",
      },
    });
  }

  static async create() {
    await prismaClient.substation.create({
      data: {
        name: "Ploso",
        address: "Jalan Raya Tembelang",
        contact: "085123456789",
        ip_address: "10.1.0.1",
        dcc: "Barat",
      },
    });
  }

  static async get(): Promise<Substation> {
    const substation = await prismaClient.substation.findFirst({});

    if (!substation) {
      throw new Error("Substation is not found");
    }

    return substation;
  }
}
