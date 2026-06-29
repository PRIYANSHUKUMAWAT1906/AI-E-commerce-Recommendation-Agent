import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function MyOrders() {
const navigate = useNavigate();
    const [orders,setOrders] =
        useState([]);

    useEffect(() => {

    const token = localStorage.getItem("token");

    if(!token){
        alert("Please login first");
        navigate("/login");
        return;
    }
        const fetchOrders =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await api.get(
                            "user/myorders",
                            {
                                headers:{
                                    Authorization:
                                    `Bearer ${token}`
                                }
                            }
                        );

                    setOrders(
                        response.data
                    );
                }
                catch(error){

                    console.log(error);

                }

            };

        fetchOrders();

    }, []);
  if(orders.length === 0){
    return (
        <h2>
            No orders found
        </h2>
    );
}
    return (

        <div>

            <h1>My Orders</h1>

            {
                orders.map(order => (

                    <div key={order.id}>

                        <p>
                            Order ID:
                            {order.id}
                        </p>

                        <p>
                            Total:
                            ₹{order.total_amount}
                        </p>
                    <Link to={`/orders/${order.id}`}>
                  <button>  View Details</button></Link>
                    </div>

                ))
            }

        </div>

    );

}

export default MyOrders;