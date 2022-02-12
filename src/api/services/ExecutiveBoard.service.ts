/*
 * Created on Sat Feb 12 2022
 *
 * The GNU General Public License v3.0
 * Copyright (c) 2022 MS Club SLIIT Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program at
 *
 *     https://www.gnu.org/licenses/
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */

import { DocumentDefinition, Schema } from "mongoose";
import { IExecutiveBoard, IBoardMember, IUpdatedBy } from "../../interfaces";
import ExecutiveBoardModel from "../models/ExecutiveBoard.model";
import { insertBoardMember } from "../services/BoardMember.service";

/**
 add a new executive board to the database
 */
export const insertExecutiveBoard = async (executiveBoardData: DocumentDefinition<IExecutiveBoard>) => {
	return await ExecutiveBoardModel.create(executiveBoardData)
		.then(async (executiveBoard) => {
			const initialUpdatedBy: IUpdatedBy = {
				user: executiveBoard.createdBy,
				updatedAt: new Date(),
			};
			executiveBoard.updatedBy.push(initialUpdatedBy);
			await executiveBoard.save();
			return executiveBoard;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
/**
get the executive board by ID from the database (the details of the existing board members should be populated)
 * @param executiveBoardId @type string
 */
export const getExecutiveBoardbyID = async (executiveBoardId: string) => {
	return await ExecutiveBoardModel.findById(executiveBoardId)
		.populate({ path: "board", match: { deletedAt: null } })
		.then(async (executiveBoard) => {
			return executiveBoard;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
/**
get all the executive boards from the database (the details of the existing board members should be populated)
 */
export const getExecutiveBoard = async () => {
	return await ExecutiveBoardModel.find({ deletedAt: null })
		.populate({
			path: "board",
			match: { deletedAt: null },
		})
		.then(async (executiveBoards) => {
			return executiveBoards;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
/**
 add members to executiveboard
 * @param boardId @type string
 * @param insertData @type DocumentDefinition<IBoardMember>
 */
export const addBoardMember = async (
	executiveBoardId: string,
	insertData: DocumentDefinition<IBoardMember>,
	updatedBy: Schema.Types.ObjectId
) => {
	return await insertBoardMember(insertData)
		.then(async (createdBoardMember: IBoardMember) => {
			const executiveBoard = await ExecutiveBoardModel.findById(executiveBoardId);
			if (executiveBoard) {
				executiveBoard.board.unshift(createdBoardMember);
				const updateUserInfo: IUpdatedBy = {
					user: updatedBy,
					updatedAt: new Date(),
				};
				executiveBoard.updatedBy.push(updateUserInfo);
				return await executiveBoard.save();
			} else {
				return null;
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 update details of members in the executiveboard
 * @param boardId @type string
 * @param updateData @type DocumentDefinition<IExecutiveBoard>
 */
export const updateExecutiveBoardDetails = async (
	boardId: string,
	updateData: DocumentDefinition<IExecutiveBoard>,
	updatedBy: Schema.Types.ObjectId
) => {
	return await ExecutiveBoardModel.findById(boardId)
		.then(async (executiveBoardDetails) => {
			if (executiveBoardDetails) {
				executiveBoardDetails.year = updateData.year;
				const updateUserInfo: IUpdatedBy = {
					user: updatedBy,
					updatedAt: new Date(),
				};

				executiveBoardDetails.updatedBy.push(updateUserInfo);
				return await executiveBoardDetails.save();
			} else {
				return null;
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
/**
 delete members from executiveboard
 * @param boardId @type string
 * @param boardMemberId @type string
 */
export const deleteExecutiveBoardDetails = async (boardId: string, deletedBy: Schema.Types.ObjectId) => {
	return await ExecutiveBoardModel.findById(boardId)
		.then(async (executiveBoardDetails) => {
			if (executiveBoardDetails && executiveBoardDetails.deletedAt === null) {
				executiveBoardDetails.deletedAt = new Date();
				executiveBoardDetails.deletedBy = deletedBy;
				return await executiveBoardDetails.save();
			} else {
				return null;
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
