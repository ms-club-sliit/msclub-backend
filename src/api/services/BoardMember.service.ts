import { DocumentDefinition, FilterQuery } from "mongoose";
import { IBoardMember } from "../interfaces";
import BoardMemberModel from "../models/BoardMember.model";

/**
 * @todo create @function insertBoardMember to add a new Board Member to the database
 */
export const insertBoardMember = async (
  BoardMemberData: DocumentDefinition<IBoardMember>
) => {
  return await BoardMemberModel.create(BoardMemberData)
    .then(async (boardMember) => {
      return boardMember;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * @todo create @function getBoardMemberbyID to get the Board Memberby ID from the database
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
 * @todo create @function getAllBoardMembers to get all Board Memberbys from the database
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
 * @todo create @function updateBoardMemberDetails to update details of the member
 * @param boardMemberId @type string
 * @param updateData @type DocumentDefinition<IBoardMember>
 */

export const updateBoardMemberDetails = async (
  boardMemberId: string,
  updateData: DocumentDefinition<IBoardMember>
) => {
  return await BoardMemberModel.findById(boardMemberId)
    .then(async (boardMemberDetails) => {
      if (boardMemberDetails) {
        if (boardMemberDetails.deletedAt === null) {
          if (updateData.name !== "") {
            boardMemberDetails.name = updateData.name;
          }
          if (updateData.position !== "") {
            boardMemberDetails.position = updateData.position;
          }
          if (updateData.image !== "") {
            boardMemberDetails.image = updateData.image;
          }
          if (updateData.socialMedia.facebook !== "") {
            boardMemberDetails.socialMedia.facebook =
              updateData.socialMedia.facebook;
          }
          if (updateData.socialMedia.instagram !== "") {
            boardMemberDetails.socialMedia.instagram =
              updateData.socialMedia.instagram;
          }
          if (updateData.socialMedia.linkedIn !== "") {
            boardMemberDetails.socialMedia.linkedIn =
              updateData.socialMedia.linkedIn;
          }
          if (updateData.socialMedia.twitter !== "") {
            boardMemberDetails.socialMedia.twitter = updateData.socialMedia.twitter;
          }
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
 * @todo create @function deleteBoardMemberDetails to delete member
 * @param boardMemberId @type string
 */
export const deleteBoardMemberDetails = async (boardMemberId: string) => {
  return await BoardMemberModel.findById(boardMemberId)
    .then(async (boardMemberDetails) => {
      if (boardMemberDetails) {
        boardMemberDetails.deletedAt = new Date();
        return await boardMemberDetails.save();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
