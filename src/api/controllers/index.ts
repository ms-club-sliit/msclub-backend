import { createUser } from "./User.controller";
import { createContact } from "./Contact.controller";
import {
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent,
} from "./Event.controller";

/**
 * @todo import the @methods from WebinarController
 */
import {
  insertWebinar,
  getWebinarById,
  getWebinars,
  getPastWebinars,
  getUpcomingWebinar,
  updateWebinar,
  deleteWebinar,
} from "./Webinar.controller";
/**
 * @todo import the @methods from TopSpeakerController
 */
/**
 * @todo import the @methods from ApplicationController
 */
/**
 * @todo import the @methods from BoardMemberController
 */

export default {
  createUser,
  createContact,
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent,
  insertWebinar,
  getWebinarById,
  getWebinars,
  getPastWebinars,
  getUpcomingWebinar,
  updateWebinar,
  deleteWebinar,
};
