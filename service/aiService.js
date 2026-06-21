const { GoogleGenerativeAI }=require("@google/generative-ai");
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
module.exports={
    generateresponse
};