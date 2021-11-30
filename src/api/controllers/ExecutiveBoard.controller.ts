import { Express, Request, Response, NextFunction } from "express";
import ExecutiveBoardService from "../services";
import logger from "../../util/logger";
/**
 * @todo implement a @function insertExecutiveBoard that calls
 * @function insertExecutiveBoard in the ExecutiveBoard.service
 *
 * @param request
 * @param response
 * @param next
 * @returns void
 */
export const insertExecutiveBoard = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await ExecutiveBoardService.insertExecutiveBoard(request.body)
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
 * @todo implement a @function getExecutiveBoardbyID that calls
 * @function getExecutiveBoardbyID in the ExecutiveBoard.service
 *
 * @param request
 * @param response
 * @param next
 * @returns DocumentDefinition<IExecutiveBoard>
 */
export const getExecutiveBoardbyID = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await ExecutiveBoardService.getExecutiveBoardbyID(
    request.params.executiveBoardId
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
 * @todo implement a @function getExecutiveBoard that calls
 * @function getExecutiveBoard in the ExecutiveBoard.service
 *
 * @param request
 * @param response
 * @param next
 * @returns [DocumentDefinition<IExecutiveBoard>]
 */
export const getExecutiveBoard = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await ExecutiveBoardService.getExecutiveBoard()
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
 * @todo implement a @function addBoardMember that calls
 * @function addBoardMember in the ExecutiveBoard.service
 *
 * @param request
 * @param response
 * @param next
 * @returns new Board member
 */
export const addBoardMember = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await ExecutiveBoardService.addBoardMember(
    request.params.executiveBoardId,
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
 * @todo implement a @function updateExecutiveBoardDetails that calls
 * @function updateExecutiveBoardDetails in the ExecutiveBoard.service
 *
 * @param request
 * @param response
 * @param next
 * @returns updated ExecutiveBoard member
 */
export const updateExecutiveBoardDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await ExecutiveBoardService.updateExecutiveBoardDetails(
    request.params.executiveBoardId,
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
 * @todo implement a @function deleteExecutiveBoardDetails that calls
 * @function deleteExecutiveBoardDetails in the ExecutiveBoard.service
 *
 * @param request
 * @param response
 * @param next
 * @returns deleted ExecutiveBoard member
 */
export const deleteExecutiveBoardDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await ExecutiveBoardService.deleteExecutiveBoardDetails(
    request.params.executiveBoardId
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
