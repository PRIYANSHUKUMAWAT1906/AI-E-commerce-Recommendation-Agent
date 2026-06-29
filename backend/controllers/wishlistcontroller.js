const pool = require("../database/db");

const addToWishlist = async (req, res) => {

    const { product_id } = req.body;
    const user_id = req.user.userId;

    if (!product_id) {
        return res.status(400).json({
            message: "product_id is required"
        });
    }

    try {

        const result = await pool.query(
            `
            INSERT INTO wishlist
            (user_id, product_id)
            VALUES ($1, $2)
            RETURNING *
            `,
            [user_id, product_id]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "server error"
        });

    }

};

const getWishlist = async (req, res) => {

    const user_id = req.user.userId;

    try {

        const result = await pool.query(
            `
            SELECT
                wishlist.id,
                products.id AS product_id,
                products.name,
                products.price,
                products.description
            FROM wishlist
            JOIN products
            ON wishlist.product_id = products.id
            WHERE wishlist.user_id = $1
            `,
            [user_id]
        );

        res.status(200).json(result.rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "server error"
        });

    }

};

const removeWishlist = async (req, res) => {

    const id = parseInt(req.params.id);

    try {

        const result = await pool.query(
            `
            DELETE FROM wishlist
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "wishlist item not found"
            });
        }

        res.status(200).json({
            message: "removed successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "server error"
        });

    }

};

module.exports = {
    addToWishlist,
    getWishlist,
    removeWishlist
};