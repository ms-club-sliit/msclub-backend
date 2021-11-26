import { DocumentDefinition, FilterQuery } from "mongoose";
import { IWebinar } from "../interfaces";
import WebinarModel from "../models/Webinar.model";
/**
 * @todo create @function insertWebinar to save a webinar in the database
 */
export const insertWebinar = async (
  webinarData: DocumentDefinition<IWebinar>
) => {
  return await WebinarModel.create(webinarData)
    .then(async (webinar) => {
      return webinar;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * @todo create @function fetchWebinarById to fetch a webinar in the system
 * @param webinarId @type string
 */
export const fetchWebinarById = async (webinarId: string) => {
  return await WebinarModel.findById(webinarId)
    .then(async (webinar) => {
      return webinar;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * @todo create @function fetchWebinars to fetch all the webinars in the system
 */
export const fetchWebinars = async () => {
  return await WebinarModel.find()
    .then(async (webinars) => {
      return webinars;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * @todo create @function fetchPastWebinars to fetch all the past webinars in the system
 */
export const fetchPastWebinars = async () => {
  return await WebinarModel.find({ webinarType: "PAST" })
    .then(async (webinars) => {
      return webinars;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * @todo create @function fetchUpcomingWebinar to fetch an upcoming webinars in the system
 */
export const fetchUpcomingWebinar = async () => {
  return await WebinarModel.findOne({ webinarType: "UPCOMING" })
    .limit(1)
    .sort({ $natural: -1 })
    .then(async (webinar) => {
      return webinar;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * @todo create @function updateWebinar to update a webinar in the system
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
 * @todo create @function removeWebinar to delete a webinar
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
