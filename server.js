const express=require("express");
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

app.get("/products",async(req,res)=>{
   try {
    const result=await pool.query(
        "SELECT * FROM products"
    );
    res.json(result.rows);
   }
   catch(error){
   res.status(500).json({
    message:"server error"
   });
   }
});


app.post("/products",async(req,res)=>{
    if(!req.body){
        return res.status(400).json({
            message:"body is missing"
        })
    }
    const {name,price}=req.body;
     if(!name||!price){
       return  res.status(400).json({
        message:"name and price is missing"
       })}
    try{const result =await pool.query(
        "INSERT into products(name,price) Values($1,$2) RETURNING *",
        [name,price]
    );
   
    
    res.status(201).json(result.rows[0]);
    }

catch(error){
res.status(500).json({
    message:"server error"
})
}});

app.get("/contact",(req,res)=>{
    res.send("welcome to contact");
});
app.get("/about",(req,res)=>{
    res.send("welcome to about");
});


app.get("/products/:id",async(req,res)=>{
    const id=parseInt(req.params.id);
    try{
        const result=await pool.query(
            "SELECT *FROM products WHERE id=$1",
            [id]
        );
        if(result.rows.length===0){
return res.status(404).json({
    message:"product not found",
});
        }
        res.json(result.rows[0]);
    }
    catch(error){
        res.status(500).json({
            message:"server error"
        });
    }
});

app.put("/products/:id",async(req,res)=>{
    const id=parseInt(req.params.id);
    const {name,price}=req.body;
if(!name||!price){
   return res.status(400).json(
        {message:"name and price are required"}
    );
}
try{
    const result =await pool.query(
        `UPDATE products
        SET name=$1,price=$2
        WHERE id=$3
        RETURNING*`,
        [name,price,id]
    );
    if(result.rows.length===0){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    res.json(result.rows[0]);
}
catch(error){
    res.status(500).json({
        message:"server error"
    })
}
});
app.delete("/products/:id",async(req,res)=>{
    const id=parseInt(req.params.id);
    try{
        const result=await pool.query(
            "DELETE FROM products WHERE id=$1 RETURNING *",
            [id]
        )
        if(result.rows.length===0){
           return  res.status(404).json({
                message:"product not found"
            })
        }
        res.json({
          message:"product got deleted"
        })
    }
    catch(error){
        res.status(500).json({
            message:"server error"
        })
    }
});

app.listen(3000,()=>{
console.log("Server running on http://localhost:3000")
});
