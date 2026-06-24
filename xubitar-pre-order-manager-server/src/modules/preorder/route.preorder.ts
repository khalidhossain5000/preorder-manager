import { Router } from "express";
import { preOrderController } from "./controller.preorder";

const router=Router()

router.post("/create",preOrderController.createPreOrder)

//get all preorder with paginatio filter sort
router.get("/",preOrderController.getAllPreOrder)

//get single data for update field default show
router.get("/:id",preOrderController.getSinglePreOrder)

//update status on switch button
router.patch("/update-status/:id/status",preOrderController.updateStatus)

//update preorder
router.put("/update-preorder/:id",preOrderController.updatePreorder)
//delete preorder
router.delete("/delete/:id",preOrderController.deletePreOrder)


export default router