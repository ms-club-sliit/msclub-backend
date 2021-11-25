import { Express, Request, Response, NextFunction } from "express";
import Service from "../services";
import logger from "../../util/logger";

/**
 * @todo implement a @function insertEvent that calls
 * @function insertEvent in the EventService
 *
 * @param request
 * @param response
 * @param next
 * @returns inserted Event
 */
export const insertEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await Service.insertEvent(request.body)
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
 * @todo implement a @function getEvent that calls
 * @function getEvent in the EventService
 *
 * @param request
 * @param response
 * @param next
 * @returns Event
 */
export const getEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await Service.getEvent(request.params.eventId)
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
 * @todo implement a @function getEvents that calls
 * @function getEvents in the EventService
 *
 * @param request
 * @param response
 * @param next
 * @returns Event[]
 */
export const getEvents = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await Service.getEvents()
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
 * @todo implement a @function getPastEvents that calls
 * @function getPastEvents in the EventService
 *
 * @param request
 * @param response
 * @param next
 * @returns Event[]
 */
export const getPastEvents = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await Service.getPastEvents()
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
 * @todo implement a @function getUpcomingEvent that calls
 * @function getUpcomingEvent in the EventService
 *
 * @param request
 * @param response
 * @param next
 * @returns Event
 */
export const getUpcomingEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await Service.getUpcomingEvent()
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
 * @todo implement a @function updateEvent that calls
 * @function updateEvent in the EventService
 *
 * @param request
 * @param response
 * @param next
 * @returns updated event
 */
export const updateEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await Service.updateEvent(request.params.eventId, request.body)
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
 * @todo implement a @function deleteEvent that calls
 * @function deleteEvent in the EventService
 *
 * @param request
 * @param response
 * @param next
 * @returns updated event
 */
 export const deleteEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await Service.deleteEvent(request.params.eventId)
    .then((data) => {
      request.handleResponse.successRespond(response)(data);
      next();
    })
    .catch((error: any) => {
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
};
