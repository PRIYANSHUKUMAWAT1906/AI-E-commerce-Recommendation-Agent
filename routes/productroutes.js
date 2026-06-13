const express=require("express");
const router=express.Router();
const {
    getProducts,Createproducts,getProductbyid,updateProduct,deleteProduct,searchProduct,getproductWithcategory
}=require("../controllers/productcontroller");
router.get("/",getProducts);
router.post("/",Createproducts);
router.get("/with-category",getproductWithcategory);
router.get("/search",searchProduct);
router.get("/:id",getProductbyid);

router.put("/:id",updateProduct);

router.delete("/:id",deleteProduct);

module.exports=router;