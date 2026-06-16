const pool=require("../databse/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getprofile=(req,res)=>{
    res.status(200).json({
        message:"profile fetched successfully",
        user:req.user
    })};

    const signuprofile=async(req,res)=>{
        try{
            const{name,email,password}=req.body;
            if(!name||!email||!password){
                return res.status(400).json({message:'ALL fields are required'});
                }
     const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
);
     if(existingUser.rows.length>0){
return res.status(400).json({message:"profile already exist"});
     };
     const hashedpassword=await bcrypt.hash(password,10);
   const result = await pool.query(
    `
    INSERT INTO users
    (name,email,password)
    VALUES($1,$2,$3)
    RETURNING *
    `,
    [name,email,hashedpassword]
);
     res.status(201).json({message:"user sucessfully created",
        user:result.rows[0]
     });
    }
    catch(error){
        res.status(500).json({
            message:"internal server error"
        });
    }
    };
    const loginuser=async(req,res)=>{
        try{
            const {email,password}=req.body;
            if(!email||!password){
return res.status(400).json({message:"please fill the data"});}
const user=await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
)
if(user.rows.length===0){
    return res.status(400).json({
        message:"user not found"
    });
}
const ismatch=await bcrypt.compare(password,user.rows[0].password);
if(!ismatch){
    return res.status(401).json({message:"Invalid email or passsword"});
            }
const token = jwt.sign(
     { userId: user.rows[0].id ,
          email: user.rows[0].email,
          role:user.rows[0].role
     },
     process.env.JWT_SECRET,
     { expiresIn: "1h" }
   );

 return res.status(200).json({
    message:"login successful",
    token: token,
 })
        }
        catch(error){
                console.log(error);
            return res.status(500).json({
                message:"Internal server error"
            })
        }
    }
    
module.exports= {getprofile, signuprofile,
    loginuser};