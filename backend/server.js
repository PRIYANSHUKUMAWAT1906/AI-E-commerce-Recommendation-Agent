const express=require("express");
const productRoute=require("./routes/productroutes");
const userRoute=require("./routes/userRoutes");
const orderRoutes=require("./routes/orderRoutes");
const reviewRoutes=require("./routes/reviewRoutes");
const authRoutes=require("./routes/authRoutes")
const aiRoutes=require("./routes/aiRoutes");
const wishlistRoutes=require("./routes/wishlistRoutes")
const pool=require("./database/db")
const cors=require("cors");

const app=express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(express.json());
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
app.use("/api/ai",aiRoutes);
app.use("/api/user",userRoute);
app.use("/api/orders",orderRoutes);
app.use("/api/review",reviewRoutes);
app.use("/api/products", productRoute);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/auth",authRoutes);
app.get("/contact",(req,res)=>{
    res.send("welcome to contact");
});
app.get("/about",(req,res)=>{
    res.send("welcome to about");
});


app.listen(3000,()=>{
console.log("Server running on http://localhost:3000")
});
