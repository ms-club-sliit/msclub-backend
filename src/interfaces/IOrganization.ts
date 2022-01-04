import { IUpdatedBy } from ".";

interface IOrganization {
  name: string;
  email: string;
  phoneNumber?: string | null;
  university: string | null;
  address: string | null;
  website: string | null;
  updatedBy: IUpdatedBy[];
  imagePath: string;
}

export type { IOrganization };
