/**
 * @todo import @methods from User Service
 */
import { insertUser } from "./User.service";
/**
 * @todo import @methods from Event Service
 */
import {
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent,
} from "./Event.service";
/**
 * @todo import @methods from Webinar Service
 */
/**
 * @todo import @methods from TopSpeaker Service
 */
/**
 * @todo import @methods from Application Service
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
  deleteEvent,
  /**
   * @todo export @methods from Webinar Service
   */
  /**
   * @todo export @methods from TopSpeaker Service
   */
  /**
   * @todo export @methods from Application Service
   */
};
