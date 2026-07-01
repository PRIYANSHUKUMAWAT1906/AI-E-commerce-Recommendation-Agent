import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/OrderDetails.css";
function OrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await api.get(
                        `/orders/${id}`,
                        {
                            headers:{
                                Authorization:
                                `Bearer ${token}`
                            }
                        }
                    );

                setOrder(response.data);

            } catch(error){

                console.log(error);

            }

        };

        fetchOrder();

    }, [id]);

    if(!order){
        return <h2>Loading...</h2>;
    }

    return (

    <div className="order-details-container">

        <div className="order-header">

            <h1>📦 Order Details</h1>

            <p>
                Order #{id}
            </p>

        </div>

        <div className="order-summary">

            <h2>
                Total Amount
            </h2>

            <span>
                ₹{order[0].total_amount}
            </span>

        </div>

        <div className="products-list">

            {
                order.map(item => (

                    <div
                        className="product-item"
                        key={item.product_id}
                    >

                        <div>

                            <h3>
                                {item.name}
                            </h3>

                            <p>
                                Quantity:
                                {" "}
                                {item.quantity}
                            </p>

                        </div>

                        <div className="product-price">

                            ₹{item.price}

                        </div>

                    </div>

                ))
            }

        </div>

    </div>

);

}

export default OrderDetails;