import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

    window.location.href = "/login";

    };

    return (

        <nav className="navbar">

            <div className="navbar-logo">
                AI Ecommerce
            </div>

            <div className="navbar-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>
     <Link to="/about"> About</Link>
                <Link to="/cart">
                    Cart
                </Link>

                <Link to="/wishlist">
                    Wishlist
                </Link>

                <Link to="/compareproducts">
                    Compare
                </Link>

                <Link to="/MyOrder">
                    My Orders
                </Link>

              
                {
                    !token ? (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile">
                                Profile
                            </Link>
                           {
                    role === "admin" && (
                        <Link to="/admin">
                            Admin
                        </Link>
                    )
                }

                            <button
                                className="logout-btn"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    )
                }

            </div>

        </nav>

    );

}

export default Navbar;