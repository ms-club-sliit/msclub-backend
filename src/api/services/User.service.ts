import { DocumentDefinition } from 'mongoose';
import { IUser } from '../interfaces';
import UserModel from '../models/User.model';
import bcrypt from 'bcrypt';

/**
 * @param {IUser} userData
 * @returns {Document} User document
 */
export const insertUser = async (userData: DocumentDefinition<IUser>) => {
  return await UserModel.create(userData)
    .then(async (user) => {
      await user.generateAuthToken();
      return user;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

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
