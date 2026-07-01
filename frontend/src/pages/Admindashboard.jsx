import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
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

    <div className="admin-dashboard">

        <h1>Admin Dashboard</h1>

        <button
            className="add-product-btn"
            onClick={() =>
                navigate("/admin/add-product")
            }
        >
            Add Product
        </button>

        <div className="stats-grid">

            <div className="stat-card">
                <h2>{users.length}</h2>
                <p>Users</p>
            </div>

            <div className="stat-card">
                <h2>{orders.length}</h2>
                <p>Orders</p>
            </div>

            <div className="stat-card">
                <h2>{reviews.length}</h2>
                <p>Reviews</p>
            </div>

            <div className="stat-card">
                <h2>{products.length}</h2>
                <p>Products</p>
            </div>

        </div>

        <div className="dashboard-section">

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

                    <div
                        className="product-admin-card"
                        key={user.id}
                    >

                        <h3>{user.name}</h3>

                        <p>{user.email}</p>

                        <p>Role: {user.role}</p>

                    </div>

                ))
            }

        </div>

        <div className="dashboard-section">

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

                    <div
                        className="product-admin-card"
                        key={order.id}
                    >

                        <h3>
                            Order #{order.id}
                        </h3>

                        <p>
                            ₹{order.total_amount}
                        </p>

                    </div>

                ))
            }

        </div>

        <div className="dashboard-section">

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

                    <div
                        className="product-admin-card"
                        key={review.id}
                    >

                        <p>
                            ⭐ {review.rating}
                        </p>

                        <p>
                            {review.comment}
                        </p>

                    </div>

                ))
            }

        </div>

        <div className="dashboard-section">

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

                    <div
                        className="product-admin-card"
                        key={product.id}
                    >

                        <h3>
                            {product.name}
                        </h3>

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

    </div>

);

}

export default AdminDashboard;