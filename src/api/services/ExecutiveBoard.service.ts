import { DocumentDefinition, FilterQuery } from "mongoose";
import { IExecutiveBoard } from "../interfaces";
import { IBoardMember } from "../interfaces";
import ExecutiveBoardModel from "../models/ExecutiveBoard.model";
import BoardMemberModel from "../models/BoardMember.model";
import { insertBoardMember } from "../services/BoardMember.service";

/**
 * @todo create @function insertExecutiveBoard to add a new executive board to the database
 */
export const insertExecutiveBoard = async (
  executiveBoardData: DocumentDefinition<IExecutiveBoard>
) => {
  return await ExecutiveBoardModel.create(executiveBoardData)
    .then(async (executiveBoard) => {
      return executiveBoard;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
/**
 * @todo create @function getExecutiveBoardbyID to get the executive board by ID from the database (the details of the existing board members should be populated)
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
 * @todo create @function getExecutiveBoard to get all the executive boards from the database (the details of the existing board members should be populated)
 */
export const getExecutiveBoard = async () => {
  return await ExecutiveBoardModel.find()
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
 * @todo create @function addBoardMember to add members to executiveboard
 * @param boardId @type string
 * @param insertData @type DocumentDefinition<IBoardMember>
 */
export const addBoardMember = async (
  executiveBoardId: string,
  insertData: DocumentDefinition<IBoardMember>
) => {
  return await insertBoardMember(insertData)
    .then(async (createdBoardMember: IBoardMember) => {
      const executiveBoard = await ExecutiveBoardModel.findById(
        executiveBoardId
      );
      if (executiveBoard) {
        executiveBoard.board.unshift(createdBoardMember);
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
 * @todo create @function updateExecutiveBoardDetails to update details of members in the executiveboard
 * @param boardId @type string
 * @param updateData @type DocumentDefinition<IExecutiveBoard>
 */
export const updateExecutiveBoardDetails = async (
  boardId: string,
  updateData: DocumentDefinition<IExecutiveBoard>
) => {
  return await ExecutiveBoardModel.findById(boardId)
    .then(async (executiveBoardDetails) => {
      if (executiveBoardDetails) {
        executiveBoardDetails.year = updateData.year;
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
 * @todo create @function DeleteExecutiveBoardDetails to delete members from executiveboard
 * @param boardId @type string
 * @param boardMemberId @type string
 */
export const deleteExecutiveBoardDetails = async (boardId: string) => {
  return await ExecutiveBoardModel.findById(boardId)
    .then(async (executiveBoardDetails) => {
      if (executiveBoardDetails) {
        executiveBoardDetails.deletedAt = new Date();
        return await executiveBoardDetails.save();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
