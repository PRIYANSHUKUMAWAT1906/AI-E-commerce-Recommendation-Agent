const{
    chatcontroller,recommendProducts,personalizedRecommendation,
reviewSummaryController,compareProductsController,shoppingAssistantController
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
router.post(
    "/compare",
    compareProductsController
);
router.get(
    "/review-summary/:productId",
    reviewSummaryController
);
router.post(
    "/shopping-assistant",
    shoppingAssistantController
);
module.exports=router;