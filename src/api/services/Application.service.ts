import { DocumentDefinition, FilterQuery } from "mongoose";
import EmailService from "../../util/email.handler";
import { IApplication, IInterview } from "../interfaces";
import ApplicationModel from "../models/Application.model";

/**
 * Application Service
 * @param {IApplication} application
 * @returns {Promise<IApplication>}
 */
export const addApplication = async (
  applicationData: DocumentDefinition<IApplication>
) => {
  return await ApplicationModel.create(applicationData)
    .then((application) => {
      return application;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
  Application Service
 * @param applicationId @type string
 * @returns {Promise<IApplication>}
 */
export const fetchApplicationById = async (applicationId: string) => {
  return await ApplicationModel.findById(applicationId)
    .then((application) => {
      return application;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * Application Service
 * @param {FilterQuery<IApplication>} query
 * @returns {Promise<IApplication>}
 */
export const fetchApplications = async () => {
  return await ApplicationModel.aggregate([
    { $match: { deletedAt: { $eq: null } } },
  ])
    .then((applications) => {
      return applications;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 delete an Application
 * @param applicationId @type string
 */
export const archiveApplication = async (applicationId: string) => {
  return await ApplicationModel.findById(applicationId)
    .then(async (application) => {
      if (application?.deletedAt) {
        application.deletedAt = new Date();
        return await application.save();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * @function changeApplicationStatusIntoInterview to update the status into INTERVIEW of an application in the system
 * @param applicationId @type string
 */
export const changeApplicationStatusIntoInterview = async (
  applicationId: string,
  interviewData: DocumentDefinition<IInterview>
) => {
  return await ApplicationModel.findById(applicationId)
    .then(async (application) => {
      if (application) {
        // Send email
        const emailTemplate = "Interview-Email-Template.html";
        const to = application.email;
        const subject = "Interview for the MS Club of SLIIT";
        const emailBodyData = {
          name: application.name,
          email: application.email,
          date: interviewData.date,
          time: interviewData.time,
          duration: interviewData.duration,
          format: interviewData.format,
        };

        return await EmailService.sendEmailWithTemplate(
          emailTemplate,
          to,
          subject,
          emailBodyData
        )
          .then(async () => {
            application.status = "INTERVIEW";
            return await application.save();
          })
          .catch(() => {
            return application;
          });
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * @function changeApplicationStatusIntoSelected to update the status into SELECTED of an application in the system
 * @param applicationId @type string
 */
export const changeApplicationStatusIntoSelected = async (
  applicationId: string,
  interviewData: DocumentDefinition<IInterview>
) => {
  return await ApplicationModel.findById(applicationId)
    .then(async (application) => {
      if (application) {
        // Send email
        const emailTemplate = "Selected-Email-Template.html";
        const to = application.email;
        const subject = "Congratulations from MS Club Team !";
        const emailBodyData = {
          name: application.name,
        };

        return await EmailService.sendEmailWithTemplate(
          emailTemplate,
          to,
          subject,
          emailBodyData
        )
          .then(async () => {
            application.status = "SELECTED";
            return await application.save();
          })
          .catch(() => {
            return application;
          });
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * @todo create @function changeApplicationStatusIntoRejected to update the status into REJECTED of an application in the system
 * @param applicationId @type string
 */
export const changeApplicationStatusIntoRejected = async (
  applicationId: string
) => {
  return await ApplicationModel.findById(applicationId)
    .then(async (application) => {
      if (application) {
        application.status = "REJECTED";
        return await application.save();
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
