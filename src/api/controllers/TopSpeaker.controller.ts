
import { Express, Request, Response, NextFunction } from "express";
import TopSpeakerService from "../services";
import logger from "../../util/logger";
import { ITopSpeaker } from "../interfaces";

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker } topSpeaker document
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
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker } topSpeaker document
 */

 export const getTopSpeaker = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const topSpeakerId = request.params.topSpeakerId;

    if (topSpeakerId) {
      await TopSpeakerService.getTopSpeaker(request.params.topSpeakerId)
      .then((data) => {
        request.handleResponse.successRespond(response)(data);
        next();
      })
    }else{
        request.handleResponse.errorRespond(response)('Top Speaker ID not found');
      };
    };
  

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker[] } All top speakers in the system
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
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker } - Updated top speaker details
 */

 export const updateTopSpeaker = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {

    const topSpeakerId = request.params.topSpeakerId;

    if (topSpeakerId) { 
      await TopSpeakerService.updateTopSpeaker(request.params.topSpeakerId, request.body)
      .then((data) => {
        request.handleResponse.successRespond(response)(data);
        next();
      })
    } else { 
      request.handleResponse.errorRespond(response)('Top Speaker ID not found');
    };
  };

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker } - Deleted top speaker details
 */

 export const deleteTopSpeaker = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {

    const topSpeakerId = request.params.topSpeakerId;

    if (topSpeakerId) {
      await TopSpeakerService.deleteTopSpeaker(request.params.topSpeakerId)
      .then((data) => {
        request.handleResponse.successRespond(response)(data);
        next();
      })
   } else {
      request.handleResponse.errorRespond(response)('Top Speaker ID not found');
   };
    
  };