import { Express, Request, Response, NextFunction } from 'express';
import UserService from '../services';
import logger from '../../util/logger';

/**
 * @todo implement a @function createUser that calls 
 * @function insertUser in the UserService 
 * 
 * @param request
 * @param response
 * @param next
 * @returns new user
 */
export const createUser = async (request: Request, response: Response, next: NextFunction) => {
  await UserService.insertUser(request.body)
    .then((data) => {
      request.handleResponse.successRespond(response)(data);
      next();
    })
    .catch((error: any) => {
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
}

/**
 * @todo implement a @function getAllUsers that calls 
 * @function getUsers in the UserService 
 * 
 * @param request
 * @param response
 * @param next
 * @returns User[]
 */


/**
 * @todo implement a @function updateUser that calls 
 * @function updateUser in the UserService 
 * 
 * @param request
 * @param response
 * @param next
 * @returns updated user
 */


/**
 * @todo implement a @function removeUser that calls 
 * @function deleteUser in the UserService 
 * 
 * @param request
 * @param response
 * @param next
 * @returns updated user
 */