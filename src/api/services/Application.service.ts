import { DocumentDefinition, FilterQuery } from "mongoose";
import { IApplication} from "../interfaces";
import ApplicationModel from "../models/Application.model";

/**
 * @todo create @function addApplication to save an Application in the database
 */
export const addApplication = async (applicationData: DocumentDefinition<IApplication>) => {
  return await ApplicationModel.create(applicationData)
    .then(async (application) => {
      return application;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * @todo create @function fetchApplicationById to fetch a Application  in the system
 * @param applicationId @type string
 */
export const fetchApplicationById = async (applicationId: string) => { 
    return await ApplicationModel.findById(applicationId)
    .then(async (application) => {
        return application;
    })
    .catch((error) => {
        throw new Error(error.message);
    });
};

/**
 * @todo create @function fetchApplications to fetch all the Applications in the system.
 */
export const fetchApplications = async (filter: FilterQuery<IApplication>) => {
    return await ApplicationModel.find(filter)
    .then(async (applications) => {
        return applications;
    })
    .catch((error) => {
        throw new Error(error.message);
    });
};


/**
 * @todo create @function archiveApplication to delete an Application
 * @param applicationId @type string
 */
export const archiveApplication = async (applicationId: string) => {
    return await ApplicationModel.findById(applicationId)
    .then(async (application) => {
        if (application) {
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