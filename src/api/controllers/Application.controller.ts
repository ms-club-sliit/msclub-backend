import { Request, Response, NextFunction } from "express";
import ApplicationService from "../services";
import EmailService from "../../util/email.handler";
import logger from "../../util/logger";
import { IApplication } from "../interfaces";

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IApplication} - New application document
 */
export const addApplication = async (request: Request, response: Response, next: NextFunction) => {
  await ApplicationService.addApplication(request.body)
    .then((data) => {
      // Send email
      const emailTemplate = "Application-Email-Template.html";
      const to = data.email;
      const subject = "MS Club SLIIT - Application Received";
      const emailBodyData = {
        studentId: data.studentId,
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        currentAcademicYear: data.currentAcademicYear,
        linkedIn : data.linkedIn,
        gitHub: data.gitHub,
        skillsAndTalents: data.skillsAndTalents
      };

      EmailService.sendEmailWithTemplate(emailTemplate, to, subject, emailBodyData)
        .then((emailData) => {
          request.handleResponse.successRespond(response)({
            applicationData: data,
            emailData: emailData,
          });
        })
        .catch((error) => {
          request.handleResponse.errorRespond(response)({
            message: error.message,
            data: data,
          });
        });
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
export const getApplicationById = async (request: Request, response: Response, next: NextFunction) => {
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
export const getApplications = async (request: Request, response: Response, next: NextFunction) => {
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
export const setApplicationArchive = async (request: Request, response: Response, next: NextFunction) => {
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

/**
 * @function changeApplicationStatusIntoInterview that calls
 * @function changeApplicationStatusIntoInterview in the ApplicationService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IApplication} updated application document in the system
 */
export const changeApplicationStatusIntoInterview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const applicationId = request.params.applicationId;
  if (applicationId) {
    await ApplicationService.changeApplicationStatusIntoInterview(request.params.applicationId, request.body)
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
 * @function changeApplicationStatusIntoSelected that calls
 * @function changeApplicationStatusIntoSelected in the ApplicationService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IApplication} updated application document in the system
 */
export const changeApplicationStatusIntoSelected = async (request: Request, response: Response, next: NextFunction) => {
  const applicationId = request.params.applicationId;
  if (applicationId) {
    await ApplicationService.changeApplicationStatusIntoSelected(request.params.applicationId, request.body)
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
 * @todo implement a @function changeApplicationStatusIntoRejected that calls
 * @function changeApplicationStatusIntoRejected in the ApplicationService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IApplication} updated application document in the system
 */
export const changeApplicationStatusIntoRejected = async (request: Request, response: Response, next: NextFunction) => {
  const applicationId = request.params.applicationId;
  if (applicationId) {
    await ApplicationService.changeApplicationStatusIntoRejected(request.params.applicationId)
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
