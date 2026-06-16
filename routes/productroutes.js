const express=require("express");
const router=express.Router();
const {
    getProducts,Createproducts,getProductbyid,updateProduct,deleteProduct,searchProduct,getproductWithcategory
}=require("../controllers/productcontroller");
const {authMiddleware}=require("../middleware/authmiddleware");
const{adminMiddleware}=require("../middleware/adminmiddleware");
router.get("/",getProducts);
router.post("/",authMiddleware,adminMiddleware,Createproducts);
router.get("/with-category",authMiddleware,getproductWithcategory);
router.get("/search",searchProduct);
router.get("/:id",getProductbyid);

router.put("/:id",authMiddleware,adminMiddleware,updateProduct);

router.delete("/:id",authMiddleware,adminMiddleware,deleteProduct);

module.exports=router;