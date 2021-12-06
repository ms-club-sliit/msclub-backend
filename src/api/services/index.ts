/**
import @methods from User Service
 */
import { insertUser } from "./User.service";
import {
  insertContact,
  archiveContact,
  fetchContactInfo,
} from "./Contact.service";
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
import {
  addApplication,
  fetchApplicationById,
  fetchApplications,
  archiveApplication,
  changeApplicationStatusIntoInterview,
  changeApplicationStatusIntoSelected,
  changeApplicationStatusIntoRejected,
} from "./Application.service";
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
  //TopSpeaker Service
  insertTopSpeaker,
  getTopSpeaker,
  getTopSpeakers,
  updateTopSpeaker,
  deleteTopSpeaker,
  /**
   * Application Service
   */
  addApplication,
  fetchApplicationById,
  fetchApplications,
  archiveApplication,
  changeApplicationStatusIntoInterview,
  changeApplicationStatusIntoSelected,
  changeApplicationStatusIntoRejected,
  // BoardMember Service
  insertBoardMember,
  getBoardMemberbyID,
  getAllBoardMembers,
  updateBoardMemberDetails,
  deleteBoardMemberDetails,
  // ExecutiveBoardMember Service
  insertExecutiveBoard,
  getExecutiveBoardbyID,
  getExecutiveBoard,
  addBoardMember,
  updateExecutiveBoardDetails,
  deleteExecutiveBoardDetails,
};
