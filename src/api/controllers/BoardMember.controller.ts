import { Express, Request, Response, NextFunction } from "express";
import BoardMemberService from "../services";
import logger from "../../util/logger";
import ImageService from "../../util/image.handler";

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns boardMember
 */
export const getBoardMemberbyID = async (request: Request, response: Response, next: NextFunction) => {
  const boardMemberId = request.params.boardMemberId;
  if (boardMemberId) {
    await BoardMemberService.getBoardMemberbyID(request.params.boardMemberId)
      .then((data) => {
        request.handleResponse.successRespond(response)(data);
        next();
      })
      .catch((error: any) => {
        request.handleResponse.errorRespond(response)(error.message);
        next();
      });
  } else {
    request.handleResponse.errorRespond(response)("Board Member ID not found");
  }
};
/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns boardMember[]
 */
export const getAllBoardMembers = async (request: Request, response: Response, next: NextFunction) => {
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
  if (request.file) {
    const bucketDirectoryName = "boardmember-flyers";

    const boardMemberFlyerPath = await ImageService.uploadImage(
      request.file,
      bucketDirectoryName
    );
    request.body.imageUrl = boardMemberFlyerPath;
  }
  const boardMemberId = request.params.boardMemberId;
  const updatedBy = request.user && request.user._id ? request.user._id : null;

  if (boardMemberId) {
    await BoardMemberService.updateBoardMemberDetails(
      request.params.boardMemberId,
      request.body,
      updatedBy
    )
      .then((data) => {
        request.handleResponse.successRespond(response)(data);
        next();
      })
      .catch((error: any) => {
        request.handleResponse.errorRespond(response)(error.message);
        next();
      });
  } else {
    request.handleResponse.errorRespond(response)("Board Member ID not found");
  }
};
/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns updated boardMember
 */
export const deleteBoardMemberDetails = async (request: Request, response: Response, next: NextFunction) => {
  const boardMemberId = request.params.boardMemberId;
  const deletedBy = request.user && request.user._id ? request.user._id : null;

  if (boardMemberId) {
    await BoardMemberService.deleteBoardMemberDetails(
      request.params.boardMemberId,
      deletedBy
    )
      .then((data) => {
        request.handleResponse.successRespond(response)(data);
        next();
      })
      .catch((error: any) => {
        request.handleResponse.errorRespond(response)(error.message);
        next();
      });
  } else {
    request.handleResponse.errorRespond(response)("Board Member ID not found");
  }
};
