import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
    <div>
        <h1>Compare products</h1>
        <select
    value={product1}
    onChange={(e) =>
        setProduct1(e.target.value)
    }
>
    <option value="">
        Select Product 1
    </option>

    {
        products.map(product => (
            <option
                key={product.id}
                value={product.id}
            >
                {product.name}
            </option>
        ))
    }
</select>
<select
    value={product2}
    onChange={(e) =>
        setProduct2(e.target.value)
    }
>
    <option value="">
        Select Product 2
    </option>

    {
        products.map(product => (
            <option
                key={product.id}
                value={product.id}
            >
                {product.name}
            </option>
        ))
    }
</select>
<button onClick={compareProducts}
 disabled={loading} >   {
                    loading
                    ? "Thinking..."
                    : "Compare Products"
                }
    
</button>
{
    comparison &&
    (
        <div>

            <h2>
                AI Comparison
            </h2>

            <p>
                {comparison}
            </p>

        </div>
    )
}
 {
        loading && (
            <div>
                <strong>AI:</strong> 🤖 Thinking...
            </div>
        )
    }
    </div>
)
};
export default CompareProducts;