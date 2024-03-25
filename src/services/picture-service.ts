import { Picture, PictureCreateInput } from "@/graphql/generated";
import { nanoid } from "nanoid";
import { userList } from "./user-service";
import { prisma } from "@/utils/prisma";
import { GraphQLError } from "graphql";

let pictureList: Picture[] = [
  {
    id: nanoid(),
    title: "Yes Sir Black",
    description: "This is the color black asd",
    photo: "@/assets/images/favicon.png",
    color: "rgb(0,0,0)",
    userId: userList[0].id,
    username: "Dog",
  },
];

export const createPicture = async (input: PictureCreateInput) => {
  try {
    const result = await prisma.picture.create({ data: input });
    return result;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error posting");
  }
};
export const getPictureList = async () => {
  try {
    const result = await prisma.picture.findMany();
    return result;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error getting posts");
  }
};
export const getUsersPictureList = async (userId: string) => {
  try {
    const result = await prisma.picture.findMany({ where: { userId } });
    return result;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error getting your pictures");
  }
};
