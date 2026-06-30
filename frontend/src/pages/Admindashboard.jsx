import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]);

    const [showUsers, setShowUsers] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showProducts, setShowProducts] = useState(false);

    const deleteProduct = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.delete(
                `/products/${id}`,
                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setProducts(prev =>
                prev.filter(
                    product =>
                        product.id !== id
                )
            );

        } catch(error){

            console.log(error);

        }

    };

    useEffect(() => {

        const fetchData = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                if(!token){

                    alert(
                        "Please login with an admin account."
                    );

                    navigate("/login");

                    return;

                }

                await api.get(
                    "/user/admin",
                    {
                        headers:{
                            Authorization:
                            `Bearer ${token}`
                        }
                    }
                );

                const usersResponse =
                    await api.get(
                        "/user/alluser",
                        {
                            headers:{
                                Authorization:
                                `Bearer ${token}`
                            }
                        }
                    );

                const ordersResponse =
                    await api.get(
                        "/orders",
                        {
                            headers:{
                                Authorization:
                                `Bearer ${token}`
                            }
                        }
                    );

                const reviewsResponse =
                    await api.get(
                        "/review",
                        {
                            headers:{
                                Authorization:
                                `Bearer ${token}`
                            }
                        }
                    );

                const productsResponse =
                    await api.get(
                        "/products"
                    );

                setUsers(usersResponse.data);
                setOrders(ordersResponse.data);
                setReviews(reviewsResponse.data);
                setProducts(productsResponse.data);

            } catch(error){

                if(
                    error.response?.status === 403
                ){

                    alert(
                        "Admin access required."
                    );

                    navigate("/");

                }

                console.log(error);

            }

        };

        fetchData();

    }, [navigate]);

    return (

        <div>

            <h1>Admin Dashboard</h1>

            <button
                onClick={() =>
                    navigate(
                        "/admin/add-product"
                    )
                }
            >
                Add Product
            </button>

            <h3>Total Users: {users.length}</h3>
            <h3>Total Orders: {orders.length}</h3>
            <h3>Total Reviews: {reviews.length}</h3>
            <h3>Total Products: {products.length}</h3>

            <hr />

            <button
                onClick={() =>
                    setShowUsers(!showUsers)
                }
            >
                {
                    showUsers
                    ? "Hide Users"
                    : "Show Users"
                }
            </button>

            {
                showUsers &&
                users.map(user => (
                    <div key={user.id}>
                        <p>
                            {user.name}
                            {" - "}
                            {user.role}
                        </p>
                    </div>
                ))
            }

            <hr />

            <button
                onClick={() =>
                    setShowOrders(!showOrders)
                }
            >
                {
                    showOrders
                    ? "Hide Orders"
                    : "Show Orders"
                }
            </button>

            {
                showOrders &&
                orders.map(order => (
                    <div key={order.id}>
                        <p>
                            Order #{order.id}
                            {" | "}
                            ₹{order.total_amount}
                        </p>
                    </div>
                ))
            }

            <hr />

            <button
                onClick={() =>
                    setShowReviews(!showReviews)
                }
            >
                {
                    showReviews
                    ? "Hide Reviews"
                    : "Show Reviews"
                }
            </button>

            {
                showReviews &&
                reviews.map(review => (
                    <div key={review.id}>
                        <p>⭐ {review.rating}</p>
                        <p>{review.comment}</p>
                    </div>
                ))
            }

            <hr />

            <button
                onClick={() =>
                    setShowProducts(!showProducts)
                }
            >
                {
                    showProducts
                    ? "Hide Products"
                    : "Show Products"
                }
            </button>

            {
                showProducts &&
                products.map(product => (
                    <div key={product.id}>

                        <h3>{product.name}</h3>

                        <p>
                            ₹{product.price}
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    `/admin/edit-product/${product.id}`
                                )
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteProduct(
                                    product.id
                                )
                            }
                        >
                            Delete
                        </button>

                    </div>
                ))
            }

        </div>

    );

}

export default AdminDashboard;