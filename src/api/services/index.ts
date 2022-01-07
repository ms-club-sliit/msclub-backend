import {
	insertUser,
	authenticateUser,
	getUsers,
	updateUser,
	deleteUser,
	deleteUserPermenently,
	recoverUser,
	fetchDeletedUsers,
} from "./User.service";

import { insertContact, archiveContact, fetchContactInfo } from "./Contact.service";

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
	recoverDeletedEvent,
	deleteEventPermanently,
} from "./Event.service";

import {
	insertWebinar,
	fetchWebinarById,
	fetchWebinars,
	fetchPastWebinars,
	fetchUpcomingWebinar,
	updateWebinar,
	removeWebinar,
	getAllWebinarsForAdmin,
	getDeletedWebinarsForAdmin,
} from "./Webinar.service";

import {
	insertTopSpeaker,
	getTopSpeaker,
	getTopSpeakers,
	updateTopSpeaker,
	deleteTopSpeaker,
	getAllTopSpeakersForAdmin,
	getDeletedTopSpeakersForAdmin,
} from "./TopSpeaker.service";

import {
	addApplication,
	fetchApplicationById,
	fetchApplications,
	archiveApplication,
	changeApplicationStatusIntoInterview,
	changeApplicationStatusIntoSelected,
	changeApplicationStatusIntoRejected,
	fetchPendingApplications,
	fetchInterviewApplications,
	fetchSelectedApplications,
	fetchRejectedApplications,
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

import {
	createOrganization,
	getOrganizationInfo,
	getOrganizationInfoForAdmin,
	updateOrganizationInfo,
} from "./Organization.service";

export default {
	// User services
	insertUser,
	authenticateUser,
	getUsers,
	updateUser,
	deleteUser,
	deleteUserPermenently,
	recoverUser,
	fetchDeletedUsers,
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
	recoverDeletedEvent,
	deleteEventPermanently,
	// Webinar services
	insertWebinar,
	fetchWebinarById,
	fetchWebinars,
	fetchPastWebinars,
	fetchUpcomingWebinar,
	updateWebinar,
	removeWebinar,
	getAllWebinarsForAdmin,
	getDeletedWebinarsForAdmin,
	// TopSpeaker Service
	insertTopSpeaker,
	getTopSpeaker,
	getTopSpeakers,
	updateTopSpeaker,
	deleteTopSpeaker,
	getAllTopSpeakersForAdmin,
	getDeletedTopSpeakersForAdmin,
	// Application Service
	addApplication,
	fetchApplicationById,
	fetchApplications,
	archiveApplication,
	changeApplicationStatusIntoInterview,
	changeApplicationStatusIntoSelected,
	changeApplicationStatusIntoRejected,
	fetchPendingApplications,
	fetchInterviewApplications,
	fetchSelectedApplications,
	fetchRejectedApplications,
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
	// Organization Service
	createOrganization,
	getOrganizationInfo,
	getOrganizationInfoForAdmin,
	updateOrganizationInfo,
};
