const express=require("express");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {Createproducts}=require("../controllers/productcontroller");
const router=express.Router();
const {authMiddleware}=require("../middleware/authmiddleware");
const{adminMiddleware}=require("../middleware/adminmiddleware");
const {
    getprofile,signuprofile,
    loginuser
}=require("../controllers/authcontorller");

router.get(
    "/profile",
    authMiddleware,
    getprofile
);
router.post(
    "/register",
    signuprofile
);

router.post(
    "/login",
    loginuser
);
router.get(
    "/admin/profile",
    authMiddleware,
    adminMiddleware,
getprofile
);
module.exports=router;
