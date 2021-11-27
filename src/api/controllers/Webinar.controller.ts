import { Express, Request, Response, NextFunction } from "express";
import WebinarService from "../services";
import logger from "../../util/logger";
/**
 * @todo implement a @function insertWebinar that calls
 * @function insertWebinar in the WebinarService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} New webinar document
 */
export const insertWebinar = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await WebinarService.insertWebinar(request.body)
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
 * @todo implement a @function getWebinarById that calls
 * @function fetchWebinarById in the WebinarService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} Webinar document for relevent ID
 */
export const getWebinarById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await WebinarService.fetchWebinarById(request.params.webinarId)
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
 * @todo implement a @function getWebinars that calls
 * @function fetchWebinars in the WebinarService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} Get all webinars in the system
 */
export const getWebinars = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await WebinarService.fetchWebinars()
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
 * @todo implement a @function getPastWebinars that calls
 * @function fetchPastWebinars in the WebinarService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar[]} Get past webinars
 */
export const getPastWebinars = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await WebinarService.fetchPastWebinars()
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
 * @todo implement a @function getUpcomingWebinar that calls
 * @function fetchUpcomingWebinar in the WebinarService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} Get upcoming webinar document
 */
export const getUpcomingWebinar = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await WebinarService.fetchUpcomingWebinar()
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
 * @todo implement a @function updateWebinar that calls
 * @function updateWebinar in the WebinarService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} Updated webinar document
 */
export const updateWebinar = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await WebinarService.updateWebinar(request.params.webinarId, request.body)
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
 * @todo implement a @function deleteWebinar that calls
 * @function removeWebinar in the WebinarService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} Deleted webinar document
 */
export const deleteWebinar = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await WebinarService.removeWebinar(request.params.webinarId)
    .then((data) => {
      request.handleResponse.successRespond(response)(data);
      next();
    })
    .catch((error: any) => {
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
};
