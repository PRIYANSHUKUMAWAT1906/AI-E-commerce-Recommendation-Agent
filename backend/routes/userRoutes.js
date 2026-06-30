const express=require("express");
const router=express.Router();
const{
getuser,getuserByid,getUserOrders,createUser,updateUser,deleteUser,getAllUsers,adminCheck
}=require("../controllers/usercontroller");
const {authMiddleware}=require("../middleware/authmiddleware");
const{adminMiddleware}=require("../middleware/adminmiddleware");
router.get("/",authMiddleware,getuser);
router.post("/",createUser);
router.put("/",updateUser);
router.delete("/",deleteUser);
router.get("/admin",authMiddleware,adminMiddleware,adminCheck);
router.get("/alluser",authMiddleware,adminMiddleware,getAllUsers);
router.get("/myorders",authMiddleware,getUserOrders)
router.get("/:id",getuserByid);
module.exports=router;