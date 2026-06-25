const{
    chatcontroller,recommendProducts,personalizedRecommendation
}=require("../controllers/aicontroller");
const {authMiddleware}=require("../middleware/authmiddleware")
const express=require("express");
const router=express.Router();
router.post("/chat",chatcontroller);
router.post("/recommend",recommendProducts);
router.get(
    "/personalized",
    authMiddleware,
    personalizedRecommendation
);
module.exports=router;