import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";
function Cart(){
    const token =
        localStorage.getItem("token");
const [cart,setCart] = useState([]);
const navigate = useNavigate();
 useEffect(()=>{
        if(!token){
        navigate("/login");
        return;
    }

        const items =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        setCart(items);

    },[]);
    
const total = cart.reduce(
    (sum, item) => sum + Number(item.price),0
);

const removeItem = (index) => {

    const updatedCart =
        cart.filter((_, i) => i !== index);

    setCart(updatedCart);

    localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
    );
};

const checkout =async () => {
    

    const total =
        cart.reduce(
            (sum,item)=>
                sum + Number(item.price),
            0
        );

    await api.post(
        "/orders",
        {
            total_amount: total,
              items: cart
        },
        {
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );
localStorage.removeItem("cart");

setCart([]);
navigate("/orders");
};
    
if(cart.length === 0){

    return (

        <div className="empty-cart">

            <h2>🛒 Your Cart is Empty</h2>

            <p>
                Looks like you haven't added any products yet.
            </p>

            <button
                onClick={() =>
                    navigate("/products")
                }
            >
                Continue Shopping
            </button>

        </div>

    );

}

return (

    <div className="cart-container">

        <h1>Shopping Cart</h1>

        <div className="cart-grid">

            <div className="cart-items">

                {
                    cart.map((item,index)=>(

                        <div
                            className="cart-card"
                            key={index}
                        >

                            <div>

                                <h3>
                                    {item.name}
                                </h3>

                                <p>
                                    ₹{item.price}
                                </p>

                            </div>

                            <button
                                className="remove-btn"
                                onClick={() =>
                                    removeItem(index)
                                }
                            >
                                Remove
                            </button>

                        </div>

                    ))
                }

            </div>

            <div className="cart-summary">

                <h2>Order Summary</h2>

                <div className="summary-row">
                    <span>Total Items</span>
                    <span>{cart.length}</span>
                </div>

                <div className="summary-row">
                    <span>Total Amount</span>
                    <span>₹{total}</span>
                </div>

                <button
                    className="checkout-btn"
                    onClick={checkout}
                >
                    Proceed to Checkout
                </button>

            </div>

        </div>

    </div>

);

}

export default Cart;