require("dotenv").config();
const {
    generateresponse,extractproductfilters,recommendProductsWithAI,getPersonalizedRecommendation,reviewSummary,shoppingAssistant,compareProducts
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

const personalizedRecommendation = async(req,res)=>{

    try{

        const userId = req.user.userId;

        const recommendation =
            await getPersonalizedRecommendation(userId);

        res.status(200).json( recommendation );

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Failed to generate recommendation"
        });

    }

};
const compareProductsController = async(req,res)=>{
 try{   const {product1,product2}=req.body;

    const result=
    await compareProducts(product1,product2);

    res.json(result);}
    catch(error){

   console.log(error);

   res.status(500).json({
      message:error.message
   });
    }
};
const reviewSummaryController=
async(req,res)=>{
try{
    const {productId}=req.params;

    const summary=
    await reviewSummary(productId);

    res.json(summary);}
    catch(error){

   console.log(error);

   res.status(500).json({
      message:error.message
   });
    }
};
const shoppingAssistantController=
async(req,res)=>{
try{
    const {message}=req.body;

    const result=
    await shoppingAssistant(message);

    res.json(result);}
    catch(error){

   console.log(error);

   res.status(500).json({
      message:error.message
   });
    }
};
module.exports={
    chatcontroller,recommendProducts,personalizedRecommendation,compareProductsController,shoppingAssistantController,reviewSummaryController
};