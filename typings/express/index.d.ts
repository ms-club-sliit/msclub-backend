declare module Express {
  export interface Request {
    handleResponse: {
      successRespond(response: Response):(data: any) => Response;
      notFoundRespond(response: Response):(data: any) => Response;
      errorRespond(response: Response):(error: any) => Response;
      unauthorizedRespond(response: Response):(data: any) => Response;
    };
    authToken: any;
    user: any;
  };
}