import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function ProductCard({ product }) {
   const navigate = useNavigate(); 
   const addToWishlist = async (productId) => {

    const token = localStorage.getItem("token");

    if(!token){
        alert("Please login first");
        navigate("/login");
        return;
    }

    try {

        await api.post(
            "/wishlist",
            {
                product_id: productId
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        alert("Added to wishlist");

    } catch(error){

        console.log(error);

    }

};
  const addToCart = (product) => {
const token = localStorage.getItem("token");

    if(!token){
        alert("Please login first");
        navigate("/login");
        return;
    }
        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Added to cart");
    };
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px"
      }}
    >
      <h3>{product.name}</h3>

      <p>
        Price: ₹{product.price}
      </p>

      <Link to={`/products/${product.id}`}>
    <button>
        View Details
    </button>
</Link>
<button onClick={()=>{addToCart(product);}}>
  Add To Cart
</button>
<button onClick={() => addToWishlist(product.id)}>
    ❤️ Wishlist
</button>
    </div>
  );
}

export default ProductCard;