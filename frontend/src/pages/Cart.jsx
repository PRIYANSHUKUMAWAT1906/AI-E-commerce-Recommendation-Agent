import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
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
        <h2>
            Your cart is empty
        </h2>
    );
}
    return(

        <div>

            <h1>Cart</h1>

            {
                cart.map((item,index)=>(
                    <div key={index}>
                        <h3>{item.name}</h3>
                        <p>₹{item.price}</p>
                        <button onClick={() => removeItem(index)}> Remove
</button>
                    </div>
                ))
            }
            <h2>Total: ₹{total}</h2>
            <button onClick={()=>{
                checkout();
            }}>
    Checkout
</button>

        </div>

    );

}

export default Cart;