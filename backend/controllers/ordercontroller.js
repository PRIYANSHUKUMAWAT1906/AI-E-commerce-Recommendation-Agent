const pool=require("../database/db");
const createOrder = async (req,res,next) => {

    const { user_id, total_amount } = req.body;

    if(!user_id || !total_amount){
        return res.status(400).json({
            message: "required fields missing"
        });
    }

    try {

        const result = await pool.query(
            `
            INSERT INTO orders
            (user_id, total_amount)
            VALUES ($1, $2)
            RETURNING *
            `,
            [user_id, total_amount]
        );

        res.status(201).json(result.rows[0]);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
const getOrders = async (req,res,next) => {

    try {

        const result = await pool.query(
            "SELECT * FROM orders"
        );

        res.status(200).json(result.rows);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
const getOrderById = async (req,res,next) => {

    const id = parseInt(req.params.id);

    try {

        const result = await pool.query(
            "SELECT * FROM orders WHERE id = $1",
            [id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "order not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
const updateOrder = async (req,res,next) => {

    const id = parseInt(req.params.id);

    const { total_amount } = req.body;

    try {

        const result = await pool.query(
            `
            UPDATE orders
            SET total_amount = $1
            WHERE id = $2
            RETURNING *
            `,
            [total_amount, id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "order not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
const deleteOrder = async (req,res,next) => {

    const id = parseInt(req.params.id);

    try {

        const result = await pool.query(
            `
            DELETE FROM orders
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "order not found"
            });
        }

        res.status(200).json({
            message: "order deleted"
        });

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
module.exports = {
   createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
