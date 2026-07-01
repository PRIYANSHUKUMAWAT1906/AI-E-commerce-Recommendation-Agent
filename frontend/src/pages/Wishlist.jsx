import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Wishlist.css";
function Wishlist() {
const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
const addToCart = async(product) => {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
await removeWishlist(product.id);

    alert("Added to cart");

};
    const removeWishlist = async (id) => {

        const token =
            localStorage.getItem("token");

        await api.delete(
            `/wishlist/${id}`,
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        setWishlist(
            wishlist.filter(
                item => item.id !== id
            )
        );
    };

    useEffect(() => {

        const fetchWishlist = async () => {

            const token =
                localStorage.getItem("token");
if(!token){
        alert("Please login first");
        navigate("/login");
        return;
    }
            const response =
                await api.get(
                    "/wishlist",
                    {
                        headers:{
                            Authorization:
                            `Bearer ${token}`
                        }
                    }
                );

            setWishlist(response.data);

        };

        fetchWishlist();

    }, []);

    return (
    

    <div className="wishlist-container">

        <h1>❤️ My Wishlist</h1>

        {
            wishlist.length === 0 ? (

                <div className="empty-wishlist">

                    <h2>No items in wishlist</h2>

                    <p>
                        Save products you love and
                        come back later.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Browse Products
                    </button>

                </div>

            ) : (

                <div className="wishlist-grid">

                    {
                        wishlist.map(item => (

                            <div
                                className="wishlist-card"
                                key={item.id}
                            >

                                <h3>
                                    {item.name}
                                </h3>

                                <p className="price">
                                    ₹{item.price}
                                </p>

                               <div className="wishlist-actions">

    <button
        className="cart-btn"
        onClick={() =>
            addToCart(item)
        }
    >
        Add To Cart
    </button>

    <button
        className="remove-btn"
        onClick={() =>
            removeWishlist(item.id)
        }
    >
        Remove
    </button>

</div>

                            </div>

                        ))
                    }

                </div>

            )
        }

    </div>


    );

}

export default Wishlist;