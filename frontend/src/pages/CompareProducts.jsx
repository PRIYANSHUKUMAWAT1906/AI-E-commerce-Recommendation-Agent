import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/CompareProducts.css";
function CompareProducts(){
    const [products, setProducts] = useState([]);
const [product1, setProduct1] = useState("");
const [product2, setProduct2] = useState("");
const [comparison, setComparison] = useState("");
const [loading,setLoading] =useState(false);
useEffect(() => {

    const fetchProducts = async () => {

        const response =
            await api.get("/products");

        setProducts(response.data);

    };

    fetchProducts();

}, []);
const compareProducts = async () => {
setLoading(true);
    try {

        const response =
            await api.post(
                "/ai/compare",
                {
                    product1,
                    product2
                }
            );

        setComparison(response.data);

    } catch(error){

        console.log(error);

    }
finally{

    setLoading(false);

}
};
return(

    <div className="compare-container">

        <div className="compare-header">

            <h1>⚖ AI Product Comparison</h1>

            <p>
                Select any two products and let AI
                analyze which one is best for you.
            </p>

        </div>

        <div className="compare-card">

            <div className="select-group">

                <div>

                    <label>
                        Product 1
                    </label>

                    <select
                        value={product1}
                        onChange={(e)=>
                            setProduct1(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            Select Product 1
                        </option>

                        {
                            products.map(product=>(
                                <option
                                    key={product.id}
                                    value={product.id}
                                >
                                    {product.name}
                                </option>
                            ))
                        }

                    </select>

                </div>

                <div>

                    <label>
                        Product 2
                    </label>

                    <select
                        value={product2}
                        onChange={(e)=>
                            setProduct2(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            Select Product 2
                        </option>

                        {
                            products.map(product=>(
                                <option
                                    key={product.id}
                                    value={product.id}
                                >
                                    {product.name}
                                </option>
                            ))
                        }

                    </select>

                </div>

            </div>

            <button
                className="compare-btn"
                onClick={compareProducts}
                disabled={loading}
            >
                {
                    loading
                    ? "Analyzing..."
                    : "Compare Products"
                }
            </button>

        </div>

        {
            loading &&
            (
                <div className="loading-box">

                    🤖 AI is comparing products...

                </div>
            )
        }

        {
            comparison &&
            (
                <div className="comparison-result">

                    <h2>
                        AI Comparison Result
                    </h2>

                    <p>
                        {comparison}
                    </p>

                </div>
            )
        }

    </div>

);
};
export default CompareProducts;