import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
const [search,setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
const [maxPrice,setMaxPrice] = useState("");
const [query, setQuery] = useState("");
const [recommendation, setRecommendation] = useState("");
const getRecommendation = async () => {

    try {
if(!query){
    setRecommendation({message:"please write query"});
    return;
}
        const response =
            await api.post(
                "/ai/recommend",
                {
                    message: query
                }
            );

        setRecommendation(
            response.data.recommendation
        );

    } catch(error){

        console.log(error);

    }

};
    useEffect(() => {


        const fetchProducts = async () => {

            try {

                const response =
                    await api.get("/products");

                setProducts(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);
    
    const filteredProducts =
 products.filter(product =>
   product.name
     .toLowerCase()
     .includes(search.toLowerCase())
 &&
 (
   !maxPrice ||
   product.price <= Number(maxPrice)
 )
);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Products</h1>
            
<input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
/>
<input
  type="number"
  placeholder="Max Price"
  value={maxPrice}
  onChange={(e)=>setMaxPrice(e.target.value)}
/>

<h2>AI Product Recommendation</h2>

<input
    type="text"
    placeholder="Best product under 2000"
    value={query}
    onChange={(e) =>
        setQuery(e.target.value)
    }
/>

<button onClick={getRecommendation}>
    Get Recommendation
</button>
{
    recommendation &&
    (
        <div>

            <h3>
                AI Recommendation
            </h3>

            <p>
                {recommendation}
            </p>

        </div>
    )
}
            {
                filteredProducts.map((product) => (
    <ProductCard
        key={product.id}
        product={product}
    />
))
            }

        </div>
    );
}

export default Products;