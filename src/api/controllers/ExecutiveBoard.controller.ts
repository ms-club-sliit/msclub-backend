import { Request, Response, NextFunction } from "express";
import ExecutiveBoardService from "../services";
import ImageService from "../../util/image.handler";

/**
 * @param request
 * @param response
 * @param next
 * @returns void
 */
export const insertExecutiveBoard = async (request: Request, response: Response, next: NextFunction) => {
	request.body.createdBy = request.user && request.user._id ? request.user._id : null;
	await ExecutiveBoardService.insertExecutiveBoard(request.body)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};
/**
 * @param request
 * @param response
 * @param next
 * @returns DocumentDefinition<IExecutiveBoard>
 */
export const getExecutiveBoardbyID = async (request: Request, response: Response, next: NextFunction) => {
	const executiveBoardId = request.params.executiveBoardId;
	if (executiveBoardId) {
		await ExecutiveBoardService.getExecutiveBoardbyID(request.params.executiveBoardId)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("Executive board ID not found");
	}
};
/**
 * @param request
 * @param response
 * @param next
 * @returns [DocumentDefinition<IExecutiveBoard>]
 */
export const getExecutiveBoard = async (request: Request, response: Response, next: NextFunction) => {
	await ExecutiveBoardService.getExecutiveBoard()
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};
/**
 * @param request
 * @param response
 * @param next
 * @returns new Board member
 */
export const addBoardMember = async (request: Request, response: Response, next: NextFunction) => {
	if (request.file) {
		const bucketDirectoryName = "boardmember-flyers";

		const boardMemberFlyerPath = await ImageService.uploadImage(request.file, bucketDirectoryName);
		request.body.imageUrl = boardMemberFlyerPath;
	}
	request.body.createdBy = request.user && request.user._id ? request.user._id : null;
	const executiveBoardId = request.params.executiveBoardId;
	const updatedBy = request.user && request.user._id ? request.user._id : null;
	if (executiveBoardId) {
		await ExecutiveBoardService.addBoardMember(request.params.executiveBoardId, request.body, updatedBy)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("Executive Board Id not found");
	}
};
/**
 * @param request
 * @param response
 * @param next
 * @returns updated ExecutiveBoard member
 */
export const updateExecutiveBoardDetails = async (request: Request, response: Response, next: NextFunction) => {
	const executiveBoardId = request.params.executiveBoardId;
	const updatedBy = request.user && request.user._id ? request.user._id : null;

	if (executiveBoardId) {
		await ExecutiveBoardService.updateExecutiveBoardDetails(request.params.executiveBoardId, request.body, updatedBy)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("Executive board ID not found");
	}
};
/**
 * @param request
 * @param response
 * @param next
 * @returns deleted ExecutiveBoard member
 */
export const deleteExecutiveBoardDetails = async (request: Request, response: Response, next: NextFunction) => {
	const executiveBoardId = request.params.executiveBoardId;
	const deletedBy = request.user && request.user._id ? request.user._id : null;

	if (executiveBoardId) {
		await ExecutiveBoardService.deleteExecutiveBoardDetails(request.params.executiveBoardId, deletedBy)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("Executive board ID not found");
	}
};
