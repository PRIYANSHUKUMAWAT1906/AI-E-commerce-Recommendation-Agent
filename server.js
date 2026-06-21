const express=require("express");
const productRoute=require("./routes/productroutes");
const userRoute=require("./routes/userRoutes");
const orderRoutes=require("./routes/orderRoutes");
const reviewRoutes=require("./routes/reviewRoutes");
const authRoutes=require("./routes/authRoutes")
const aiRoutes=require("./routes/aiRoutes");
const pool=require("./databse/db")
const app=express();
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
app.use("/user",userRoute);
app.use("/orders",orderRoutes);
app.use("/review",reviewRoutes);
app.use("/products", productRoute);
app.use("/auth",authRoutes);
app.get("/contact",(req,res)=>{
    res.send("welcome to contact");
});
app.get("/about",(req,res)=>{
    res.send("welcome to about");
});


app.listen(3000,()=>{
console.log("Server running on http://localhost:3000")
});
