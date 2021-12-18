import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../../util/logger";
import UserModel from "../models/User.model";

/**
 * User authentication middleware function
 * @param request
 * @param response
 * @param next
 * @returns user and authToken
 *
 * For every private API endpoint, this function will execute first to identify
 * the user in the system. If the authentication success, then only necessary
 * method will execute.
 */
export const authenticate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const secret = process.env.JWT_SECRET as string;

    if (secret) {
      const authToken = request.header("Authorization") as string;
      const decode = jwt.verify(authToken, secret);
      const user = await UserModel.findOne({
        _id: decode as string,
        authToken: authToken,
      });

      if (!user) {
        throw new Error("User not found in the system");
      }

      request.authToken = authToken;
      request.user = user;

      logger.info("Token Verified");
      next();
    } else {
      throw new Error("Token Secret is not found");
    }
  } catch (error: any) {
    logger.warn(error.message);
    return request.handleResponse.unauthorizedRespond(response)(error.message);
  }
};
