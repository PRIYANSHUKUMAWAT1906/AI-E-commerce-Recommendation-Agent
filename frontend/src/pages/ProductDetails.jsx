import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/ProductDetails.css";
function ProductDetails() {
const navigate = useNavigate();
    const { id } = useParams();
const [reviews, setReviews] = useState([]);
    const [product, setProduct] = useState(null);
const [rating, setRating] = useState("");
const [comment, setComment] = useState("");
const [summary, setSummary] = useState("");
const [loading,setLoading] = useState(false);
const getReviewSummary = async () => {
setLoading(true);
    try {

        const response =
            await api.get(
                `/ai/review-summary/${id}`
            );

        setSummary(response.data);
console.log(response.data);
    } catch(error){

        console.log(error);

    }
finally{

    setLoading(false);

}
};
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
setReviews(prev => [
    ...prev,
    {
        reviewer: "You",
        rating,
        comment
    }
]);}
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
       <div className="product-details">

    <div className="product-info">

        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <p>{product.description}</p>

    </div>

    <div className="review-section">

        <div className="review-header">

            <h2 className="main_text">Customer Reviews</h2>

            <h3>
                ⭐ {average.toFixed(1)}
            </h3>

        </div>

        <button
            className="ai-summary-btn"
            onClick={getReviewSummary}
            disabled={loading}
        >
            {
                loading
                ? "Analyzing..."
                : "AI Review Summary"
            }
        </button>

        {
            summary &&
            (
                <div className="summary-box">

                    <h3>🤖 AI Summary</h3>

                    <p>{summary}</p>

                </div>
            )
        }

        {
            reviews.map((review,index) => (

                <div
                    className="review-card"
                    key={review.id || index}
                >

                    <h4>
                        {review.reviewer}
                    </h4>

                    <p>
                        ⭐ {review.rating}/5
                    </p>

                    <p>
                        {review.comment}
                    </p>

                </div>

            ))
        }

    </div>

    <div className="review-form">

        <h3>Add Review</h3>

        <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating"
            value={rating}
            onChange={(e)=>
                setRating(e.target.value)
            }
        />

        <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e)=>
                setComment(e.target.value)
            }
        />

        <button onClick={submitReview}>
            Submit Review
        </button>

    </div>

</div>
    );
}

export default ProductDetails;