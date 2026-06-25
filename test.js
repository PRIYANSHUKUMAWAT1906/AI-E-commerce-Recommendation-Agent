require("dotenv").config();

const {
    getUserPurchaseHistory
} = require("./service/aiService");

(async () => {

    const history = await getUserPurchaseHistory(1);

    console.log(history);

})();