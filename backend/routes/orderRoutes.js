const express=require("express");
const router=express.Router();
const {authMiddleware}=require("../middleware/authmiddleware");
const{adminMiddleware}=require("../middleware/adminmiddleware");
const{
 createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}=require("../controllers/ordercontroller")
router.get("/",authMiddleware, getOrders);

router.get("/:id",authMiddleware, getOrderById);
router.post("/",authMiddleware, createOrder);

router.put("/:id",authMiddleware,adminMiddleware, updateOrder);
router.delete("/:id", authMiddleware,adminMiddleware,deleteOrder);
module.exports=router;