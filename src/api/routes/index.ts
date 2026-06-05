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

/* eslint-disable max-len */
/* eslint-disable indent */
import { Express, RequestHandler } from "express";
import controller from "../controllers";
//import Schema from "../validations";
import middleware from "../middleware";
import multer from "multer";
const upload = multer();

// Type assertion function to handle type conflicts
const asHandler = (handler: any): RequestHandler => handler as RequestHandler;

// prettier-ignore
export default function (app: Express) {
  // User endpoints
  app.post("/user/", upload.single("profileImage"), asHandler(controller.createUser));
  app.get("/user/logins/", middleware.authenticate, asHandler(controller.getLogins));
  app.post("/user/login/", asHandler(controller.login));
  app.post("/user/login/faceauth/", upload.single("profileImage"), asHandler(controller.loginByFaceAuthentication));
  app.get("/user/auth/", middleware.authenticate, asHandler(controller.getAuthUser));
  app.get("/user/all", middleware.authenticate, asHandler(controller.getAllUsers));
  app.get("/user/remove/", middleware.authenticate, asHandler(controller.getRemovedUsers));
  app.put("/user/", middleware.authenticate, upload.single("profileImage"), asHandler(controller.updateUser));
  app.put("/user/admin/edituser", middleware.authenticate, upload.single("profileImage"), asHandler(controller.adminUpdateUser));
  app.put("/user/remove/", middleware.authenticate, asHandler(controller.removeUser));
  app.put("/user/recover/", middleware.authenticate, asHandler(controller.recoverUser));
  app.delete("/user/remove/", middleware.authenticate, asHandler(controller.removeUserPermenently));
  
  // Contact Us endpoints - Private
  app.get("/admin/contact/", middleware.authenticate, asHandler(controller.getAllContacts));
  app.get("/admin/contact/delete", middleware.authenticate, asHandler(controller.removedContacts));
  app.put("/admin/contact/delete/:contactId", middleware.authenticate, asHandler(controller.removeContact));
  app.put("/admin/contact/recover/:inquiryId", middleware.authenticate, asHandler(controller.recoverRemovedInquiry));
  app.delete("/admin/contact/delete/:contactId", middleware.authenticate, asHandler(controller.removeContactPermanently));
  app.put("/admin/contact/reply/:inquiryId", middleware.authenticate, asHandler(controller.replyInquiry));
  
  // Contact Us endpoints - Public
  app.post("/contact/", asHandler(controller.createContact));

  // Event endpoints - Private
  app.post("/admin/event/", middleware.authenticate, upload.single("eventFlyer"), asHandler(controller.insertEvent));
  app.get("/admin/event/", middleware.authenticate, asHandler(controller.eventsForAdmin));
  app.get("/admin/event/delete/", middleware.authenticate, asHandler(controller.deletedEventsForAdmin));
  app.put("/admin/event/:eventId", middleware.authenticate, upload.single("eventFlyer"), asHandler(controller.updateEvent));
  app.put("/admin/event/delete/:eventId", middleware.authenticate, asHandler(controller.deleteEvent));
  app.put("/admin/event/recover/:eventId", middleware.authenticate, asHandler(controller.recoverRemovedEvent));
  app.delete("/admin/event/permanentdelete/:eventId", middleware.authenticate, asHandler(controller.deleteEventPermanently));
  
  
  // Event endpoints - Public
  app.get("/event/", asHandler(controller.getEvents));
  app.get("/event/:eventId/", asHandler(controller.getEvent));
  app.get("/pastevent/", asHandler(controller.getPastEvents));
  app.get("/upcomingevent/", asHandler(controller.getUpcomingEvent));

  // Webinar endpoints - Private
  app.post("/admin/webinar/", middleware.authenticate, upload.single("webinarFlyer"), asHandler(controller.insertWebinar));
  app.put("/admin/webinar/:webinarId", middleware.authenticate, upload.single("webinarFlyer"), asHandler(controller.updateWebinar));
  app.put("/admin/webinar/delete/:webinarId", middleware.authenticate, asHandler(controller.deleteWebinar));
  app.get("/admin/webinar/", middleware.authenticate, asHandler(controller.webinarsForAdmin));
  app.get("/admin/webinar/delete/", middleware.authenticate, asHandler(controller.deletedWebinarsForAdmin));
  app.put("/admin/webinar/recover/:webinarId", middleware.authenticate, asHandler(controller.recoverRemovedWebinar));
  app.delete("/admin/webinar/permanentdelete/:webinarId", middleware.authenticate, asHandler(controller.deleteWebinarPermanently));

  // Webinar endpoints
  app.get("/webinar/", asHandler(controller.getWebinars));
  app.get("/webinar/:webinarId/", asHandler(controller.getWebinarById));
  app.get("/pastwebinar/", asHandler(controller.getPastWebinars));
  app.get("/upcomingwebinar/", asHandler(controller.getUpcomingWebinar));

  // Top Speaker endpoints - Private
  app.post("/admin/topspeaker/", middleware.authenticate, upload.single("topSpeakerFlyer"), asHandler(controller.insertTopSpeaker));
  app.put("/admin/topspeaker/:topSpeakerId", middleware.authenticate, upload.single("topSpeakerFlyer"), asHandler(controller.updateTopSpeaker));
  app.put("/admin/topspeaker/delete/:topSpeakerId", middleware.authenticate, asHandler(controller.deleteTopSpeaker));
  app.get("/admin/topspeaker/", middleware.authenticate, asHandler(controller.getAllTopSpeakersForAdmin));
  app.get("/admin/topspeaker/deleted/", middleware.authenticate, asHandler(controller.getDeletedTopSpeakersForAdmin));
  app.delete("/admin/topspeaker/permanentdelete/:topSpeakerId", middleware.authenticate, asHandler(controller.permenentDeleteTopSpeaker));
  app.put("/admin/topspeaker/recover/:topSpeakerId", middleware.authenticate, asHandler(controller.recoverDeletedTopSpeaker));

  // Top Speaker endpoints - Public
  app.get("/topspeaker/:topSpeakerId/", asHandler(controller.getTopSpeaker));
  app.get("/topspeaker/", asHandler(controller.getTopSpeakers));

  // BoardMember endpoints - Private
  app.put("/admin/boardmember/:boardMemberId", middleware.authenticate, upload.single("boardMemberFlyer"), asHandler(controller.updateBoardMemberDetails));
  app.put("/admin/boardmember/delete/:boardMemberId", middleware.authenticate, asHandler(controller.deleteBoardMemberDetails));

  // BoardMember endpoints - Public
  app.get("/boardmember/:boardMemberId/", asHandler(controller.getBoardMemberbyID));
  app.get("/boardmember/", asHandler(controller.getAllBoardMembers));

  // ExecutiveBoard endpoints - Private
  app.post("/admin/executive/", middleware.authenticate, asHandler(controller.insertExecutiveBoard));
  app.put("/admin/executive/boardmember/:executiveBoardId", middleware.authenticate, upload.single("boardMemberFlyer"), asHandler(controller.addBoardMember));
  app.put("/admin/executive/:executiveBoardId", middleware.authenticate, asHandler(controller.updateExecutiveBoardDetails));
  app.put("/admin/executive/delete/:executiveBoardId/", middleware.authenticate, asHandler(controller.deleteExecutiveBoardDetails));

  // ExecutiveBoard endpoints - Public
  app.get("/executive/:executiveBoardId/", asHandler(controller.getExecutiveBoardbyID));
  app.get("/executive/", asHandler(controller.getExecutiveBoard));

  // Application endpoints - Private
  app.get("/admin/applications/pending/", middleware.authenticate, asHandler(controller.fetchPendingApplications));
  app.get("/admin/applications/selected/", middleware.authenticate, asHandler(controller.fetchSelectedApplications));
  app.get("/admin/applications/interview/", middleware.authenticate, asHandler(controller.fetchInterviewApplications));
  app.get("/admin/applications/rejected/", middleware.authenticate, asHandler(controller.fetchRejectedApplications));
  app.get("/admin/applications/deleted/", middleware.authenticate, asHandler(controller.getDeletedApplicationsForAdmin));
  app.get("/admin/application/:applicationId/", middleware.authenticate, asHandler(controller.getApplicationById));
  app.get("/admin/application/", middleware.authenticate, asHandler(controller.getApplications));
  app.put("/admin/application/delete/:applicationId", middleware.authenticate, asHandler(controller.setApplicationArchive));
  app.put("/admin/application/interview/:applicationId", middleware.authenticate, asHandler(controller.changeApplicationStatusIntoInterview));
  app.put("/admin/application/selected/:applicationId", middleware.authenticate, asHandler(controller.changeApplicationStatusIntoSelected));
  app.put("/admin/application/rejected/:applicationId", middleware.authenticate, asHandler(controller.changeApplicationStatusIntoRejected));
  app.put("/admin/application/recover/:applicationId", middleware.authenticate, asHandler(controller.recoverRemovedApplication));
  app.delete("/admin/application/permanentdelete/:applicationId", middleware.authenticate, asHandler(controller.deleteApplicationPermanently));

  // Application endpoints - Public
  //app.post("/application/", middleware.validateRequest(Schema.applicationSchema), controller.addApplication);
  app.post("/application/", asHandler(controller.addApplication));

  // Organization endpoints - Private
  app.post("/admin/organization/", middleware.authenticate, upload.single("organizationLogo"), asHandler(controller.insertOrganization));
  app.get("/admin/organization/info", middleware.authenticate, asHandler(controller.getOrganization));
  app.get("/admin/organization/", middleware.authenticate, asHandler(controller.getOrganizationForAdmin));
  app.put("/admin/organization/", middleware.authenticate, upload.single("organizationLogo"), asHandler(controller.updateOrganization));

  // Meeting endpoints
  app.post("/api/meeting/internal/", middleware.authenticate, asHandler(controller.scheduleInternalMeeting));
  app.get("/api/meeting/internal/", middleware.authenticate, asHandler(controller.getAllInternalMeetings));
  app.put("/api/meeting/:meetingId", middleware.authenticate, asHandler(controller.updateMeeting));
  app.put("/api/meeting/delete/:meetingId", middleware.authenticate, asHandler(controller.deleteMeeting));
  app.get("/api/meeting/internal/:meetingId", middleware.authenticate, asHandler(controller.getInternalMeetingById));
  app.delete(
    "/api/meeting/internal/permanentdelete/:meetingId",
    middleware.authenticate,
    asHandler(controller.deleteMeetingPermanently));
  app.post("/api/meeting/interview/", middleware.authenticate, asHandler(controller.scheduleInterviewMeeting));
}
