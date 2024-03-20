import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { prisma } from "@/utils/prisma";

export type User = {
  id: string;
  name: string;
  password: string;
  email: string;
};

export type UserCreateInput = {
  name: string;
  password: string;
  email: string;
};

export let userList: User[] = [
  {
    id: nanoid(),
    name: "Learn Next.js",
    password: "dsadadsdsa",
    email: "temp@gmail.com",
  },
];
type Login = {
  email: string;
  password: string;
};

export const getUserList = async () => {
  try {
    const result = await prisma.user.findMany();
    return result;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error fetching users");
  }
};
export const loginUser = async (input: Login) => {
  try {
    const { email, password } = input;
    const result = await prisma.user.findUnique({ where: { email } });
    if (!result) throw new GraphQLError("email or password was incorrect");
    const match = await bcrypt.compare(password, result.password);
    if (match) {
      return result;
    } else {
      throw new GraphQLError("email or password was incorrect");
    }
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error logging in");
  }
};

export const createUser = async (input: UserCreateInput) => {
  try {
    const { email, password } = input;
    input.password = await bcrypt.hash(password, 10);
    const Check = !!(await prisma.user.findUnique({ where: { email } }));
    if (Check) {
      throw new GraphQLError("User Already Exists");
    }
    const result = await prisma.user.create({ data: input });
    return result;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error creating a user");
  }
};

export const getUserById = async (id: string) => {
  try {
    if (id === null) {
      return;
    }
    const result = await prisma.user.findUnique({ where: { id } });
    return result;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error finding user");
  }
};
export const deleteUser = async (input: { id: string }) => {
  try {
    const { id } = input;
    const result = await prisma.user.delete({ where: { id } });
    return result;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error deleting a user");
  }
};
export const updateUser = async (input: User) => {
  try {
    const { id, name, email, password } = input;
    const result = await prisma.user.update({
      where: { id },
      data: { name, email, password },
    });
    return result;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error updating a user");
  }
};
