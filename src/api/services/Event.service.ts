import { DocumentDefinition, Schema } from "mongoose";
import { IEvent, IUpdatedBy } from "../../interfaces";
import EventModel from "../models/Event.model";
import UserModel from "../models/User.model";

/**
 save an event in the database
 */
export const insertEvent = async (eventData: DocumentDefinition<IEvent>) => {
	return await EventModel.create(eventData)
		.then(async (event) => {
			const initialUpdatedBy: IUpdatedBy = {
				user: event.createdBy,
				updatedAt: new Date(),
			};

			event.updatedBy.push(initialUpdatedBy);
			await event.save();
			return event;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 fetch an event in the system
 * @param eventId @type string
 */
export const getEvent = async (eventId: string) => {
	return await EventModel.findById(eventId)
		.then((event) => {
			return event;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 fetch all the events in the system
 */
export const getEvents = async () => {
	return await EventModel.aggregate([{ $match: { deletedAt: { $eq: null } } }])
		.sort({ createdAt: -1 })
		.then((events) => {
			return events;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 fetch an past events in the system
 */
export const getPastEvents = async () => {
	return await EventModel.find({ eventType: "PAST" })
		.sort({ createdAt: -1 })
		.then((events) => {
			return events;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 fetch an upcoming event in the system
 */
export const getUpcomingEvent = async () => {
	return await EventModel.findOne({ eventType: "UPCOMING" })
		.limit(1)
		.sort({ $natural: -1 })
		.then((event) => {
			return event;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 update an event in the system
 * @param eventId @type string
 * @param updateData @type DocumentDefinition<IEvent>
 */
export const updateEvent = async (
	eventId: string,
	eventData: DocumentDefinition<IEvent>,
	updatedBy: Schema.Types.ObjectId
) => {
	return await EventModel.findById(eventId)
		.then(async (eventDetails) => {
			if (eventDetails) {
				if (!eventDetails.deletedAt) {
					if (eventData.title) {
						eventDetails.title = eventData.title;
					}
					if (eventData.description) {
						eventDetails.description = eventData.description;
					}
					if (eventData.imageUrl) {
						eventDetails.imageUrl = eventData.imageUrl;
					}
					if (eventData.link) {
						eventDetails.link = eventData.link;
					}
					if (eventData.registrationLink) {
						eventDetails.registrationLink = eventData.registrationLink;
					}
					if (eventData.tags) {
						eventDetails.tags = eventData.tags;
					}
					if (eventData.dateTime) {
						eventDetails.dateTime = eventData.dateTime;
					}
					if (eventData.eventType) {
						eventDetails.eventType = eventData.eventType;
					}

					const updateUserInfo: IUpdatedBy = {
						user: updatedBy,
						updatedAt: new Date(),
					};

					eventDetails.updatedBy.push(updateUserInfo);
					return await eventDetails.save();
				} else {
					throw new Error("Event is not found");
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
 delete an event
 * @param eventId @type string
 */
export const deleteEvent = async (eventId: string, deletedBy: Schema.Types.ObjectId) => {
	return await EventModel.findById(eventId)
		.then(async (eventDetails) => {
			if (eventDetails && eventDetails.deletedAt === null) {
				eventDetails.deletedAt = new Date();
				eventDetails.deletedBy = deletedBy;
				return await eventDetails.save();
			} else {
				return "Event not found";
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
Get all events - admin
 */
export const getAllEventsForAdmin = async () => {
	return await EventModel.find({ deletedAt: null })
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
		.sort({ createdAt: -1 })
		.then((events) => {
			return events;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
Get deleted events - admin
 */
export const getDeletedEventsForAdmin = async () => {
	return await EventModel.find({ deletedAt: { $ne: null } })
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
		.sort({ createdAt: -1 })
		.then((events) => {
			return events;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Recover deleted events
export const recoverDeletedEvent = async (eventId: string) => {
	if (eventId) {
		return await EventModel.findById(eventId)
			.then(async (eventDetails) => {
				if (eventDetails) {
					if (eventDetails.deletedAt !== null) {
						eventDetails.deletedAt = null;
						eventDetails.deletedBy = null;
						return await eventDetails.save();
					} else {
						return "Event is already recovered";
					}
				}
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	} else {
		throw new Error("Event ID not Passed");
	}
};

// Delete event permanently
export const deleteEventPermanently = async (eventId: string) => {
	if (eventId) {
		return UserModel.findByIdAndDelete(eventId);
	} else {
		throw new Error("Event ID not Passed");
	}
};
