import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

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
        <div>

            <h1>Order Details</h1>
 <h2>
      Total Amount: ₹{order[0].total_amount}
    </h2>

            {
  order.map(item => (
    <div key={item.product_id}>
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>
      <p>Qty: {item.quantity}</p>
    </div>
  ))
}
        </div>
    );

}

export default OrderDetails;