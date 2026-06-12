const pool=require("../databse/db");
const getProducts=async (req,res)=> {
    try{
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||5;
        const minprice=parseInt(req.query.minprice)||0;
        const maxprice=parseInt(req.query.maxprice)||2147483647;
        const {sort}=req.query;
        const offset=(page-1)*limit;
        let result;
        if(sort==="price_desc"){
     result=await pool.query(
        "SELECT * FROM products WHERE price BETWEEN $1 AND $2  ORDER BY price DESC LIMIT $3 OFFSET $4",
        [minprice,maxprice,limit,offset]
    );}
    else if(sort==="price_asc"){
     result=await pool.query(
        "SELECT * FROM products WHERE price BETWEEN $1 AND $2  ORDER BY price ASC LIMIT $3 OFFSET $4",
        [minprice,maxprice,limit,offset]
    );}
    else{
      result=await pool.query(
        "SELECT * FROM products WHERE price BETWEEN $1 AND $2 LIMIT $3 OFFSET $4 ",
        [minprice,maxprice,limit,offset]
    );   
    }
        res.status(200).json(result.rows);
    }
    
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"internal server error"
        }            
        );
    }
};

const Createproducts= async(req,res)=>{
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

const getProductbyid=async(req,res)=>{
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
const searchProduct=async (req,res)=>{
    try{
        const {name}=req.query;
        if(!name){
    return res.status(400).json({
        message:"name query parameter required"
    });
}
        const result=await pool.query(
            "SELECT *FROM products WHERE name ILIKE $1",
            [`%${name}%`]
        );
        res.status(200).json(result.rows);
    }
    catch(error){
        res.status(500).json({
            error:error.message
        });
    }
}
module.exports={getProducts,Createproducts,getProductbyid,updateProduct,deleteProduct,searchProduct};