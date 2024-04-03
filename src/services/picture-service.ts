import { Picture, PictureCreateInput } from "@/graphql/generated";
import { nanoid } from "nanoid";
import { userList } from "./user-service";
import { prisma } from "@/utils/prisma";
import { GraphQLError } from "graphql";

const hexCheck = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
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
export const getUsersPictureList = async (token: any) => {
  try {
    if (token === undefined) return;
    const result = await prisma.picture.findMany({
      where: { userId: token.id },
    });
    return result;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error getting your posts");
  }
};
export const getSearchPictures = async (search: string, color: string) => {
  try {
    let colorCheck = color[1] + color[3] + color[5];
    // if(colorCheck !== undefined){
    // }
    const colorRes = await prisma.picture.findMany({ take: 10 });
    const filterRes = colorRes.filter((e) => {
      return e.title.toLowerCase().includes(search.toLowerCase());
    });
    if (color === "cyan") {
      return filterRes;
    }
    const filtered = filterRes.filter((e) => {
      // if(e.color?.hex){}
      let holder = "";
      //@ts-ignore
      const hexs = e.color?.hex;
      let temp = 0;
      holder += hexs[1] + hexs[3] + hexs[5];
      for (let i = 0; i < holder.length; i++) {
        for (let k = 0; k < hexCheck.length; k++) {
          if (hexCheck[k] === holder[i]) {
            if (
              colorCheck[i] === hexCheck[k] ||
              colorCheck[i] === hexCheck[k + 1] ||
              colorCheck[i] === hexCheck[k - 1]
            ) {
              temp += 1;
              break;
            }
          }
        }
      }
      if (temp === 3) {
        return e;
      }
    });
    return filtered;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Error getting posts");
  }
};
