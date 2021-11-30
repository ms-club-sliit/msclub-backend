import { Express, Request, Response, NextFunction } from "express";
import BoardMemberService from "../services";
import logger from "../../util/logger";
/**
 * @todo implement a @function getBoardMember that calls
 * @function getBoardMember in the BoardMemberService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns boardMember
 */
export const getBoardMemberbyID = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await BoardMemberService.getBoardMemberbyID(request.params.boardMemberId)
    .then((data) => {
      request.handleResponse.successRespond(response)(data);
      next();
    })
    .catch((error: any) => {
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
};
/**
 * @todo implement a @function getAllBoardMembers that calls
 * @function getAllBoardMembers in the BoardMemberService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns boardMember[]
 */
export const getAllBoardMembers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await BoardMemberService.getAllBoardMembers()
    .then((data) => {
      request.handleResponse.successRespond(response)(data);
      next();
    })
    .catch((error: any) => {
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
};
/**
 * @todo implement a @function updateBoardMemberDetails that calls
 * @function updateBoardMemberDetails in the BoardMemberService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns updated boardMember
 */
export const updateBoardMemberDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await BoardMemberService.updateBoardMemberDetails(
    request.params.boardMemberId,
    request.body
  )
    .then((data) => {
      request.handleResponse.successRespond(response)(data);
      next();
    })
    .catch((error: any) => {
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
};
/**
 * @todo implement a @function deleteBoardMemberDetails that calls
 * @function deleteBoardMemberDetails in the BoardMemberService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns updated boardMember
 */
export const deleteBoardMemberDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await BoardMemberService.deleteBoardMemberDetails(
    request.params.boardMemberId
  )
    .then((data) => {
      request.handleResponse.successRespond(response)(data);
      next();
    })
    .catch((error: any) => {
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
};
