const express=require("express");
const products=require("./data/products");
const pool=require("./databse/db")
const app=express();
async function testdb() {
    try{
        const result=await pool.query("Select Now()");
        console.log("database connected");
        console.log(result.rows);
    }
    catch(error){
        console.log(error.message);
    }
}
testdb();

app.get("/",(req,res)=>{
res.send("Welcome to AI ecommerce agent");
});
app.get("/products",(req,res)=>{
    const maxPrice=parseInt(req.query.maxPrice);
    if(maxPrice){
        const filterproducts=products.filter(
            product=>product.price<=maxPrice
        );
        return res.json(filterproducts);
    }
    res.json(products);
});
app.get("/contact",(req,res)=>{
    res.send("welcome to contact");
});
app.get("/about",(req,res)=>{
    res.send("welcome to about");
});
app.get("/products/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const product=products.find(
        product=>product.id===id
    )
if(!product){
    return res.status(404).json({
        message:"product not found",
    })
}
    res.json(product);
});
app.listen(3000,()=>{
console.log("Server running on http://localhost:3000")
});
