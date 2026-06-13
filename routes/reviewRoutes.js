const express=require("express");
const router=express.Router();
const{
createReview,getProductReviews,getReviews,updateReview,deleteReview,getReviewById
}=require("../controllers/reviewcontroller");
router.get("/",getReviews);
router.post("/",createReview);
router.get("/products/:id",getProductReviews);
router.put("/:id", updateReview);
router.get("/:id", getReviewById);

router.delete("/:id", deleteReview);


module.exports=router;