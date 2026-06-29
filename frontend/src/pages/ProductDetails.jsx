import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
function ProductDetails() {
const navigate = useNavigate();
    const { id } = useParams();
const [reviews, setReviews] = useState([]);
    const [product, setProduct] = useState(null);
const [rating, setRating] = useState("");
const [comment, setComment] = useState("");
const submitReview = async () => {
try{
    const token = localStorage.getItem("token");
        if(!token){
        navigate("/login");
        return;
    } 

    await api.post(
        "/review/products",
        {
            product_id: id,
            rating,
            comment
        },
        {
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );
window.location.reload();}
    catch(error){
        console.log(error);
    }

};
    useEffect(() => {

        const fetchProduct = async () => {

            try {
const reviewResponse = await api.get(
    `/review/products/${id}`
);

setReviews(reviewResponse.data);

                const response =
                    await api.get(`/products/${id}`);

                setProduct(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchProduct();

    }, [id]);
const average =reviews.length > 0? reviews.reduce((sum, review) =>sum + review.rating,0) / reviews.length: 0;
    if (!product) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>{product.name}</h1>

            <p>Price: ₹{product.price}</p>

            <p>{product.description}</p>
<h2>Reviews</h2>
<h3>
  Rating: {average.toFixed(1)} ⭐
</h3>
{
    reviews.map((review,index) => (
        <div key={index}>
             <h4>{review.reviewer}</h4>
            <p>⭐ {review.rating}/5</p>
            <p>{review.comment}</p>
        </div>
    ))
}
<input
    type="number"
    min="1"
    max="5"
    value={rating}
    onChange={(e) => setRating(e.target.value)}
/>

<textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
/>

<button onClick={submitReview}>
    Submit Review
</button>
        </div>
    );
}

export default ProductDetails;