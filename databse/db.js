const { Pool}=require("pg");
require("dotenv").config();
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"ecommerce",
    password:process.env.DB_PASSWORD,
    port:3000
})
module.exports= pool;