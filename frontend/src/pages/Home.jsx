import "../styles/Home.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const getProfile = async () => {

        const token =
            localStorage.getItem("token");

        if(!token){

            alert("Please login first");

            navigate("/login");

            return;
        }

        try{

            await api.get(
                "/auth/profile",
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            navigate("/profile");

        }
        catch(error){

            console.log(error);

        }

    };

    return (

        <div className="home">

            <section className="hero">

                <h1>
                    AI Ecommerce Agent
                </h1>

                <p>
                    Discover products smarter with AI-powered recommendations,
                    review analysis, personalized shopping insights,
                    and intelligent product comparisons.
                </p>

                <div className="hero-buttons">

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Shop Now
                    </button>

                    <button
                        onClick={getProfile}
                    >
                        My Profile
                    </button>

                </div>

            </section>

            <section className="features">

                <h2>
                    Why Choose Us?
                </h2>

                <div className="feature-grid">

                    <div className="feature-card">
                        <h3>🤖 AI Shopping Assistant</h3>

                        <p>
                            Get instant product suggestions
                            from our AI assistant.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>⭐ AI Review Summary</h3>

                        <p>
                            Understand customer opinions
                            instantly.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>🎯 Personalized Recommendations</h3>

                        <p>
                            Products recommended based
                            on your shopping behavior.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>⚖ Product Comparison</h3>

                        <p>
                            Compare products intelligently
                            using AI.
                        </p>
                    </div>

                </div>

            </section>

            <section className="cta">

                <h2>
                    Start Shopping Smarter
                </h2>

                <p>
                    Explore products powered by AI.
                </p>

                <button
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Explore Products
                </button>

            </section>

        </div>

    );

}

export default Home;