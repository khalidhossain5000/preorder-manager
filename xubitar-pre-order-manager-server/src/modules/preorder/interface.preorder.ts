import { PreorderWhen, Status } from "../../../generated/prisma/enums";

export interface PreorderDataPayload {
  name: string;
  products: number;
  preorderWhen: "REGARDLESS_OF_STOCK" | "OUT_OF_STOCK";
  startsAt: string;
  endsAt?: string;
  status: "ACTIVE" | "INACTIVE";
}


export interface IPreOrderQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: 'All' | 'Active' | 'Inactive';
}



export type UpdatePreorderPayload = {
  name?: string;
  products?: number;
  preOrderWhen?: PreorderWhen;
  status?: Status;
  startsAt?: string;
  endsAt?: string | null;
};