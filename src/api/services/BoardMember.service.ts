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
import { IBoardMember, IUpdatedBy } from "../../interfaces";
import BoardMemberModel from "../models/BoardMember.model";

/**
 add a new Board Member to the database
 */
export const insertBoardMember = async (BoardMemberData: DocumentDefinition<IBoardMember>) => {
	return await BoardMemberModel.create(BoardMemberData)
		.then(async (boardMember) => {
			const initialUpdatedBy: IUpdatedBy = {
				user: boardMember.createdBy,
				updatedAt: new Date(),
			};
			boardMember.updatedBy.push(initialUpdatedBy);
			await boardMember.save();
			return boardMember;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
/**
 get the Board Memberby ID from the database
 * @param boardMemberId @type string
 */
export const getBoardMemberbyID = async (boardMemberId: string) => {
	return await BoardMemberModel.findById(boardMemberId)
		.then(async (boardMember) => {
			return boardMember;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
/**
 get all Board Memberbys from the database
 */
export const getAllBoardMembers = async () => {
	return await BoardMemberModel.find()
		.then(async (boardMembers) => {
			return boardMembers;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
/**
 update details of the member
 * @param boardMemberId @type string
 * @param updateData @type DocumentDefinition<IBoardMember>
 */

export const updateBoardMemberDetails = async (
	boardMemberId: string,
	updateData: DocumentDefinition<IBoardMember>,
	updatedBy: Schema.Types.ObjectId
) => {
	return await BoardMemberModel.findById(boardMemberId)
		.then(async (boardMemberDetails) => {
			if (boardMemberDetails) {
				if (!boardMemberDetails.deletedAt) {
					if (updateData.name) {
						boardMemberDetails.name = updateData.name;
					}
					if (updateData.position) {
						boardMemberDetails.position = updateData.position;
					}
					if (updateData.imageUrl) {
						boardMemberDetails.imageUrl = updateData.imageUrl;
					}
					if (updateData.socialMedia) {
						if (updateData.socialMedia.facebook) {
							boardMemberDetails.socialMedia.facebook = updateData.socialMedia.facebook;
						}
						if (updateData.socialMedia.instagram) {
							boardMemberDetails.socialMedia.instagram = updateData.socialMedia.instagram;
						}
						if (updateData.socialMedia.linkedIn) {
							boardMemberDetails.socialMedia.linkedIn = updateData.socialMedia.linkedIn;
						}
						if (updateData.socialMedia.twitter) {
							boardMemberDetails.socialMedia.twitter = updateData.socialMedia.twitter;
						}
					}
					const updateUserInfo: IUpdatedBy = {
						user: updatedBy,
						updatedAt: new Date(),
					};

					boardMemberDetails.updatedBy.push(updateUserInfo);
					return await boardMemberDetails.save();
				} else {
					throw new Error("Board Member is not found");
				}
			} else {
				return null;
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 delete member
 * @param boardMemberId @type string
 */
export const deleteBoardMemberDetails = async (boardMemberId: string, deletedBy: Schema.Types.ObjectId) => {
	return await BoardMemberModel.findById(boardMemberId)
		.then(async (boardMemberDetails) => {
			if (boardMemberDetails && boardMemberDetails.deletedAt === null) {
				boardMemberDetails.deletedAt = new Date();
				boardMemberDetails.deletedBy = deletedBy;
				return await boardMemberDetails.save();
			} else {
				return null;
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
