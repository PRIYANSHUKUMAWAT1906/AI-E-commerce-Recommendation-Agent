const { GoogleGenerativeAI }=require("@google/generative-ai");
const pool=require("../databse/db");
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
}
module.exports={
    generateresponse,extractproductfilters,recommendProductsWithAI
};