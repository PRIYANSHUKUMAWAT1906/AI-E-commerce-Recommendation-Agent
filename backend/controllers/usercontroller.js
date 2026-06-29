const pool=require("../database/db");
const getuser=async(req,res,next)=>{
    const id=parseInt(req.params.id);
try{
    const result=await pool.query(
`SELECT
   users.id,
                users.name,
                orders.id AS order_id,
                orders.total_amount
            FROM users
            INNER JOIN orders
            ON users.id = orders.user_id
            WHERE users.id = $1
            `,
            [id]
    )

}
catch{
    res.status(500).json({
        message:"internal server error"
    })
}
}
;
const getuserByid=async(req,res,next)=>{
const id = parseInt(req.params.id);

    try {

        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "user not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }
}

const getUserOrders = async (req,res) => {

    try {

        const userId = req.user.userId;

        const result = await pool.query(
            `
            SELECT
                id,
                total_amount
            FROM orders
            WHERE user_id = $1
            ORDER BY id DESC
            `,
            [userId]
        );

        res.status(200).json(
            result.rows
        );

    }
    catch(error){

        res.status(500).json({
            message:"server error"
        });

    }

};
const createUser = async (req,res,next) => {

    const { name, email } = req.body;

    if(!name || !email){
        return res.status(400).json({
            message: "name and email are required"
        });
    }

    try{

        const result = await pool.query(
            `INSERT INTO users(name, email)
             VALUES($1, $2)
             RETURNING *`,
            [name, email]
        );

        res.status(201).json(result.rows[0]);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
const updateUser = async (req,res,next) => {

    const id = parseInt(req.params.id);

    const { name, email } = req.body;

    if(!name || !email){
        return res.status(400).json({
            message: "name and email are required"
        });
    }

    try{

        const result = await pool.query(
            `
            UPDATE users
            SET name = $1,
                email = $2
            WHERE id = $3
            RETURNING *
            `,
            [name, email, id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "user not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
const deleteUser = async (req,res,next) => {

    const id = parseInt(req.params.id);

    try{

        const result = await pool.query(
            `
            DELETE FROM users
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "user not found"
            });
        }

        res.status(200).json({
            message: "user deleted successfully"
        });

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
module.exports={getuser,getuserByid,getUserOrders,createUser,updateUser,deleteUser};