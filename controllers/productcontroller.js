const pool=require("../databse/db");
const getProducts=async (req,res)=> {
    try{
    const result=await pool.query(
        "SELECT * FROM products"
    )
        res.json(result.rows);
    }
    
    catch(error){
        res.status(500).json({
            message:"internal server error"
        }            
        );
    }
};

const Postproducts= async(req,res)=>{
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
}};

const getidProduct=async(req,res)=>{
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
};
const updateProduct=async(req,res)=>{
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
};
const deleteProduct=async(req,res)=>{
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
};
module.exports={getProducts,Postproducts,getidProduct,updateProduct,deleteProduct};