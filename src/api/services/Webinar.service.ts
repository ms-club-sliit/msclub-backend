import { DocumentDefinition, FilterQuery, Schema } from "mongoose";
import { IWebinar, IUpdatedBy } from "../interfaces";
import WebinarModel from "../models/Webinar.model";
/**
 * Save a webinar in the database
 * @param {IWebinar} webinarData
 * @returns {IWebinar} New webinar document
 */
export const insertWebinar = async (webinarData: DocumentDefinition<IWebinar>) => {
  return await WebinarModel.create(webinarData)
    .then(async (webinar) => {
      let initialUpdatedBy: IUpdatedBy = {
        user: webinar.createdBy,
        updatedAt: new Date(),
      };
      webinar.updatedBy.push(initialUpdatedBy);
      await webinar.save();
      return webinar;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * Fetch a webinar in the database
 * @param webinarId @type string
 * @returns {IWebinar} Webinar document for relevant ID
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
  return await WebinarModel.aggregate([{ $match: { deletedAt: { $eq: null } } }])
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
  webinarData: DocumentDefinition<IWebinar>,
  updatedBy: Schema.Types.ObjectId
) => {
  return await WebinarModel.findById(webinarId)
    .then(async (webinarDetails) => {
      if (webinarDetails) {
        if (webinarDetails.deletedAt) {
          if (webinarData.title) {
            webinarDetails.title = webinarData.title;
          }

          if (webinarData.description) {
            webinarDetails.description = webinarData.description;
          }

          if (webinarData.imageUrl) {
            webinarDetails.imageUrl = webinarData.imageUrl;
          }

          if (webinarData.dateTime) {
            webinarDetails.dateTime = webinarData.dateTime;
          }

          if (webinarData.time) {
            webinarDetails.time = webinarData.time;
          }

          if (webinarData.tags) {
            webinarDetails.tags = webinarData.tags;
          }

          if (webinarData.link) {
            webinarDetails.link = webinarData.link;
          }

          if (webinarData.registrationLink) {
            webinarDetails.registrationLink = webinarData.registrationLink;
          }

          const updateUserInfo: IUpdatedBy = {
            user: updatedBy,
            updatedAt: new Date(),
          };
          webinarDetails.updatedBy.push(updateUserInfo);
          return await webinarDetails.save();
        } else {
          throw new Error("Webinar is not found");
        }
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
export const removeWebinar = async (webinarId: string, deletedBy: Schema.Types.ObjectId) => {
  return await WebinarModel.findById(webinarId)
    .then(async (webinarDetails) => {
      if (webinarDetails && webinarDetails.deletedAt === null) {
        webinarDetails.deletedAt = new Date();
        webinarDetails.deletedBy = deletedBy;
        return await webinarDetails.save();
      } else {
        return "Webinar not found";
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const getAllWebinarsForAdmin = async () => {
  return await WebinarModel.find({ deletedAt: null })
    .populate({
      path: "createdBy",
      select: "firstName lastName email permissionLevel profileImage",
    })
    .populate({
      path: "updatedBy",
      populate: {
        path: "user",
        select: "firstName lastName email permissionLevel profileImage",
      },
      select: "updatedAt",
    })
    .then((webinars) => {
      return webinars;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const getDeletedWebinarsForAdmin = async () => {
  return await WebinarModel.find({ deletedAt: { $ne: null } })
    .populate({
      path: "createdBy",
      select: "firstName lastName email permissionLevel profileImage",
    })
    .populate({
      path: "updatedBy",
      populate: {
        path: "user",
        select: "firstName lastName email permissionLevel profileImage",
      },
      select: "updatedAt",
    })
    .then((webinars) => {
      return webinars;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
