declare module Express {
  export interface Request {
    handleResponse: any;
    authToken: any;
    user: any;
  };
}