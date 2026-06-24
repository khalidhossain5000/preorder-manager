import { prisma } from "../../lib/prisma";
import {
  IPreOrderQuery,
  PreorderDataPayload,
  UpdatePreorderPayload,
} from "./interface.preorder";
const createPreOrderInDb = async (payload: PreorderDataPayload) => {
  const result = await prisma.preOrder.create({
    data: {
      name: payload.name,
      products: payload.products,
      preOrderWhen: payload.preorderWhen,
      startsAt: new Date(payload.startsAt),
      endsAt: payload.endsAt ? new Date(payload.endsAt) : null,
      status: payload.status,
    },
  });
  return result;
};

//get
const getPreOrderFromDb = async (query: IPreOrderQuery) => {
  //pagination
  const page = Number(query.page);
  const limit = Number(query.limit);
  const skip = (page - 1) * limit;

  //sort
  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder || "desc";

  const whereCondition: any = {};

 
if (query.filter === "Active") {
  whereCondition.status = "ACTIVE";
} else if (query.filter === "Inactive") {
  whereCondition.status = "INACTIVE";
}
  //data fetch
  const result = await prisma.preOrder.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.preOrder.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: result,
  };
};

//get single pre order
const getSinglePreOrderFromDb = async (id: string) => {
  const result = await prisma.preOrder.findUnique({
    where: { id },
  });
  return result;
};

//update staus

const updateStatusinDb = async (id: string) => {
  const isExist = await prisma.preOrder.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw {
      statusCode: 404,
      message: "PreOrder Is Not Found.",
    };
  }
  const newStatus = isExist.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  const updated = await prisma.preOrder.update({
    where: { id },
    data: {
      status: newStatus,
    },
  });

  return updated;
};

//update form
const updatePreorderInDb = async (
  id: string,
  payload: Partial<UpdatePreorderPayload>,
) => {
  const result = await prisma.preOrder.update({
    where: { id },
    data: {
      ...payload,
      startsAt: payload.startsAt
        ? new Date(payload.startsAt as string)
        : undefined,

      endsAt:
        payload.endsAt === null
          ? null
          : payload.endsAt
            ? new Date(payload.endsAt as string)
            : undefined,
    },
  });

  return result;
};

//delete

const deleteOrderFromDb = async (id: string) => {
  const isExist = await prisma.preOrder.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw {
      statusCode: 404,
      message: "PreOrder not found",
    };
  }

  const deleted = await prisma.preOrder.delete({
    where: { id },
  });

  return deleted;
};

export const preorderServices = {
  createPreOrderInDb,
  getPreOrderFromDb,
  updateStatusinDb,
  deleteOrderFromDb,
  getSinglePreOrderFromDb,
  updatePreorderInDb,
};
