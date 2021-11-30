/**
import @methods from User Service
 */
import { insertUser } from "./User.service";
import { insertContact } from "./Contact.service";
/**
import @methods from Event Service
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
 import @methods from Webinar Service
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
import @methods from TopSpeaker Service
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
 import @methods from BoardMember Service
 */
import {
  insertBoardMember,
  getBoardMemberbyID,
  getAllBoardMembers,
  updateBoardMemberDetails,
  deleteBoardMemberDetails,
} from "./BoardMember.service";
/**
 import @methods from ExecutiveBoardMember Service
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
  insertUser,
  insertContact,
  /**
 export @methods from Event Service
   */
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent,
  /**
 export @methods from Webinar Service
   */
  insertWebinar,
  fetchWebinarById,
  fetchWebinars,
  fetchPastWebinars,
  fetchUpcomingWebinar,
  updateWebinar,
  removeWebinar,
  /**
 export @methods from TopSpeaker Service
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
export @methods from BoardMember Service
   */
  insertBoardMember,
  getBoardMemberbyID,
  getAllBoardMembers,
  updateBoardMemberDetails,
  deleteBoardMemberDetails,
  /**
 export @methods from ExecutiveBoardMember Service
   */
  insertExecutiveBoard,
  getExecutiveBoardbyID,
  getExecutiveBoard,
  addBoardMember,
  updateExecutiveBoardDetails,
  deleteExecutiveBoardDetails,
};
