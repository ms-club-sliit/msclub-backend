import { Express } from "express";
import controller from "../controllers";
import middleware from "../middleware";

export default function (app: Express) {
  app.post("/user/", controller.createUser);
  /**
   * @todo implement the @routes for PastEventController
   */
  /**
   * @todo  implement the @routes for UpcomingEventController
   */
  /**
   * @todo  implement the @routes for PastWebinarController
   */
  /**
   * @todo  implement the @routes for UpcomingWebinarController
   */
  /**
   * @todo  implement the @routes for TopSpeakerController
   */
}
