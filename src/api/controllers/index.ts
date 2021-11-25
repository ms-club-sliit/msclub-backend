/**
 * @todo import the @methods from UserController
 */
import { createUser } from "./User.controller";
/**
 * @todo import the @methods from EventController
 */
import { insertEvent, getEvent, getEvents,getPastEvents,getUpcomingEvent,updateEvent,deleteEvent } from "./Event.controller";
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
   /**
   * @todo export the @methods from UserController
   */
  createUser,
   /**
   * @todo export the @methods from EventController
   */
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent
  /**
   * @todo export the @methods from WebinarController
   */
  /**
   * @todo export the @methods from TopSpeakerController
   */
   /**
   * @todo export the @methods from ApplicationController
   */
};
