import {
	createUser,
	login,
	getAuthUser,
	getAllUsers,
	updateUser,
	adminUpdateUser,
	removeUser,
	removeUserPermenently,
	recoverUser,
	getRemovedUsers,
} from "./User.controller";

import { createContact, getAllContacts, removeContact, removedContacts } from "./Contact.controller";

import {
	insertEvent,
	getEvent,
	getEvents,
	getPastEvents,
	getUpcomingEvent,
	updateEvent,
	deleteEvent,
	eventsForAdmin,
	deletedEventsForAdmin,
	deleteEventPermanently,
	recoverRemovedEvent,
} from "./Event.controller";

import {
	insertWebinar,
	getWebinarById,
	getWebinars,
	getPastWebinars,
	getUpcomingWebinar,
	updateWebinar,
	deleteWebinar,
	webinarsForAdmin,
	deletedWebinarsForAdmin,
	recoverRemovedWebinar,
	deleteWebinarPermanently,
	//@todo import deleteWebinarPermanently method
} from "./Webinar.controller";

import {
	insertTopSpeaker,
	getTopSpeaker,
	getTopSpeakers,
	updateTopSpeaker,
	deleteTopSpeaker,
	recoverDeletedTopSpeaker,
	getAllTopSpeakersForAdmin,
	getDeletedTopSpeakersForAdmin,
} from "./TopSpeaker.controller";

import {
	addApplication,
	getApplicationById,
	getApplications,
	setApplicationArchive,
	changeApplicationStatusIntoInterview,
	changeApplicationStatusIntoSelected,
	changeApplicationStatusIntoRejected,
	fetchPendingApplications,
	fetchSelectedApplications,
	fetchInterviewApplications,
	fetchRejectedApplications,
	getDeletedApplicationsForAdmin,
	recoverRemovedApplication,
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

import {
	insertOrganization,
	getOrganization,
	getOrganizationForAdmin,
	updateOrganization,
} from "./Organization.controller";

export default {
	//User Controllers
	createUser,
	login,
	getAuthUser,
	getAllUsers,
	updateUser,
	adminUpdateUser,
	removeUser,
	removeUserPermenently,
	recoverUser,
	getRemovedUsers,
	//Contact Controllers
	createContact,
	getAllContacts,
	removeContact,
	removedContacts,
	//Event Controllers
	insertEvent,
	getEvent,
	getEvents,
	getPastEvents,
	getUpcomingEvent,
	updateEvent,
	deleteEvent,
	eventsForAdmin,
	deletedEventsForAdmin,
	deleteEventPermanently,
	recoverRemovedEvent,
	//Webinar Controllers
	insertWebinar,
	getWebinarById,
	getWebinars,
	getPastWebinars,
	getUpcomingWebinar,
	updateWebinar,
	deleteWebinar,
	webinarsForAdmin,
	deletedWebinarsForAdmin,
	recoverRemovedWebinar,
	deleteWebinarPermanently,
	//@todo export deleteWebinarPermanently method
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
	recoverDeletedTopSpeaker,
	getAllTopSpeakersForAdmin,
	getDeletedTopSpeakersForAdmin,
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
	fetchPendingApplications,
	fetchSelectedApplications,
	fetchInterviewApplications,
	fetchRejectedApplications,
	getDeletedApplicationsForAdmin,
	recoverRemovedApplication,
	// Organization Controllers
	insertOrganization,
	getOrganization,
	getOrganizationForAdmin,
	updateOrganization,
};
