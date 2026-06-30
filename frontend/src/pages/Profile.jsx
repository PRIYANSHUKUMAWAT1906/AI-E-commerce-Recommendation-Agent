import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

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

                setProfile(response.data);

            }
            catch(error){

                console.log(error);

            }

        };

        fetchProfile();

    },[]);

    return(

        <div>

            <h1>Profile</h1>

            {
                profile && (
                    <>
                        <p>Email: {profile.user.email}</p>
                        <p>Role: {profile.user.role}</p>
                    </>
                )
            }
<h2>Recommended For You</h2>
<button onClick={getRecommendations}  disabled={loading}>
       {
                    loading
                    ? "Thinking..."
                    : "Get AI personalised recommendation"
                }
</button>
{
    recommendations && (
        <div>

            <p>
                {recommendations.summary}
            </p>

            {
                recommendations.recommendations.map(
                    (item,index) => (
                        <div key={index}>

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

        </div>
    )
}
{
        loading && (
            <div>
                <strong>AI:</strong> 🤖 Thinking...
            </div>
        )
    }

        </div>

    );

}

export default Profile;