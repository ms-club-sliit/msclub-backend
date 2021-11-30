import { createUser } from "./User.controller";

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

import {
  insertTopSpeaker,
  getTopSpeaker,
  getTopSpeakers,
  updateTopSpeaker,
  deleteTopSpeaker,
} from "./TopSpeaker.controller";


/**
 * @todo import the @methods from ApplicationController
 */
/**
 * @todo import the @methods from BoardMemberController
 */
import {
  getBoardMemberbyID,
  getAllBoardMembers,
  updateBoardMemberDetails,
  deleteBoardMemberDetails,
} from "./BoardMember.controller";
/**
 * @todo import the @methods from ExecutiveBoardMemberController
 */
import {
  insertExecutiveBoard,
  getExecutiveBoardbyID,
  getExecutiveBoard,
  addBoardMember,
  updateExecutiveBoardDetails,
  deleteExecutiveBoardDetails,
} from "./ExecutiveBoard.controller";

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
  insertExecutiveBoard,
  getExecutiveBoardbyID,
  getExecutiveBoard,
  addBoardMember,
  updateExecutiveBoardDetails,
  deleteExecutiveBoardDetails,
  insertTopSpeaker,
  getTopSpeaker,
  getTopSpeakers,
  updateTopSpeaker,
  deleteTopSpeaker,
  getBoardMemberbyID,
  getAllBoardMembers,
  updateBoardMemberDetails,
  deleteBoardMemberDetails,
};
