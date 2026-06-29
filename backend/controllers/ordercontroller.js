const pool=require("../database/db");
const createOrder = async (req,res,next) => {

    const { total_amount, items } = req.body;

const user_id = req.user.userId;
    if(!total_amount||!items || items.length === 0){
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
const orderId = result.rows[0].id;
for(const item of items){

    await pool.query(
        `
        INSERT INTO order_items
        (
            order_id,
            product_id,
            quantity
        )
        VALUES
        (
            $1,$2,$3
        )
        `,
        [
            orderId,
            item.id,
            1
        ]
    );

}
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
const getOrderById = async (req,res) => {

    const orderId = parseInt(req.params.id);
    const userId = req.user.userId;

    try {

        const result = await pool.query(
`
SELECT
    orders.id AS order_id,
    orders.total_amount,
    orders.order_date,
    products.id AS product_id,
    products.name,
    products.price,
    order_items.quantity
FROM orders
JOIN order_items
ON orders.id = order_items.order_id

JOIN products
ON order_items.product_id = products.id

WHERE orders.id = $1
AND orders.user_id = $2
`,
[orderId, userId]
);
        if(result.rows.length === 0){

            return res.status(404).json({
                message:"order not found"
            });

        }
console.log( result.rows);
        res.status(200).json(
            result.rows
        );

    }
    catch(error){
 console.log(error);

        res.status(500).json({
            message:"server error"
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
