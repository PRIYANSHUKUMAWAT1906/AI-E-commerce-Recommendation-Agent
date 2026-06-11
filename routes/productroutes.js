const express=require("express");
const router=express.Router();
const {
    getProducts,Postproducts,getidProduct,updateProduct,deleteProduct
}=require("../controllers/productcontroller");
router.get("/",getProducts);
router.post("/",Postproducts);
router.get("/:id",getidProduct);

router.put("/:id",updateProduct);

router.delete("/:id",deleteProduct);
module.exports=router;