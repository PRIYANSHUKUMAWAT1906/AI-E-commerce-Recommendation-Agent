const{
    chatcontroller
}=require("../controllers/aicontroller");
const express=require("express");
const router=express.Router();
router.post("/chat",chatcontroller);
module.exports=router;