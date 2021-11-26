import { createUser } from './User.controller';
import { createContact } from './Contact.controller';
import { 
  insertEvent, 
  getEvent, 
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent 
} from "./Event.controller";

/**
 * @todo import the @methods from WebinarController
 */
/**
 * @todo import the @methods from TopSpeakerController
 */
/**
 * @todo import the @methods from ApplicationController
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
  deleteEvent
}
