import { DocumentDefinition, FilterQuery } from "mongoose";
import { IEvent } from "../interfaces";
import EventModel from "../models/Event.model";

/**
 save an event in the database
 */
export const insertEvent = async (eventData: DocumentDefinition<IEvent>) => {
  return await EventModel.create(eventData)
    .then((event) => {
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
  eventData: DocumentDefinition<IEvent>
) => {
  return await EventModel.findById(eventId)
    .then(async (eventDetails) => {
      if (eventDetails) {
        eventDetails.title = eventData.title;
        eventDetails.description = eventData.description;
        eventDetails.imageUrl = eventData.imageUrl;
        eventDetails.link = eventData.link;
        eventDetails.tags = eventData.tags;
        eventDetails.dateTime = eventData.dateTime;
        eventDetails.eventType = eventData.eventType;
        return await eventDetails.save();
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
export const deleteEvent = async (eventId: string) => {
  return await EventModel.findById(eventId)
    .then(async (eventDetails) => {
      if (eventDetails) {
        eventDetails.deletedAt = new Date();
        return await eventDetails.save();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
