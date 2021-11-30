import { Express } from "express";
import controller from "../controllers";
import middleware from "../middleware";
import multer from 'multer';
const upload = multer();

export default function (app: Express) {
  // User endpoints
  app.post("/user/", upload.single('profileImage'), controller.createUser);
  app.post('/contact/', controller.createContact);

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
  /**
   * @todo  implement the @routes for BoardMemberController
   */
  /**
   * @todo  implement the @routes for TopSpeakerController
   */
  /**
   * @todo  implement the @routes for ApplicationController
   */
}
