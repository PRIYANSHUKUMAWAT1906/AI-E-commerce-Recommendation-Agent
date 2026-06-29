import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function Wishlist() {
const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);

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
        <div>

            <h1>Wishlist</h1>

            {
                wishlist.map(item => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <p>₹{item.price}</p>
                        <button onClick={() => removeWishlist(item.id)}>
                            Remove
                        </button>
                    </div>
                ))
            }

        </div>
    );

}

export default Wishlist;