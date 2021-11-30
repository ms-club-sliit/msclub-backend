import { DocumentDefinition } from "mongoose";
import { ITopSpeaker } from "../interfaces";
import TopSpeakerModel from "../models/TopSpeaker.model";
/**
 * @todo create @function insertTopSpeaker to save a speaker in the database
 */
export const insertTopSpeaker = async (topSpeakerData: DocumentDefinition<ITopSpeaker>) => {
  return await TopSpeakerModel.create(topSpeakerData)
    .then((topSpeaker) => {
      return topSpeaker;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * @todo create @function getTopSpeaker to fetch a TopSpeaker in the system
 * @param topSpeakerId @type string
 */
export const getTopSpeaker = async (topSpeakerId: string) => {
  return await TopSpeakerModel.findById(topSpeakerId)
    .then((topSpeaker) => {
      if (topSpeaker) {
        if (topSpeaker.deletedAt != null) {
          throw new Error("Speaker is not found");
        } else {
          return topSpeaker;
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
 * @todo create @function getTopSpeakers to fetch all the TopSpeakers in the system
 */
export const getTopSpeakers = async () => {
  return await TopSpeakerModel.aggregate([{ $match: { deletedAt: { $eq: null } } }])
    .then((topSpeakers) => {
      return topSpeakers;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * @todo create @function updateTopSpeaker to update a TopSpeaker in the system
 * @param topSpeakerId @type string
 * @param updateData @type DocumentDefinition<ITopSpeaker>
 */
export const updateTopSpeaker = async (
  topSpeakerId: string,
  updateData: DocumentDefinition<ITopSpeaker>
) => {
  return await TopSpeakerModel.findById(topSpeakerId)
    .then(async (topSpeakerDetails) => {
      if (topSpeakerDetails) {

        if (updateData.title) {
          topSpeakerDetails.title = updateData.title;
        }

        if (updateData.description) {
          topSpeakerDetails.description = updateData.description;
        }

        if (updateData.imageUrl) {
          topSpeakerDetails.imageUrl = updateData.imageUrl;
        }

        if (updateData.socialMediaURLs) {
          topSpeakerDetails.socialMediaURLs = updateData.socialMediaURLs;

          if (updateData.socialMediaURLs.facebook) {
            topSpeakerDetails.socialMediaURLs.facebook = updateData.socialMediaURLs.facebook;
          }

          if (updateData.socialMediaURLs.instagram) {
            topSpeakerDetails.socialMediaURLs.instagram = updateData.socialMediaURLs.instagram;
          }

          if (updateData.socialMediaURLs.linkedIn) {
            topSpeakerDetails.socialMediaURLs.linkedIn = updateData.socialMediaURLs.linkedIn;
          }

          if (updateData.socialMediaURLs.twitter) {
            topSpeakerDetails.socialMediaURLs.twitter = updateData.socialMediaURLs.twitter;
          }

          if (updateData.socialMediaURLs.web) {
            topSpeakerDetails.socialMediaURLs.web = updateData.socialMediaURLs.web;
          }
        }

        return await topSpeakerDetails.save();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 * @todo create @function deleteTopSpeaker to delete a past event
 * @param topSpeakerId @type string
 */
export const deleteTopSpeaker = async (topSpeakerId: string) => {
  return await TopSpeakerModel.findById(topSpeakerId)
    .then(async (topSpeakerDetails) => {
      if (topSpeakerDetails) {
        topSpeakerDetails.deletedAt = new Date();
        return await topSpeakerDetails.save();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
