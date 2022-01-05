import { Response } from "express";

const successRespond = (response: Response, status = 201) => {
	return function (data: any) {
		if (!data) {
			return response.status(204).json({ status: 204, message: "Not Found" });
		}
		return response.status(status).json(data);
	};
};

const notFoundRespond = (response: Response) => {
	return function (data: any) {
		if (!data) {
			return response.status(204).json({ status: 204, message: "Not Found" });
		}
		return response.status(404).json({ status: 404, details: "Not Found" });
	};
};

const errorRespond = (response: Response) => {
	return function (error: any) {
		return response.status(400).json({ status: 400, details: error });
	};
};

const unauthorizedRespond = (response: Response) => {
	return function (data: any) {
		if (!data) {
			return response.status(204).json({ status: 204, message: "Not Found" });
		}
		return response.status(401).json({ details: data });
	};
};

export default { successRespond, notFoundRespond, errorRespond, unauthorizedRespond };
