/**
 * @todo import @methods from User Service
 */
import { insertUser } from "./User.service";
import { 
  insertContact,
  archiveContact,
  fetchContactInfo
} from "./Contact.service";
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
/**
 * @todo import @methods from ExecutiveBoardMember Service
 */
import {
  insertExecutiveBoard,
  getExecutiveBoardbyID,
  getExecutiveBoard,
  addBoardMember,
  updateExecutiveBoardDetails,
  deleteExecutiveBoardDetails,
} from "./ExecutiveBoard.service";

export default {
  // User services
  insertUser,
  // Contact services
  insertContact,
  fetchContactInfo,
  archiveContact,
  // Event services
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent,
  // Webinar services
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
  /**
   * @todo export @methods from ExecutiveBoardMember Service
   */
  insertExecutiveBoard,
  getExecutiveBoardbyID,
  getExecutiveBoard,
  addBoardMember,
  updateExecutiveBoardDetails,
  deleteExecutiveBoardDetails,
};
