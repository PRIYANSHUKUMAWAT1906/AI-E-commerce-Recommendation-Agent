import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/MyOrders.css";
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

        <div className="empty-orders">

            <h2>📦 No Orders Yet</h2>

            <p>
                You haven't placed any orders yet.
            </p>

            <button
                onClick={() =>
                    navigate("/products")
                }
            >
                Start Shopping
            </button>

        </div>

    );

}

return (

    <div className="orders-container">

        <div className="orders-header">

            <h1>📦 My Orders</h1>

            <p>
                Track and manage your purchases.
            </p>

        </div>

        <div className="orders-grid">

            {
                orders.map(order => (

                    <div
                        className="order-card"
                        key={order.id}
                    >

                        <div className="order-top">

                            <h3>
                                Order #{order.id}
                            </h3>

                            <span className="order-status">
                                Completed
                            </span>

                        </div>

                        <p className="order-total">

                            ₹{order.total_amount}

                        </p>

                        <Link
                            to={`/orders/${order.id}`}
                        >

                            <button
                                className="details-btn"
                            >
                                View Details
                            </button>

                        </Link>

                    </div>

                ))
            }

        </div>

    </div>

);

}

export default MyOrders;