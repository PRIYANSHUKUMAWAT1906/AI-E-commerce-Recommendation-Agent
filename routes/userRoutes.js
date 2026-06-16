const express=require("express");
const router=express.Router();
const{
getuser,getuserByid,getUserOrders,createUser,updateUser,deleteUser
}=require("../controllers/usercontroller");
const {authMiddleware}=require("../middleware/authmiddleware");
const{adminMiddleware}=require("../middleware/adminmiddleware");
router.get("/",authMiddleware,adminMiddleware,getuser);
router.post("/",createUser);
router.put("/",updateUser);
router.delete("/",deleteUser);
router.get("/:id/orders",authMiddleware,getUserOrders)
router.get("/:id",getuserByid);
module.exports=router;