import { insertUser } from "./User.service";
import {
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent
} from "./Event.service";
/**
 * @todo import @methods from Webinar Service
 */
/**
 * @todo import @methods from TopSpeaker Service
 */

export default {
  insertUser,
  /**
   * @todo export @methods from Event Service
   */
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent
  /**
   * @todo export @methods from Webinar Service
   */
  /**
   * @todo export @methods from TopSpeaker Service
   */
};
