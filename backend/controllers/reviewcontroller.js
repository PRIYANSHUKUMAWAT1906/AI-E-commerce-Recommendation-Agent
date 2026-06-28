const pool=require("../database/db");

const createReview = async(req,res,next) => {

    const { user_id, product_id, rating, comment } = req.body;

    if(!user_id || !product_id || !rating){
        return res.status(400).json({
            message: "required fields missing"
        });
    }

    try{

        const result = await pool.query(
            `
            INSERT INTO reviews
            (user_id, product_id, rating, comment)
            VALUES ($1,$2,$3,$4)
            RETURNING *
            `,
            [user_id, product_id, rating, comment]
        );

        res.status(201).json(result.rows[0]);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};

const getProductReviews = async(req,res,next) => {

    const id = parseInt(req.params.id);

    try{

        const result = await pool.query(
            `
            SELECT
                products.name AS product_name,
                users.name AS reviewer,
                reviews.rating,
                reviews.comment
            FROM reviews
            INNER JOIN users
            ON reviews.user_id = users.id

            INNER JOIN products
            ON reviews.product_id = products.id

            WHERE products.id = $1
            `,
            [id]
        );

        res.status(200).json(result.rows);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
const getReviews = async (req,res,next)=> {

    try {

        const result = await pool.query(
            "SELECT * FROM reviews"
        );

        res.status(200).json(result.rows);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
const getReviewById = async (req,res,next) => {

    const id = parseInt(req.params.id);

    try {

        const result = await pool.query(
            "SELECT * FROM reviews WHERE id = $1",
            [id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "review not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
const updateReview = async (req,res,next) => {

    const id = parseInt(req.params.id);

    const { rating, comment } = req.body;

    try {

        const result = await pool.query(
            `
            UPDATE reviews
            SET rating = $1,
                comment = $2
            WHERE id = $3
            RETURNING *
            `,
            [rating, comment, id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "review not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
const deleteReview = async (req,res,next) => {

    const id = parseInt(req.params.id);

    try {

        const result = await pool.query(
            `
            DELETE FROM reviews
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "review not found"
            });
        }

        res.status(200).json({
            message: "review deleted"
        });

    } catch(error){

        res.status(500).json({
            message: "server error"
        });

    }

};
module.exports = {
    createReview,getProductReviews,getReviews,updateReview,deleteReview,getReviewById
};
