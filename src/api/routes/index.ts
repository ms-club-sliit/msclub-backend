import { Express } from "express";
import controller from "../controllers";
import middleware from "../middleware";
import multer from "multer";
const upload = multer();

export default function (app: Express) {
  // User endpoints
  app.post("/user/", upload.single('profileImage'), controller.createUser);

  // Contact Us endpoints
  app.post('/contact/', controller.createContact);
  app.get('/contact/', controller.getAllContacts);
  app.delete('/contact/:contactId', controller.removeContact);

  // Event endpoints
  app.post("/event/", controller.insertEvent);
  app.get("/event/", controller.getEvents);
  app.get("/event/:eventId/", controller.getEvent);
  app.get("/pastevent/", controller.getPastEvents);
  app.get("/upcomingevent/", controller.getUpcomingEvent);
  app.put("/event/:eventId", controller.updateEvent);
  app.put("/event/delete/:eventId", controller.deleteEvent);

  // Webinar endpoints
  app.post("/webinar/", controller.insertWebinar);
  app.get("/webinar/", controller.getWebinars);
  app.get("/webinar/:webinarId/", controller.getWebinarById);
  app.get("/pastwebinar/", controller.getPastWebinars);
  app.get("/upcomingwebinar/", controller.getUpcomingWebinar);
  app.put("/webinar/:webinarId", controller.updateWebinar);
  app.put("/webinar/delete/:webinarId", controller.deleteWebinar);

  // Top Speaker endpoints
  app.post("/topspeaker/", controller.insertTopSpeaker);
  app.get("/topspeaker/:topSpeakerId/", controller.getTopSpeaker);
  app.get("/topspeaker/", controller.getTopSpeakers);
  app.put("/topspeaker/:topSpeakerId", controller.updateTopSpeaker);
  app.put("/topspeaker/delete/:topSpeakerId", controller.deleteTopSpeaker);

  // BoardMember endpoints
  app.get("/boardmember/:boardMemberId/", controller.getBoardMemberbyID);
  app.get("/boardmember/", controller.getAllBoardMembers);
  app.put("/boardmember/:boardMemberId", controller.updateBoardMemberDetails);
  app.put(
    "/boardmember/delete/:boardMemberId",
    controller.deleteBoardMemberDetails
  );

  // ExecutiveBoard endpoints
  app.post("/executive/", controller.insertExecutiveBoard);
  app.get("/executive/:executiveBoardId/", controller.getExecutiveBoardbyID);
  app.get("/executive/", controller.getExecutiveBoard);
  app.put("/boardmember/:executiveBoardId", controller.addBoardMember);
  app.put(
    "/executive/:executiveBoardId",
    controller.updateExecutiveBoardDetails
  );
  app.put(
    "/executive/delete/:executiveBoardId/",
    controller.deleteExecutiveBoardDetails
  );
  /**
   * @todo  implement the @routes for TopSpeakerController
   */

  // Application endpoints
  app.post("/application/", controller.addApplication);
  app.get("/application/:applicationId/", controller.getApplicationById);
  app.get("/application/", controller.getApplications);
  app.delete("/application/:applicationId", controller.setApplicationArchive);
}
