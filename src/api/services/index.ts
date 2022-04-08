/*
 * Created on Sat Feb 12 2022
 *
 * The GNU General Public License v3.0
 * Copyright (c) 2022 MS Club SLIIT Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program at
 *
 *     https://www.gnu.org/licenses/
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */

import {
	insertUser,
	authenticateUser,
	authenticateUserByFace,
	getUsers,
	updateUser,
	adminUpdateUser,
	deleteUser,
	deleteUserPermenently,
	recoverUser,
	fetchDeletedUsers,
	getLogins,
} from "./User.service";

import {
	insertContact,
	archiveContact,
	fetchContactInfo,
	getArchivedContacts,
	deleteContactPermanently,
	recoverDeletedInquiry,
	replyInquiry,
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

import {
	scheduleInternalMeetingMSTeams,
	getAllInternalMeetingsMSTeams,
	deleteMeeting,
	fetchMeetingById,
} from "./Meeting.service";

export default {
	// User services
	insertUser,
	authenticateUser,
	authenticateUserByFace,
	getUsers,
	updateUser,
	adminUpdateUser,
	deleteUser,
	deleteUserPermenently,
	recoverUser,
	fetchDeletedUsers,
	getLogins,
	// Contact services
	insertContact,
	fetchContactInfo,
	archiveContact,
	getArchivedContacts,
	deleteContactPermanently,
	recoverDeletedInquiry,
	replyInquiry,
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

	// Meeting Service
	scheduleInternalMeetingMSTeams,
	getAllInternalMeetingsMSTeams,
	deleteMeeting,
	fetchMeetingById,
};
