require("dotenv").config();
const {
    generateresponse,extractproductfilters,recommendProductsWithAI
} = require("../service/aiService");

const chatcontroller=async (req,res) => {
try{
    const message=req.body;
    if(!message){
        return res.status(400).json({
            message:"message is required"
        });
    }
    const answer =
        await generateresponse(
            message
        );

    res.status(200).json({
        answer
    });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"AI ERROR"
        });
    }
};
const recommendProducts = async(req,res)=>{

    try{

        const { message } = req.body;

        const recommendation =
            await recommendProductsWithAI(
                message
            );

        res.status(200).json({
            recommendation
        });

    }
    catch(error){

        res.status(500).json({
            message:"Recommendation failed"
        });

    }

};
module.exports={
    chatcontroller,recommendProducts
};