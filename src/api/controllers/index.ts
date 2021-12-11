import { createUser, login } from "./User.controller";

import {
  createContact,
  getAllContacts,
  removeContact,
} from "./Contact.controller";

import {
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent,
  eventsForAdmin,
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

import {
  insertTopSpeaker,
  getTopSpeaker,
  getTopSpeakers,
  updateTopSpeaker,
  deleteTopSpeaker,
} from "./TopSpeaker.controller";

import {
  addApplication,
  getApplicationById,
  getApplications,
  setApplicationArchive,
  changeApplicationStatusIntoInterview,
  changeApplicationStatusIntoSelected,
  changeApplicationStatusIntoRejected,
} from "./Application.controller";

import {
  getBoardMemberbyID,
  getAllBoardMembers,
  updateBoardMemberDetails,
  deleteBoardMemberDetails,
} from "./BoardMember.controller";

import {
  insertExecutiveBoard,
  getExecutiveBoardbyID,
  getExecutiveBoard,
  addBoardMember,
  updateExecutiveBoardDetails,
  deleteExecutiveBoardDetails,
} from "./ExecutiveBoard.controller";

export default {
  //User Controllers
  createUser,
  login,
  //Contact Controllers
  createContact,
  getAllContacts,
  removeContact,
  //Event Controllers
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent,
  eventsForAdmin,
  //Webinar Controllers
  insertWebinar,
  getWebinarById,
  getWebinars,
  getPastWebinars,
  getUpcomingWebinar,
  updateWebinar,
  deleteWebinar,
  //Executive board Controllers
  insertExecutiveBoard,
  getExecutiveBoardbyID,
  getExecutiveBoard,
  addBoardMember,
  updateExecutiveBoardDetails,
  deleteExecutiveBoardDetails,
  //Top Speaker Controllers
  insertTopSpeaker,
  getTopSpeaker,
  getTopSpeakers,
  updateTopSpeaker,
  deleteTopSpeaker,
  //Board Member Controllers
  getBoardMemberbyID,
  getAllBoardMembers,
  updateBoardMemberDetails,
  deleteBoardMemberDetails,
  //Application Controllers
  addApplication,
  getApplicationById,
  getApplications,
  setApplicationArchive,
  changeApplicationStatusIntoInterview,
  changeApplicationStatusIntoSelected,
  changeApplicationStatusIntoRejected,
};
