import { Express } from 'express';
import controller from '../controllers';
import middleware from '../middleware';

export default function (app: Express) {
  app.post('/user/', controller.createUser);
  app.post('/contact/', controller.createContact);
}