require("dotenv").config();

const {
    generateresponse
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
            "What is Node.js?"
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
module.exports={
    chatcontroller
};