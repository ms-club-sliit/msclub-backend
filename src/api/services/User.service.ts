import { DocumentDefinition } from "mongoose";
import { IUser, IUserRequest } from "../interfaces";
import UserModel from "../models/User.model";
import bcrypt from "bcrypt";

/**
 * @param {IUser} userData
 * @returns {Document} User document
 */
export const insertUser = async (
  userData: DocumentDefinition<IUserRequest>
) => {
  return await UserModel.create(userData)
    .then(async (user) => {
      await user.generateAuthToken();
      return user;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const authenticateUser = async (userName: string, password: string) => {
  try {
    return await UserModel.findByUsernamePassword(userName, password);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * @todo create @function getUsers to fetch all the users in the system
 */

/**
 * @todo create @function updateUser to update a user in the system
 * @param userId @type string
 * @param updateData @type DocumentDefinition<IUser>
 */

/**
 * @todo create @function deleteUser to delete the user
 * @param userId @type string
 */
