import { Express, Request, Response, NextFunction } from "express";
import ExecutiveBoardService from "../services";
import logger from "../../util/logger";
/**
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
