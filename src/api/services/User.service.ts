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
 *get all users
 */
 export const getUsers = async () => {
  return await UserModel.find()
    .then((users) => {
      return users;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * update user
 * @param userId @type string
 * @param updateData @type DocumentDefinition<IUser>
 */
export const updateData = async (
  userId: string,
  updateData: DocumentDefinition<IUser>
) => {
  return await UserModel.findById(userId)
    .then(async (userDetails) => {
      if (userDetails) {
        if (userDetails.deletedAt) {
          if (updateData.firstName) {
            userDetails.firstName = updateData.firstName;
          }
          if (updateData.lastName) {
            userDetails.lastName = updateData.lastName;
          }
          if (updateData.phoneNumber01) {
            userDetails.phoneNumber01 = updateData.phoneNumber01;
          }
          if (updateData.phoneNumber02) {
            userDetails.phoneNumber02 = updateData.phoneNumber02;
          }
          if (updateData.email) {
            userDetails.email = updateData.email;
          }
          if (updateData.userName) {
            userDetails.userName = updateData.userName;
          }
          if (updateData.password) {
            userDetails.password = updateData.password;
          }
          if (updateData.profileImageUrl) {
            userDetails.profileImageUrl = updateData.profileImageUrl;
          }
          if (updateData.permissionLevel) {
            userDetails.permissionLevel = updateData.permissionLevel;
          }
          
          return await userDetails.save();
        } else {
          throw new Error("User is not found");
        }
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * delete user
 * @param userId @type string
 */
export const deleteUser = async (userId: string) => {
  return await UserModel.findById(userId)
    .then(async (userDetails) => {
      if (userDetails?.deletedAt) {
        userDetails.deletedAt = new Date();
        return await userDetails.save();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

