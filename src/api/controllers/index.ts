import { 
  createUser 
} from "./User.controller";

import { 
  createContact, 
  getAllContacts,
  removeContact 
} from "./Contact.controller";

import {
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent,
} from "./Event.controller";

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
  getAllContacts,
  removeContact,
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
