const { GoogleGenerativeAI }=require("@google/generative-ai");
const pool=require("../database/db");
require("dotenv").config();
const genai= new  GoogleGenerativeAI (process.env.GEMINI_API);
const model=genai.getGenerativeModel({
    model:"gemini-2.5-flash"
});
const generateresponse=async(message)=>{
    try{
        const result=await model.generateContent(
            message
        );
        return result.response.text();
    }
    catch(error){
        console.log(error);
        throw new Error(
"Failed to generate AI response"
        );
    }
}

const extractproductfilters=async(message)=>{
    
  
     try {

        const prompt = `
Extract product filters from the user's query.

Return ONLY valid JSON.

Example:

{
  "category":"laptop",
  "maxPrice":50000
}

User Query:
${message}
`;

        const result = await model.generateContent(
            prompt
        );
const text=result.response.text();
const cleantext = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleantext);

    }
    catch(error){
        console.log(error);
        throw new Error(
"Failed to generate AI response"
        );
    }
}

const getRecommendedProducts = async(message)=>{
    
    const filters =
        await extractproductfilters(message);

    const products =
        await pool.query(
            "SELECT * FROM products WHERE price <= $1",
            [filters.maxPrice]
        );

    return products.rows;
}
const recommendProductsWithAI = async(message)=>{
    try{

        const products =
            await getRecommendedProducts(message);

        const prompt = `
User Query:
${message}

Available Products:
${JSON.stringify(products)}

Recommend the best product.
Explain why it is suitable.
Keep the answer concise.
if two products are same from point of view you should say to user that there is 
compare product  ai service you should use it on compare page of web
`;

        const result =
            await model.generateContent(prompt);

        return result.response.text();

    }
    catch(error){

        console.log(error);

        throw new Error(
            "Recommendation failed"
        );

    }
};
const getUserPurchaseHistory = async (userId) => {
    try {

        const result = await pool.query(
            `SELECT
                p.*
             FROM orders o
             JOIN products p
             ON o.product_id = p.id
             WHERE o.user_id = $1`,
            [userId]
        );

        return result.rows;

    } catch (error) {

        console.log(error);
        throw new Error("Failed to fetch purchase history");

    }
};

const getPersonalizedRecommendation = async (userId) => {

    try {

        const purchaseHistory =
            await getUserPurchaseHistory(userId);
const reviews =
    await getUserReviews(userId);

const availableProducts =
    await getProductsNotPurchased(userId);
        const prompt = `
You are an AI shopping assistant.
Purchased Products:
${JSON.stringify(purchaseHistory)}

User Reviews:
${JSON.stringify(reviews)}

Products Available:
${JSON.stringify(availableProducts)}


Do NOT recommend products the user already owns.

Recommend only new products.

Return ONLY valid JSON in this format:

{
  "summary": "One sentence about the user's interests",
  "recommendations": [
    {
      "product": "Product Name",
      "reason": "Why it is recommended"
    },
    {
      "product": "Product Name",
      "reason": "Why it is recommended"
    },
    {
      "product": "Product Name",
      "reason": "Why it is recommended"
    }
  ]
}

Do not write markdown.
Do not use \`\`\`json.
Return only the JSON object.
`;

       const result = await model.generateContent(prompt);

const text = result.response.text();

const cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

return JSON.parse(cleanText);

    }
    catch(error){

        console.log(error);

        throw new Error(
            "Failed to generate personalized recommendation"
        );

    }};

    const getUserReviews = async(userId)=>{
    try{

        const result = await pool.query(
            `
            SELECT
                reviews.*,
                products.name AS product_name
            FROM reviews
            JOIN products
            ON reviews.product_id = products.id
            WHERE reviews.user_id = $1
            `,
            [userId]
        );

        return result.rows;

    }
    catch(error){

        console.log(error);

        throw new Error("Failed to fetch user reviews");

    }
};

const getProductsNotPurchased = async(userId)=>{
    try{

        const result = await pool.query(
            `
            SELECT *
            FROM products
            WHERE id NOT IN(
                SELECT product_id
                FROM orders
                WHERE user_id = $1
            )
            `,
            [userId]
        );

        return result.rows;

    }
    catch(error){

        console.log(error);

        throw new Error("Failed to fetch products");

    }
};

const compareProducts = async(product1Id, product2Id)=>{
    
    const product1 = await pool.query(
        "SELECT * FROM products WHERE id=$1",
        [product1Id]
    );

    const product2 = await pool.query(
        "SELECT * FROM products WHERE id=$1",
        [product2Id]
    );
const reviews1 = await pool.query(
    `
    SELECT rating, comment
    FROM reviews
    WHERE product_id = $1
    `,
    [product1Id]
);

const reviews2 = await pool.query(
    `
    SELECT rating, comment
    FROM reviews
    WHERE product_id = $1
    `,
    [product2Id]
);
const avgRating1 = await pool.query(
    `
    SELECT AVG(rating)
    FROM reviews
    WHERE product_id = $1
    `,
    [product1Id]
);

const avgRating2 = await pool.query(
    `
    SELECT AVG(rating)
    FROM reviews
    WHERE product_id = $1
    `,
    [product2Id]
);

    const prompt = `

Compare these products.

Product 1:
${JSON.stringify(product1.rows[0])}

Average Rating:
${avgRating1.rows[0].avg}

Reviews:
${JSON.stringify(reviews1.rows)}

Product 2:
${JSON.stringify(product2.rows[0])}

Average Rating:
${avgRating2.rows[0].avg}

Reviews:
${JSON.stringify(reviews2.rows)}

Compare based on:
- Price
- Description
- Customer ratings
- Customer reviews
- Overall value

Explain which product is better and why.

Do not use markdown.
Return plain English.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
}

const reviewSummary = async(productId)=>{

    const reviews = await pool.query(
        `
        SELECT *
        FROM reviews
        WHERE product_id=$1
        `,
        [productId]
    );

    const prompt = `
You are an AI product review analyst.

Reviews:
${JSON.stringify(reviews.rows)}

Write a short and natural review summary.

Mention:
- What customers liked
- What customers disliked
- Whether you would recommend the product

Do not return JSON.
Do not return markdown.
Write in plain English.
`;

    const result=
    await model.generateContent(prompt);

    return result.response.text();
};
const shoppingAssistant=
async(message)=>{

    const products=
    await pool.query(
        "SELECT * FROM products"
    );

    const prompt=`
You are a friendly AI shopping assistant for an e-commerce website.

User Query:
${message}

Available Products:
${JSON.stringify(products.rows)}

Respond naturally like a human shopping assistant.

If products match the user's request:
- Recommend the best products.
- Explain why they are suitable.
- Mention prices if available.

Do not return JSON.
Do not return markdown.
Do not return code blocks.

Answer in plain conversational English.
`;

    const result=
    await model.generateContent(prompt);

    return result.response.text();
};

module.exports={
    generateresponse,extractproductfilters,recommendProductsWithAI,getUserPurchaseHistory,getPersonalizedRecommendation,reviewSummary,shoppingAssistant,compareProducts
};