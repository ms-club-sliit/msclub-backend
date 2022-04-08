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
import { Express } from "express";
import controller from "../controllers";
//import Schema from "../validations";
import middleware from "../middleware";
import multer from "multer";
const upload = multer();

// prettier-ignore
export default function (app: Express) {
  // User endpoints
  app.post("/user/", upload.single("profileImage"), controller.createUser);
  app.get("/user/logins/", middleware.authenticate, controller.getLogins);
  app.post("/user/login/", controller.login);
  app.post("/user/login/faceauth/", upload.single("profileImage"), controller.loginByFaceAuthentication);
  app.get("/user/auth/", middleware.authenticate, controller.getAuthUser);
  app.get("/user/all", middleware.authenticate, controller.getAllUsers);
  app.get("/user/remove/", middleware.authenticate, controller.getRemovedUsers);
  app.put("/user/", middleware.authenticate, upload.single("profileImage"), controller.updateUser);
  app.put("/user/admin/edituser", middleware.authenticate, upload.single("profileImage"), controller.adminUpdateUser);
  app.put("/user/remove/", middleware.authenticate, controller.removeUser);
  app.put("/user/recover/", middleware.authenticate, controller.recoverUser);
  app.delete("/user/remove/", middleware.authenticate, controller.removeUserPermenently);
  
  // Contact Us endpoints - Private
  app.get("/admin/contact/", middleware.authenticate, controller.getAllContacts);
  app.get("/admin/contact/delete", middleware.authenticate, controller.removedContacts);
  app.put("/admin/contact/delete/:contactId", middleware.authenticate, controller.removeContact);
  app.put("/admin/contact/recover/:inquiryId", middleware.authenticate, controller.recoverRemovedInquiry);
  app.delete("/admin/contact/delete/:contactId", middleware.authenticate, controller.removeContactPermanently);
  app.put("/admin/contact/reply/:inquiryId", middleware.authenticate, controller.replyInquiry);
  
  // Contact Us endpoints - Public
  app.post("/contact/", controller.createContact);

  // Event endpoints - Private
  app.post("/admin/event/", middleware.authenticate, upload.single("eventFlyer"), controller.insertEvent);
  app.get("/admin/event/", middleware.authenticate, controller.eventsForAdmin);
  app.get("/admin/event/delete/", middleware.authenticate, controller.deletedEventsForAdmin);
  app.put("/admin/event/:eventId", middleware.authenticate, upload.single("eventFlyer"), controller.updateEvent);
  app.put("/admin/event/delete/:eventId", middleware.authenticate, controller.deleteEvent);
  app.put("/admin/event/recover/:eventId", middleware.authenticate, controller.recoverRemovedEvent);
  app.delete("/admin/event/permanentdelete/:eventId", middleware.authenticate, controller.deleteEventPermanently);
  
  
  // Event endpoints - Public
  app.get("/event/", controller.getEvents);
  app.get("/event/:eventId/", controller.getEvent);
  app.get("/pastevent/", controller.getPastEvents);
  app.get("/upcomingevent/", controller.getUpcomingEvent);

  // Webinar endpoints - Private
  app.post("/admin/webinar/", middleware.authenticate, upload.single("webinarFlyer"), controller.insertWebinar);
  app.put("/admin/webinar/:webinarId", middleware.authenticate, upload.single("webinarFlyer"), controller.updateWebinar);
  app.put("/admin/webinar/delete/:webinarId", middleware.authenticate, controller.deleteWebinar);
  app.get("/admin/webinar/", middleware.authenticate,controller.webinarsForAdmin);
  app.get("/admin/webinar/delete/", middleware.authenticate,controller.deletedWebinarsForAdmin);
  app.put("/admin/webinar/recover/:webinarId", middleware.authenticate, controller.recoverRemovedWebinar);
  app.delete("/admin/webinar/permanentdelete/:webinarId", middleware.authenticate, controller.deleteWebinarPermanently);

  // Webinar endpoints
  app.get("/webinar/", controller.getWebinars);
  app.get("/webinar/:webinarId/", controller.getWebinarById);
  app.get("/pastwebinar/", controller.getPastWebinars);
  app.get("/upcomingwebinar/", controller.getUpcomingWebinar);

  // Top Speaker endpoints - Private
  app.post("/admin/topspeaker/", middleware.authenticate, upload.single("topSpeakerFlyer"), controller.insertTopSpeaker);
  app.put("/admin/topspeaker/:topSpeakerId", middleware.authenticate, upload.single("topSpeakerFlyer"), controller.updateTopSpeaker);
  app.put("/admin/topspeaker/delete/:topSpeakerId", middleware.authenticate, controller.deleteTopSpeaker);
  app.get("/admin/topspeaker/", middleware.authenticate,controller.getAllTopSpeakersForAdmin);
  app.get("/admin/topspeaker/deleted/", middleware.authenticate,controller.getDeletedTopSpeakersForAdmin);
  app.delete("/admin/topspeaker/permanentdelete/:topSpeakerId", middleware.authenticate, controller.permenentDeleteTopSpeaker);
  app.put("/admin/topspeaker/recover/:topSpeakerId", middleware.authenticate, controller.recoverDeletedTopSpeaker);

  // Top Speaker endpoints - Public
  app.get("/topspeaker/:topSpeakerId/", controller.getTopSpeaker);
  app.get("/topspeaker/", controller.getTopSpeakers);

  // BoardMember endpoints - Private
  app.put("/admin/boardmember/:boardMemberId", middleware.authenticate, upload.single("boardMemberFlyer"), controller.updateBoardMemberDetails);
  app.put("/admin/boardmember/delete/:boardMemberId", middleware.authenticate, controller.deleteBoardMemberDetails);

  // BoardMember endpoints - Public
  app.get("/boardmember/:boardMemberId/", controller.getBoardMemberbyID);
  app.get("/boardmember/", controller.getAllBoardMembers);

  // ExecutiveBoard endpoints - Private
  app.post("/admin/executive/", middleware.authenticate, controller.insertExecutiveBoard);
  app.put("/admin/executive/boardmember/:executiveBoardId", middleware.authenticate, upload.single("boardMemberFlyer"), controller.addBoardMember);
  app.put("/admin/executive/:executiveBoardId", middleware.authenticate, controller.updateExecutiveBoardDetails);
  app.put("/admin/executive/delete/:executiveBoardId/", middleware.authenticate, controller.deleteExecutiveBoardDetails);

  // ExecutiveBoard endpoints - Public
  app.get("/executive/:executiveBoardId/", controller.getExecutiveBoardbyID);
  app.get("/executive/", controller.getExecutiveBoard);

  // Application endpoints - Private
  app.get("/admin/applications/pending/", middleware.authenticate, controller.fetchPendingApplications);
  app.get("/admin/applications/selected/", middleware.authenticate, controller.fetchSelectedApplications);
  app.get("/admin/applications/interview/", middleware.authenticate, controller.fetchInterviewApplications);
  app.get("/admin/applications/rejected/", middleware.authenticate, controller.fetchRejectedApplications);
  app.get("/admin/applications/deleted/", middleware.authenticate, controller.getDeletedApplicationsForAdmin);
  app.get("/admin/application/:applicationId/", middleware.authenticate, controller.getApplicationById);
  app.get("/admin/application/", middleware.authenticate, controller.getApplications);
  app.put("/admin/application/delete/:applicationId", middleware.authenticate, controller.setApplicationArchive);
  app.put("/admin/application/interview/:applicationId", middleware.authenticate, controller.changeApplicationStatusIntoInterview);
  app.put("/admin/application/selected/:applicationId", middleware.authenticate, controller.changeApplicationStatusIntoSelected);
  app.put("/admin/application/rejected/:applicationId", middleware.authenticate, controller.changeApplicationStatusIntoRejected);
  app.put("/admin/application/recover/:applicationId", middleware.authenticate, controller.recoverRemovedApplication);
  app.delete("/admin/application/permanentdelete/:applicationId", middleware.authenticate, controller.deleteApplicationPermanently);

  // Application endpoints - Public
  //app.post("/application/", middleware.validateRequest(Schema.applicationSchema), controller.addApplication);
  app.post("/application/", controller.addApplication);

  // Organization endpoints - Private
  app.post("/admin/organization/", middleware.authenticate, upload.single("organizationLogo"), controller.insertOrganization);
  app.get("/admin/organization/info", middleware.authenticate, controller.getOrganization);
  app.get("/admin/organization/", middleware.authenticate, controller.getOrganizationForAdmin);
  app.put("/admin/organization/", middleware.authenticate, upload.single("organizationLogo"), controller.updateOrganization);

  // Meeting endpoints
  app.post("/api/meeting/internal/", middleware.authenticate, controller.scheduleInternalMeeting);
  app.get("/api/meeting/internal/", middleware.authenticate, controller.getAllInternalMeetings);
  app.put("/api/meeting/delete/:meetingId", middleware.authenticate, controller.deleteMeeting);
  app.get("/api/meeting/internal/:meetingId", middleware.authenticate, controller.getInternalMeetingById);
  app.delete(
    "/api/meeting/internal/permanentdelete/:meetingId",
    middleware.authenticate,
    controller.deleteMeetingPermanently);
}
