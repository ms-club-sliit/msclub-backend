import { insertUser, authenticateUser } from "./User.service";

import {
  insertContact,
  archiveContact,
  fetchContactInfo,
} from "./Contact.service";

import {
  insertEvent,
  getEvent,
  getEvents,
  getPastEvents,
  getUpcomingEvent,
  updateEvent,
  deleteEvent,
  getAllEventsForAdmin,
  getDeletedEventsForAdmin,
} from "./Event.service";

import {
  insertWebinar,
  fetchWebinarById,
  fetchWebinars,
  fetchPastWebinars,
  fetchUpcomingWebinar,
  updateWebinar,
  removeWebinar,
} from "./Webinar.service";

import {
  insertTopSpeaker,
  getTopSpeaker,
  getTopSpeakers,
  updateTopSpeaker,
  deleteTopSpeaker,
} from "./TopSpeaker.service";

import {
  addApplication,
  fetchApplicationById,
  fetchApplications,
  archiveApplication,
  changeApplicationStatusIntoInterview,
  changeApplicationStatusIntoSelected,
  changeApplicationStatusIntoRejected,
} from "./Application.service";

import {
  insertBoardMember,
  getBoardMemberbyID,
  getAllBoardMembers,
  updateBoardMemberDetails,
  deleteBoardMemberDetails,
} from "./BoardMember.service";

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
  authenticateUser,
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
  getAllEventsForAdmin,
  getDeletedEventsForAdmin,
  // Webinar services
  insertWebinar,
  fetchWebinarById,
  fetchWebinars,
  fetchPastWebinars,
  fetchUpcomingWebinar,
  updateWebinar,
  removeWebinar,
  // TopSpeaker Service
  insertTopSpeaker,
  getTopSpeaker,
  getTopSpeakers,
  updateTopSpeaker,
  deleteTopSpeaker,
  // Application Service
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
