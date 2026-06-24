import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { preorderServices } from "./service.preorder";

const createPreOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    console.log(payload, "this is payload");

    await preorderServices.createPreOrderInDb(payload);

    return sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Pre Order Created Successfully",
    });
  } catch (error: any) {
    console.log(error, "error in create pre order controller");
    sendResponse(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message,
    });
  }
};

//get all pre order here

const getAllPreOrder = async (req: Request, res: Response) => {
  try {
    const result = await preorderServices.getPreOrderFromDb(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Data Retrived Successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.log(error, "error in get pre order controller");
    sendResponse(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message,
    });
  }
};


//get signle pre order



const getSinglePreOrder = async (req: Request, res: Response) => {
  try {
    const {id}=req.params
    console.log(id,'this is id')
    const result = await preorderServices.getSinglePreOrderFromDb(id as string)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Data Retrived Successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.log(error, "error in get pre order controller");
    sendResponse(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message,
    });
  }
};









//update status
const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await preorderServices.updateStatusinDb(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "PreOrder status updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error, "error in udpate controller");
    sendResponse(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message,
    });
  }
};



//delete order

const deletePreOrder=async(req:Request,res:Response)=>{
  try {
     const { id } = req.params;

    const result = await preorderServices.deleteOrderFromDb(id as string) ;

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "PreOrder deleted successfully",
      data: result,
    });
  }  catch (error: any) {
    console.log(error, "error in deletePreOrder controller");
    sendResponse(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message,
    });
  }
}


//update preorder

const updatePreorder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body; // Extracting updated fields from request body

    // Passing both id and payload to the service layer
    const result = await preorderServices.updatePreorderInDb(id as string, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "PreOrder updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error, "error in update controller");
    sendResponse(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message,
    });
  }
};




export const preOrderController = {
  createPreOrder,
  getAllPreOrder,
  updateStatus,
  deletePreOrder,
  getSinglePreOrder,
  updatePreorder
};
