import { DocumentDefinition, FilterQuery } from "mongoose";
import { IWebinar } from "../interfaces";
import WebinarModel from "../models/Webinar.model";
/**
 * Save a webinar in the database
 * @param {IWebinar} webinarData
 * @returns {IWebinar} New webinar document
 */
export const insertWebinar = async (
  webinarData: DocumentDefinition<IWebinar>
) => {
  return await WebinarModel.create(webinarData)
    .then((webinar) => {
      return webinar;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * Fetch a webinar in the database
 * @param webinarId @type string
 * @returns {IWebinar} Webinar document for relevent ID
 */
export const fetchWebinarById = async (webinarId: string) => {
  return await WebinarModel.findById(webinarId)
    .then((webinar) => {
      return webinar;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * Fetch all the webinars in the database
 * @returns {IWebinar} All webinar documents in the database
 */
export const fetchWebinars = async () => {
  return await WebinarModel.find()
    .then((webinars) => {
      return webinars;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * Fetch all the past webinars in the database
 * @returns {IWebinar} All the past webinar documents in the database
 */
export const fetchPastWebinars = async () => {
  return await WebinarModel.find({ webinarType: "PAST" })
    .then((webinars) => {
      return webinars;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * Fetch an upcoming webinars in the database
 * @returns {IWebinar} All the upcoming webinar documents in the database
 */
export const fetchUpcomingWebinar = async () => {
  return await WebinarModel.findOne({ webinarType: "UPCOMING" })
    .limit(1)
    .sort({ $natural: -1 })
    .then((webinar) => {
      return webinar;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * Update a webinar in the database
 * @param webinarId @type string
 * @param updateData @type DocumentDefinition<IWebinar>
 */
export const updateWebinar = async (
  webinarId: string,
  webinarData: DocumentDefinition<IWebinar>
) => {
  return await WebinarModel.findById(webinarId)
    .then(async (webinarDetails) => {
      if (webinarDetails) {
        webinarDetails.title = webinarData.title;
        webinarDetails.description = webinarData.description;
        webinarDetails.imageUrl = webinarData.imageUrl;
        webinarDetails.dateTime = webinarData.dateTime;
        webinarDetails.time = webinarData.time;
        webinarDetails.tags = webinarData.tags;
        webinarDetails.link = webinarData.link;
        return await webinarDetails.save();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * Delete a webinar in the database
 * @param webinarId @type string
 */
export const removeWebinar = async (webinarId: string) => {
  return await WebinarModel.findById(webinarId)
    .then(async (webinarDetails) => {
      if (webinarDetails) {
        webinarDetails.deletedAt = new Date();
        return await webinarDetails.save();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
