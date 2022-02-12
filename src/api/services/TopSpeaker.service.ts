import { DocumentDefinition, Schema } from "mongoose";
import { ITopSpeaker, IUpdatedBy } from "../../interfaces";
import TopSpeakerModel from "../models/TopSpeaker.model";
/**
 save a speaker in the database
 */
export const insertTopSpeaker = async (topSpeakerData: DocumentDefinition<ITopSpeaker>) => {
	return await TopSpeakerModel.create(topSpeakerData)
		.then(async (topSpeaker) => {
			const initialUpdatedBy: IUpdatedBy = {
				user: topSpeaker.createdBy,
				updatedAt: new Date(),
			};
			topSpeaker.updatedBy.push(initialUpdatedBy);
			await topSpeaker.save();
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
		.then((topSpeaker) => {
			if (topSpeaker && topSpeaker.deletedAt == null) {
				return topSpeaker;
			} else {
				throw new Error("Speaker is not found");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 fetch all the TopSpeakers in the system
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
 update a TopSpeaker in the system
 * @param topSpeakerId @type string
 * @param updateData @type DocumentDefinition<ITopSpeaker>
 */
export const updateTopSpeaker = async (
	topSpeakerId: string,
	updateData: DocumentDefinition<ITopSpeaker>,
	updatedBy: Schema.Types.ObjectId
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

				if (updateData.socialMediaURLs && updateData.socialMediaURLs.facebook) {
					topSpeakerDetails.socialMediaURLs.facebook = updateData.socialMediaURLs.facebook;
				}

				if (updateData.socialMediaURLs && updateData.socialMediaURLs.instagram) {
					topSpeakerDetails.socialMediaURLs.instagram = updateData.socialMediaURLs.instagram;
				}

				if (updateData.socialMediaURLs && updateData.socialMediaURLs.linkedIn) {
					topSpeakerDetails.socialMediaURLs.linkedIn = updateData.socialMediaURLs.linkedIn;
				}

				if (updateData.socialMediaURLs && updateData.socialMediaURLs.twitter) {
					topSpeakerDetails.socialMediaURLs.twitter = updateData.socialMediaURLs.twitter;
				}

				if (updateData.socialMediaURLs && updateData.socialMediaURLs.web) {
					topSpeakerDetails.socialMediaURLs.web = updateData.socialMediaURLs.web;
				}

				const updateUserInfo: IUpdatedBy = {
					user: updatedBy,
					updatedAt: new Date(),
				};

				topSpeakerDetails.updatedBy.push(updateUserInfo);
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
export const deleteTopSpeaker = async (topSpeakerId: string, deletedBy: Schema.Types.ObjectId) => {
	return await TopSpeakerModel.findById(topSpeakerId)
		.then(async (topSpeakerDetails) => {
			if (topSpeakerDetails && topSpeakerDetails.deletedAt === null) {
				topSpeakerDetails.deletedAt = new Date();
				topSpeakerDetails.deletedBy = deletedBy;
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
recover a past event
 * @param topSpeakerId @type string
 */
export const recoverDeletedTopSpeaker = async (topSpeakerId: string) => {
	return await TopSpeakerModel.findById(topSpeakerId)
		.then(async (topSpeakerDetails) => {
			if (topSpeakerDetails && topSpeakerDetails.deletedAt) {
				topSpeakerDetails.deletedAt = undefined;
				topSpeakerDetails.deletedBy = undefined;
				return await topSpeakerDetails.save();
			} else {
				const errorData = {
					message: "Top speaker information not found",
					dateTime: new Date(),
				};

				throw new Error(JSON.stringify(errorData));
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
Get all top speakers - admin
 */
export const getAllTopSpeakersForAdmin = async () => {
	return await TopSpeakerModel.find({ deletedAt: null })
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
		.then((topSpeakers) => {
			return topSpeakers;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
Get all deleted top speakers - admin
 */
export const getDeletedTopSpeakersForAdmin = async () => {
	return await TopSpeakerModel.find({ deletedAt: { $ne: null } })
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
		.then((topSpeakers) => {
			return topSpeakers;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
delete a past event
 * @param topSpeakerId @type string
 */
export const permenentDeleteTopSpeaker = async (topSpeakerId: string) => {
	if (topSpeakerId) {
		return TopSpeakerModel.findByIdAndDelete(topSpeakerId);
	} else {
		throw new Error("Topspeaker ID not Passed");
	}
};
