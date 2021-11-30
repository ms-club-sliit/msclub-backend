import { DocumentDefinition } from "mongoose";
import { ITopSpeaker } from "../interfaces";
import TopSpeakerModel from "../models/TopSpeaker.model";
/**
 save a speaker in the database
 */
export const insertTopSpeaker = async (
  topSpeakerData: DocumentDefinition<ITopSpeaker>
) => {
  return await TopSpeakerModel.create(topSpeakerData)
    .then(async (topSpeaker) => {
      return topSpeaker;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 fetch a TopSpeaker in the system
 * @param topSpeakerId @type string
 */
export const getTopSpeaker = async (topSpeakerId: string) => {
  return await TopSpeakerModel.findById(topSpeakerId)
    .then(async (topSpeaker) => {
      return topSpeaker;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 fetch all the TopSpeakers in the system
 */
export const getTopSpeakers = async () => {
  return await TopSpeakerModel.find()
    .then(async (topSpeaker) => {
      return topSpeaker;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

/**
 update a TopSpeaker in the system
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
        topSpeakerDetails.title = updateData.title;
        topSpeakerDetails.description = updateData.description;
        topSpeakerDetails.imageUrl = updateData.imageUrl;
        topSpeakerDetails.socialMediaURLs.facebook =
          updateData.socialMediaURLs.facebook;
        topSpeakerDetails.socialMediaURLs.instagram =
          updateData.socialMediaURLs.instagram;
        topSpeakerDetails.socialMediaURLs.linkedIn =
          updateData.socialMediaURLs.linkedIn;
        topSpeakerDetails.socialMediaURLs.twitter =
          updateData.socialMediaURLs.twitter;
        topSpeakerDetails.socialMediaURLs.web = updateData.socialMediaURLs.web;
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
delete a past event
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
