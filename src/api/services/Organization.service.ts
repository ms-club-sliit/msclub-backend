import OrganizationModel from "../models/Organization.model";
import { DocumentDefinition, Schema } from "mongoose";
import { IOrganization, IUpdatedBy } from "../../interfaces";

// Insert the organization information
export const createOrganization = async (
	organizationData: DocumentDefinition<IOrganization>,
	user: Schema.Types.ObjectId
) => {
	return OrganizationModel.create(organizationData)
		.then(async (organization) => {
			const initialUpdatedBy: IUpdatedBy = {
				user: user,
				updatedAt: new Date(),
			};
			organization.updatedBy.push(initialUpdatedBy);
			return await organization.save();
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get organization information for dashboard
export const getOrganizationInfo = async () => {
	return OrganizationModel.findOne()
		.select("name email phoneNumber address website university imagePath")
		.then((organization) => {
			return organization;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get organization information for admin
export const getOrganizationInfoForAdmin = async () => {
	return OrganizationModel.findOne()
		.populate({
			path: "updatedBy",
			populate: {
				path: "user",
				select: "firstName lastName email permissionLevel profileImage",
			},
			select: "updatedAt",
		})
		.then((organization) => {
			return organization;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Update organization information
export const updateOrganizationInfo = async (
	organizationId: string,
	updateInfo: DocumentDefinition<IOrganization>,
	user: Schema.Types.ObjectId
) => {
	if (organizationId) {
		return OrganizationModel.findById(organizationId)
			.then(async (organization) => {
				if (organization) {
					if (updateInfo.name) organization.name = updateInfo.name;
					if (updateInfo.email) organization.email = updateInfo.email;
					if (updateInfo.phoneNumber) organization.phoneNumber = updateInfo.phoneNumber;
					if (updateInfo.university) organization.university = updateInfo.university;
					if (updateInfo.address) organization.address = updateInfo.address;
					if (updateInfo.website) organization.website = updateInfo.website;
					if (updateInfo.imagePath) organization.website = updateInfo.imagePath;

					const updateUserInfo: IUpdatedBy = {
						user: user,
						updatedAt: new Date(),
					};
					organization.updatedBy.push(updateUserInfo);
					return await organization.save();
				}
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	} else {
		throw new Error("Organization ID not Passed");
	}
};
