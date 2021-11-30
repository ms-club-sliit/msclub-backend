import { DocumentDefinition, FilterQuery } from "mongoose";
import { IEvent } from "../interfaces";
import EventModel from "../models/Event.model";

/**
 * @todo create @function insertEvent to save an event in the database
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
 * @todo create @function getEvent to fetch an event in the system
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
 * @todo create @function getEvents to fetch all the events in the system
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
 * @todo create @function getPastEvents to fetch an past events in the system
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
 * @todo create @function getUpcomingEvent to fetch an upcoming event in the system
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
 * @todo create @function updateEvent to update an event in the system
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
        if (eventDetails.deletedAt === null) {
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
          if (eventData.tags) {
            eventDetails.tags = eventData.tags;
          }
          if (eventData.dateTime) {
            eventDetails.dateTime = eventData.dateTime;
          }
          if (eventData.eventType) {
            eventDetails.eventType = eventData.eventType;
          }
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
 * @todo create @function deleteEvent to delete an event
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
