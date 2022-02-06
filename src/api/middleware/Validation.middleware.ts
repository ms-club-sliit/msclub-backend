import { Request, Response, NextFunction } from "express";

const validateRequest = (schema: any) => {
	return async (request: Request, response: Response, next: NextFunction) => {
		try {
			await schema.validate(request.body);
			next();
		} catch (error: any) {
			request.handleResponse.errorRespond(response)(error.message);
		}
	};
};

export { validateRequest };
