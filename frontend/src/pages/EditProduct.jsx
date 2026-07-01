import { useEffect,useState } from "react";
import { useParams,useNavigate }
from "react-router-dom";
import api from "../services/api";
import "../styles/Productmanage.css"
function EditProduct(){

    const { id } = useParams();
    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");

    useEffect(()=>{

        const fetchProduct =
        async()=>{

            const response =
                await api.get(
                    `/products/${id}`
                );

            setName(
                response.data.name
            );

            setPrice(
                response.data.price
            );

        };

        fetchProduct();

    },[id]);

    const updateProduct =
    async()=>{

        try{

            const token =
                localStorage.getItem("token");

            await api.put(
                `/products/${id}`,
                {
                    name,
                    price
                },
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            navigate("/admin");

        }
        catch(error){

            console.log(error);

        }

    };

    return (

    <div className="add-product-container">

        <div className="add-product-card">

            <h1>Edit Product</h1>

            <p>
                Update product information.
            </p>

            <div className="product-form">

                <label>
                    Product Name
                </label>

                <input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e)=>
                        setName(e.target.value)
                    }
                />

                <label>
                    Product Price
                </label>

                <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e)=>
                        setPrice(e.target.value)
                    }
                />

                <button
                    onClick={updateProduct}
                >
                    Save Changes
                </button>

            </div>

        </div>

    </div>

);

}

export default EditProduct;