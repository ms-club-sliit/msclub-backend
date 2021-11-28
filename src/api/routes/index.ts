import { Express } from "express";
import controller from "../controllers";
import middleware from "../middleware";

export default function (app: Express) {
  /**
   * @todo implement the @routes for UserController
   */
  app.post("/user/", controller.createUser);
  app.post("/contact/", controller.createContact);

  /**
   * @todo implement the @routes for EventController
   */
  app.post("/event/", controller.insertEvent);
  app.get("/event/", controller.getEvents);
  app.get("/event/:eventId/", controller.getEvent);
  app.get("/pastevent/", controller.getPastEvents);
  app.get("/upcomingevent/", controller.getUpcomingEvent);
  app.put("/event/:eventId", controller.updateEvent);
  app.put("/event/delete/:eventId", controller.deleteEvent);
  /**
   * @todo  implement the @routes for WebinarController
   */
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
   * @todo  implement the @routes for ExecutiveBoardMemberController
   */
  app.post("/executive/", controller.insertExecutiveBoard);
  /**
   * @todo  implement the @routes for TopSpeakerController
   */
  /**
   * @todo  implement the @routes for ApplicationController
   */
}
