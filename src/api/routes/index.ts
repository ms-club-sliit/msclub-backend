import { Express } from "express";
import controller from "../controllers";
import middleware from "../middleware";
import multer from "multer";
const upload = multer();

// prettier-ignore
export default function (app: Express) {
  // User endpoints
  app.post("/user/", upload.single("profileImage"), controller.createUser);
  app.post("/user/login/", controller.login);

  // Contact Us endpoints
  app.get("/contact/", middleware.authenticate, controller.getAllContacts);
  app.delete("/contact/:contactId", middleware.authenticate, controller.removeContact);
  app.post("/contact/", controller.createContact);

  // Event endpoints - Private
  app.post("/admin/event/",middleware.authenticate, upload.single('eventFlyer'), controller.insertEvent);
  app.put("/admin/event/:eventId", middleware.authenticate, upload.single('eventFlyer'), controller.updateEvent);
  app.put("/admin/event/delete/:eventId", middleware.authenticate, controller.deleteEvent);
  app.get("/admin/event/", middleware.authenticate,controller.eventsForAdmin);
  // Event endpoints - Public
  app.get("/event/", controller.getEvents);
  app.get("/event/:eventId/", controller.getEvent);
  app.get("/pastevent/", controller.getPastEvents);
  app.get("/upcomingevent/", controller.getUpcomingEvent);

  // Webinar endpoints
  app.post("/webinar/", middleware.authenticate, controller.insertWebinar);
  app.put("/webinar/:webinarId", middleware.authenticate, controller.updateWebinar);
  app.put("/webinar/delete/:webinarId", middleware.authenticate, controller.deleteWebinar);
  app.get("/webinar/", controller.getWebinars);
  app.get("/webinar/:webinarId/", controller.getWebinarById);
  app.get("/pastwebinar/", controller.getPastWebinars);
  app.get("/upcomingwebinar/", controller.getUpcomingWebinar);

  // Top Speaker endpoints
  app.post("/topspeaker/", middleware.authenticate, controller.insertTopSpeaker);
  app.put("/topspeaker/:topSpeakerId", middleware.authenticate, controller.updateTopSpeaker);
  app.put("/topspeaker/delete/:topSpeakerId", middleware.authenticate, controller.deleteTopSpeaker);
  app.get("/topspeaker/:topSpeakerId/", controller.getTopSpeaker);
  app.get("/topspeaker/", controller.getTopSpeakers);
  
  // BoardMember endpoints
  app.put("/boardmember/:boardMemberId", middleware.authenticate, controller.updateBoardMemberDetails);
  app.put("/boardmember/delete/:boardMemberId", middleware.authenticate, controller.deleteBoardMemberDetails);
  app.get("/boardmember/:boardMemberId/", controller.getBoardMemberbyID);
  app.get("/boardmember/", controller.getAllBoardMembers);

  // ExecutiveBoard endpoints
  app.post("/executive/", middleware.authenticate, controller.insertExecutiveBoard);
  app.put("/boardmember/:executiveBoardId", middleware.authenticate, controller.addBoardMember);
  app.put("/executive/:executiveBoardId", middleware.authenticate, controller.updateExecutiveBoardDetails);
  app.put("/executive/delete/:executiveBoardId/", middleware.authenticate, controller.deleteExecutiveBoardDetails);
  app.get("/executive/:executiveBoardId/", controller.getExecutiveBoardbyID);
  app.get("/executive/", controller.getExecutiveBoard);
  
  // Application endpoints
  app.post("/application/", controller.addApplication);
  app.get("/application/:applicationId/", middleware.authenticate, controller.getApplicationById);
  app.get("/application/", middleware.authenticate, controller.getApplications);
  app.put("/application/delete/:applicationId", middleware.authenticate, controller.setApplicationArchive);
  app.put("/application/interview/:applicationId", middleware.authenticate, controller.changeApplicationStatusIntoInterview);
  app.put("/application/selected/:applicationId", middleware.authenticate, controller.changeApplicationStatusIntoSelected);
  app.put("/application/rejected/:applicationId", middleware.authenticate, controller.changeApplicationStatusIntoRejected);

}
