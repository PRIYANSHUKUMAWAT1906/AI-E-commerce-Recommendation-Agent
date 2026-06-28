import { useEffect, useState } from "react";
import api from "../services/api";

function Profile(){

    const [profile,setProfile] = useState(null);

    useEffect(()=>{

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

        </div>

    );

}

export default Profile;