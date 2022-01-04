import { subscribeMessages } from "./email.queue";
import Handlebars from "handlebars";
import fs from "fs";
import logger from "../util/logger";
import moment from "moment";
import fetch from "cross-fetch";
import { Channel } from "amqplib";
