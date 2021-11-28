/**
 * @todo import @methods from User Service
 */
import { insertUser } from "./User.service";
import { insertContact } from "./Contact.service";
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
import {
  insertWebinar,
  fetchWebinarById,
  fetchWebinars,
  fetchPastWebinars,
  fetchUpcomingWebinar,
  updateWebinar,
  removeWebinar,
} from "./Webinar.service";
/**
 * @todo import @methods from TopSpeaker Service
 */

import {
  insertTopSpeaker,
  getTopSpeaker,
  getTopSpeakers,
  updateTopSpeaker,
  deleteTopSpeaker,
} from "./TopSpeaker.service";

/**
 * 
 * @todo import @methods from Application Service
 */
/**
 * @todo import @methods from BoardMember Service
 */
import {
  insertBoardMember,
  getBoardMemberbyID,
  getAllBoardMembers,
  updateBoardMemberDetails,
  deleteBoardMemberDetails,
} from "./BoardMember.service";

export default {
  insertUser,
  insertContact,
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
  insertWebinar,
  fetchWebinarById,
  fetchWebinars,
  fetchPastWebinars,
  fetchUpcomingWebinar,
  updateWebinar,
  removeWebinar,
  /**
   * @todo export @methods from TopSpeaker Service
   */

  insertTopSpeaker,
  getTopSpeaker,
  getTopSpeakers,
  updateTopSpeaker,
  deleteTopSpeaker,

  /**
   * @todo export @methods from Application Service
   */
  /**
   * @todo export @methods from Event Service
   */
  insertBoardMember,
  getBoardMemberbyID,
  getAllBoardMembers,
  updateBoardMemberDetails,
  deleteBoardMemberDetails,
};
