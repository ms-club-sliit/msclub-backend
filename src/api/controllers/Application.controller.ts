import { Request, Response, NextFunction } from 'express';
import ApplicationService from "../services";
import logger from "../../util/logger";

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IApplication} - New application document
 */
export const addApplication = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await ApplicationService.addApplication(request.body)
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
 * @returns {IApplication} - Application document that relevent to the passed ID
 */
export const getApplicationById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const applicationId = request.params.applicationId;
    if (applicationId) {
        await ApplicationService.fetchApplicationById(request.params.applicationId)
            .then((data) => {
                request.handleResponse.successRespond(response)(data);
                next();
            })
            .catch((error: any) => {
                request.handleResponse.errorRespond(response)(error.message);
                next();
            });
    } else {
        request.handleResponse.errorRespond(response)("applicationId not found");
    }
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IApplication} - All application documents
 */
export const getApplications = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    await ApplicationService.fetchApplications()
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
 * @returns {IApplication} - Updated application document
 */
export const setApplicationArchive = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const applicationId = request.params.applicationId;
    if (applicationId) {
        await ApplicationService.archiveApplication(request.params.applicationId)
            .then((data) => {
                request.handleResponse.successRespond(response)(data);
                next();
            })
            .catch((error: any) => {
                request.handleResponse.errorRespond(response)(error.message);
                next();
            });
    } else {
        request.handleResponse.errorRespond(response)("applicationId not found");
    }
};