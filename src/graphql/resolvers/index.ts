import {
  JWT_SECRET,
  User,
  UserCreateInput,
  createUser,
  deleteUser,
  getUserById,
  getUserList,
  loginUser,
  updateUser,
} from "@/services/user-service";
import { Picture, UserLogin } from "../generated";
import {
  createPicture,
  getPictureList,
  getSearchPictures,
  getUsersPictureList,
} from "@/services/picture-service";
import jwt from "jsonwebtoken";

export const resolverMiddleware = {
  Query: {
    //@ts-ignore
    getUser: async (resolve, parent, args, context, info) => {
      //@ts-ignore
      const decoded = jwt.verify(args.token, JWT_SECRET);
      const result = await resolve(parent, decoded, context, info);
      return result;
    },
    //@ts-ignore
    getUsersPictureList: async (resolve, parent, args, context, info) => {
      //@ts-ignore
      const decoded = jwt.verify(args.token, JWT_SECRET);
      const result = await resolve(parent, decoded, context, info);
      return result;
    },
  },
};

export const resolvers = {
  Query: {
    getUserList: () => getUserList(),
    getPictureList: () => getPictureList(),
    getUsersPictureList: (_: unknown, token: any) => getUsersPictureList(token),
    getUser: (_: unknown, token: any) => getUserById(token),
    getSearchPictures: (
      _: unknown,
      { search, color }: { search: string; color: string }
    ) => getSearchPictures(search, color),
    loginUser: (_: unknown, { input }: { input: UserLogin }) =>
      loginUser(input),
  },
  Mutation: {
    createUser: (_: unknown, { input }: { input: UserCreateInput }) =>
      createUser(input),
    deleteUser: (_: unknown, { input }: { input: { id: string } }) =>
      deleteUser(input),
    updateUser: (_: unknown, { input }: { input: User }) => updateUser(input),
    createPicture: (_: unknown, { input }: { input: Picture }) =>
      createPicture(input),
  },
};
