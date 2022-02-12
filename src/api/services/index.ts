import {
	insertUser,
	authenticateUser,
	getUsers,
	updateUser,
	adminUpdateUser,
	deleteUser,
	deleteUserPermenently,
	recoverUser,
	fetchDeletedUsers,
} from "./User.service";

import {
	insertContact,
	archiveContact,
	fetchContactInfo,
	getArchivedContacts,
	deleteContactPermanently,
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
	recoverDeletedWebinar,
	deleteWebinarPermanently,
} from "./Webinar.service";

import {
	insertTopSpeaker,
	getTopSpeaker,
	getTopSpeakers,
	updateTopSpeaker,
	deleteTopSpeaker,
	recoverDeletedTopSpeaker,
	getAllTopSpeakersForAdmin,
	getDeletedTopSpeakersForAdmin,
	permenentDeleteTopSpeaker,
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
	getDeletedApplicationsForAdmin,
	recoverDeletedApplication,
	deleteApplicationPermanently,
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
	adminUpdateUser,
	deleteUser,
	deleteUserPermenently,
	recoverUser,
	fetchDeletedUsers,
	// Contact services
	insertContact,
	fetchContactInfo,
	archiveContact,
	getArchivedContacts,
	deleteContactPermanently,
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
	recoverDeletedWebinar,
	deleteWebinarPermanently,
	// TopSpeaker Service
	insertTopSpeaker,
	getTopSpeaker,
	getTopSpeakers,
	updateTopSpeaker,
	deleteTopSpeaker,
	recoverDeletedTopSpeaker,
	getAllTopSpeakersForAdmin,
	getDeletedTopSpeakersForAdmin,
	permenentDeleteTopSpeaker,
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
	getDeletedApplicationsForAdmin,
	recoverDeletedApplication,
	deleteApplicationPermanently,
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
