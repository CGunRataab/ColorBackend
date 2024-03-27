import {
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

export const resolvers = {
  Query: {
    getUserList: () => getUserList(),
    getPictureList: () => getPictureList(),
    getUsersPictureList: (_: unknown, { userId }: { userId: string }) =>
      getUsersPictureList(userId),
    getUser: (_: unknown, { id }: { id: string }) => getUserById(id),
    getSearchPictures: (
      _: unknown,
      { search, color }: { search: string; color: string }
    ) => getSearchPictures(search, color),
  },
  Mutation: {
    loginUser: (_: unknown, { input }: { input: UserLogin }) =>
      loginUser(input),
    createUser: (_: unknown, { input }: { input: UserCreateInput }) =>
      createUser(input),
    deleteUser: (_: unknown, { input }: { input: { id: string } }) =>
      deleteUser(input),
    updateUser: (_: unknown, { input }: { input: User }) => updateUser(input),
    createPicture: (_: unknown, { input }: { input: Picture }) =>
      createPicture(input),
  },
};
