const express=require("express");
const router=express.Router();
const{
getuser,getuserByid,getUserOrders,createUser,updateUser,deleteUser
}=require("../controllers/usercontroller");
router.get("/",getuser);
router.post("/",createUser);
router.put("/",updateUser);
router.delete("/",deleteUser);
router.get("/:id/orders",getUserOrders)
router.get("/:id",getuserByid);
module.exports=router;