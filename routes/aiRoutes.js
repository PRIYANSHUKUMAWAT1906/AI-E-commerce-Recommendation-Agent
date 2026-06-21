const{
    chatcontroller,recommendProducts
}=require("../controllers/aicontroller");
const express=require("express");
const router=express.Router();
router.post("/chat",chatcontroller);
router.post("/recommend",recommendProducts)
module.exports=router;