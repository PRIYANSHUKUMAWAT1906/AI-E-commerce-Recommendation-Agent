const express=require("express");
const router=express.Router();
const {addToWishlist,getWishlist,removeWishlist
}=require("../controllers/wishlistcontroller");
const {authMiddleware}=require("../middleware/authmiddleware");
const{adminMiddleware}=require("../middleware/adminmiddleware");
router.post("/", authMiddleware, addToWishlist);
router.get("/", authMiddleware, getWishlist);
router.delete("/:id", authMiddleware, removeWishlist);
module.exports=router;