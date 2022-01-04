import { DocumentDefinition, Schema } from "mongoose";
import { IUser, IUserRequest } from "../../interfaces";
import UserModel from "../models/User.model";
import bcrypt from "bcrypt";

/**
 * @param {IUser} userData
 * @returns {Document} User document
 */
export const insertUser = async (userData: DocumentDefinition<IUserRequest>) => {
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
 *get all users
 */
export const getUsers = async () => {
  return await UserModel.find({ deletedAt: null })
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
export const updateUser = async (userId: string, updateData: DocumentDefinition<IUser>) => {
  return await UserModel.findById(userId)
    .then(async (userDetails) => {
      if (userDetails) {
        if (userDetails.deletedAt === null) {
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
          if (updateData.profileImage) {
            userDetails.profileImage = updateData.profileImage;
          }
          if (updateData.permissionLevel) {
            userDetails.permissionLevel = updateData.permissionLevel;
          }

          return await userDetails.save();
        } else {
          throw new Error("User is not found");
        }
      } else {
        throw new Error("User already removed");
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
export const deleteUser = async (userId: string, deletedBy: Schema.Types.ObjectId) => {
  return await UserModel.findById(userId)
    .then(async (userDetails) => {
      if (userDetails && userDetails.deletedAt === null) {
        userDetails.deletedAt = new Date();
        userDetails.deletedBy = deletedBy;
        return await userDetails.save();
      } else {
        const errorInfo = {
          time: new Date(),
          message: "User already removed",
        };
        throw new Error(JSON.stringify(errorInfo));
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const recoverUser = async (userId: string) => {
  return await UserModel.findById(userId)
    .then(async (user) => {
      if (user) {
        user.deletedAt = null;
        user.deletedBy = null;

        return await user.save();
      }
    })
    .catch((error) => {
      const errorInfo = {
        time: new Date(),
        message: error.message,
      };
      throw new Error(JSON.stringify(errorInfo));
    });
};

export const fetchDeletedUsers = async () => {
  return await UserModel.find({ deletedAt: { $ne: null } })
    .then((users) => {
      return users;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const deleteUserPermenently = async (userId: string) => {
  return await UserModel.findByIdAndDelete(userId)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
