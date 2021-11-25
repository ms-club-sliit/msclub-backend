import { Express } from "express";
import controller from "../controllers";
import middleware from "../middleware";

export default function (app: Express) {
  app.post("/user/", controller.createUser);
  /**
   * @todo implement the @routes for EventController
   */
  /**
   * @todo  implement the @routes for WebinarController
   */
  /**
   * @todo  implement the @routes for TopSpeakerController
   */
}
