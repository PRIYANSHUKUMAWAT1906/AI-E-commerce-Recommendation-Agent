const express=require("express");
const router=express.Router();
const{
createReview,getProductReviews,getReviews,updateReview,deleteReview,getReviewById
}=require("../controllers/reviewcontroller");
const {authMiddleware}=require("../middleware/authmiddleware");
const{adminMiddleware}=require("../middleware/adminmiddleware");
router.get("/",getReviews);
router.post("/",authMiddleware,createReview);
router.get("/products/:id",getProductReviews);
router.put("/:id",authMiddleware, updateReview);
router.get("/:id",authMiddleware, getReviewById);

router.delete("/:id",authMiddleware, deleteReview);


module.exports=router;