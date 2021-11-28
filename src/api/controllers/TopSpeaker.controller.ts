
import { Express, Request, Response, NextFunction } from "express";
import TopSpeakerService from "../services";
import logger from "../../util/logger";

/**
 * @todo implement a @function insertTopSpeaker that calls 
 * @function insertTopSpeaker in the TopSpeakerService 
 * 
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns inserted topSpeaker
 */

 export const insertTopSpeaker = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    await TopSpeakerService.insertTopSpeaker(request.body)
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
 * @todo implement a @function getTopSpeaker that calls 
 * @function getTopSpeaker in the TopSpeakerService 
 * 
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns topSpeaker
 */

 export const getTopSpeaker = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    await TopSpeakerService.getTopSpeaker(request.params.topSpeakerId)
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
 * @todo implement a @function getTopSpeakers that calls 
 * @function getTopSpeakers in the TopSpeakerService 
 * 
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns topSpeaker[]
 */

 export const getTopSpeakers = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    await TopSpeakerService.getTopSpeakers()
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
 * @todo implement a @function updateTopSpeaker that calls 
 * @function updateTopSpeaker in the TopSpeakerService 
 * 
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns updated topSpeaker
 */

 export const updateTopSpeaker = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    await TopSpeakerService.updateTopSpeaker(request.params.topSpeakerId, request.body)
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
 * @todo implement a @function deleteTopSpeaker that calls 
 * @function deleteTopSpeaker in the TopSpeakerService 
 * 
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns updated topSpeaker
 */

 export const deleteTopSpeaker = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    await TopSpeakerService.deleteTopSpeaker(request.params.topSpeakerId)
      .then((data) => {
        request.handleResponse.successRespond(response)(data);
        next();
      })
      .catch((error: any) => {
        request.handleResponse.errorRespond(response)(error.message);
        next();
      });
  };