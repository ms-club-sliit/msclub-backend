import { Express, Request, Response, NextFunction } from "express";
import EventService from "../services";
import logger from "../../util/logger";
import { IEvent } from "../interfaces";

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IEvent} Event document
 */
export const insertEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.body.createdBy =
    request.user && request.user._id ? request.user._id : null;
  await EventService.insertEvent(request.body)
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
 * @returns {IEvent} Event document
 */
export const getEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const eventId = request.params.eventId;
  if (eventId) {
    await EventService.getEvent(request.params.eventId)
      .then((data) => {
        request.handleResponse.successRespond(response)(data);
        next();
      })
      .catch((error: any) => {
        request.handleResponse.errorRespond(response)(error.message);
        next();
      });
  } else {
    request.handleResponse.errorRespond(response)("Event ID not found");
  }
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IEvnet[]} All events in the system
 */
export const getEvents = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await EventService.getEvents()
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
 * @returns {IEvnet[]} All past events in the system
 */
export const getPastEvents = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await EventService.getPastEvents()
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
 * @returns {IEvnet} Upcoming event details
 */
export const getUpcomingEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await EventService.getUpcomingEvent()
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
 * @returns {IEvent} - Updated event details
 */
export const updateEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const eventId = request.params.eventId;
  const updatedBy = request.user && request.user._id ? request.user._id : null;
  if (eventId) {
    await EventService.updateEvent(eventId, request.body, updatedBy)
      .then((data) => {
        request.handleResponse.successRespond(response)(data);
        next();
      })
      .catch((error: any) => {
        request.handleResponse.errorRespond(response)(error.message);
        next();
      });
  } else {
    request.handleResponse.errorRespond(response)("Event ID not found");
  }
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IEvent} - Deleted event details
 */
export const deleteEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const eventId = request.params.eventId;
  const deletedBy = request.user && request.user._id ? request.user._id : null;
  if (eventId) {
    await EventService.deleteEvent(eventId, deletedBy)
      .then((data) => {
        request.handleResponse.successRespond(response)(data);
        next();
      })
      .catch((error: any) => {
        request.handleResponse.errorRespond(response)(error.message);
        next();
      });
  } else {
    request.handleResponse.errorRespond(response)("Event ID not found");
  }
};

export const eventsForAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await EventService.getAllEventsForAdmin()
    .then((data: any) => {
      request.handleResponse.successRespond(response)(data);
      next();
    })
    .catch((error: any) => {
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
};
