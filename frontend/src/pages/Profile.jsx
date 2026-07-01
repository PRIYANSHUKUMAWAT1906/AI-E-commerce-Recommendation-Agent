import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
function Profile(){
const navigate = useNavigate();
    const [profile,setProfile] = useState(null);
const [recommendations, setRecommendations] = useState(null);
const [loading,setLoading] =useState(false);
const token =
            localStorage.getItem("token");
const getRecommendations = async () => {
setLoading(true);
    try {

       
if(!token){
        alert("Please login first");
        navigate("/login");
        return;
    }
        const response =
            await api.get(
                "/ai/personalized",
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

        setRecommendations(response.data);

    } catch(error){

        console.log(error);

    }
finally{

    setLoading(false);

}
};
    useEffect(()=>{


    if(!token){
        alert("Please login first");
        navigate("/login");
        return;
    }
        const fetchProfile = async()=>{

            try{

                const token =
                    localStorage.getItem("token");

                const response =
                    await api.get(
                        "/auth/profile",
                        {
                            headers:{
                                Authorization:
                                `Bearer ${token}`
                            }
                        }
                    );
          localStorage.setItem(
    "role",
    response.data.user.role
);
          
                    console.log(response.data);


                setProfile(response.data);

            }
            catch(error){

                console.log(error);

            }

        };

        fetchProfile();

    },[]);

    return(

       <div className="profile-container">

    <div className="profile-card">

        <h1>Profile</h1>

        {
            profile && (
                <>
                    <p>
                        Email:
                        {" "}
                        {profile.user.email}
                    </p>

                    <p>
                        Role:
                        {" "}
                        {profile.user.role}
                    </p>
                </>
            )
        }

    </div>

    <div className="recommendation-section">

        <h2>
            AI Recommendations For You
        </h2>

        <button
            className="recommend-btn"
            onClick={getRecommendations}
            disabled={loading}
        >
            {
                loading
                ? "Generating..."
                : "Get Recommendations"
            }
        </button>

        {
            loading &&
            (
                <div className="ai-loading">
                    🤖 AI is analyzing your shopping history...
                </div>
            )
        }

        {
            recommendations &&
            (
                <>
                    <div className="summary-box">

                        <strong>
                            AI Summary
                        </strong>

                        <p>
                            {recommendations.summary}
                        </p>

                    </div>

                    {
                        recommendations.recommendations.map(
                            (item,index)=>(
                                <div
                                    key={index}
                                    className="recommendation-card"
                                >

                                    <h4>
                                        {item.product}
                                    </h4>

                                    <p>
                                        {item.reason}
                                    </p>

                                </div>
                            )
                        )
                    }
                </>
            )
        }

    </div>

</div>

    );

}

export default Profile;