import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { prisma } from "@/utils/prisma";
import jwt from "jsonwebtoken";

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

export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

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
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new GraphQLError("email or password was incorrect");
    const check = await bcrypt.compare(password, user.password);
    if (!check) throw new GraphQLError("email or password was incorrect");
    //@ts-ignore
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return { token };
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

export const getUserById = async (token: any) => {
  try {
    if (token === null) {
      return;
    }
    const result = await prisma.user.findUnique({ where: { id: token.id } });
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
    let changingEmail: string | undefined = email;
    let changingPassword: string | undefined = password;
    let changingName: string | undefined = name;
    const previous = await prisma.user.findUnique({ where: { id } });
    if (email == "") {
      changingEmail = previous?.email;
    }
    if (password == "") {
      changingPassword = previous?.password;
    } else {
      changingPassword = await bcrypt.hash(changingPassword, 10);
    }
    if (name == "") {
      changingName = previous?.name;
    }
    const result = await prisma.user.update({
      where: { id },
      data: {
        name: changingName,
        email: changingEmail,
        password: changingPassword,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error updating a user");
  }
};
export const checkUser = async (input: User) => {
  try {
    const { email, password } = input;
    const result = await prisma.user.findUnique({ where: { email } });
    if (!result) throw new GraphQLError("User does not exist???");
    const check = await bcrypt.compare(password, result.password);
    if (!check) throw new GraphQLError("Password was incorrect");
    return check;
  } catch (err) {
    throw new GraphQLError("Error getting user");
  }
};
