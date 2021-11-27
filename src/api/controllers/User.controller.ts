import { Express, Request, Response, NextFunction } from 'express';
import UserService from '../services';
import logger from '../../util/logger';

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} User document
 */
export const createUser = async (request: Request, response: Response, next: NextFunction) => {
  await UserService.insertUser(request.body)
    .then((data) => {
      logger.info(`New user with ID ${data._id} created`);
      request.handleResponse.successRespond(response)(data);
      next();
    })
    .catch((error: any) => {
      logger.error(error.message);
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
}

/**
 * @todo implement a @function getAllUsers that calls 
 * @function getUsers in the UserService 
 * 
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser[]} All user documents in the system
 */


/**
 * @todo implement a @function updateUser that calls 
 * @function updateUser in the UserService 
 * 
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Updated user document
 */


/**
 * @todo implement a @function removeUser that calls 
 * @function deleteUser in the UserService 
 * 
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Deleted user document
 */