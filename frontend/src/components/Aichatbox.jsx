import { useState } from "react";
import api from "../services/api";

function AIChatbot() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
const [loading,setLoading] =useState(false);
    const askAI = async () => {

        if (!message.trim()) return;
setLoading(true);
        try {

            const userMessage = message;

            setMessages(prev => [
                ...prev,
                {
                    role: "user",
                    text: userMessage
                }
            ]);

            setMessage("");

            const response = await api.post(
                "/ai/shopping-assistant",
                {
                    message: userMessage
                }
            );

            setMessages(prev => [
                ...prev,
                {
                    role: "ai",
                    text:
                        response.data
                }
            ]);

        }
        
         catch (error) {

            console.log(error);

        }
finally{

    setLoading(false);

}
    };

    return (

        <div>

            <button
                onClick={() => setOpen(!open)}
            >
                💬
            </button>

            {
                open && (
                    <div>

                        <h3>
                            AI Shopping Assistant
                        </h3>

                        <div>

                            {
                                messages.map(
                                    (msg, index) => (
                                        <div key={index}>

                                            <strong>
                                                {
                                                    msg.role === "user"
                                                        ? "You"
                                                        : "AI"
                                                }
                                                :
                                            </strong>

                                            {" "}
                                            {msg.text}

                                        </div>
                                    )
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

                        <input
                            type="text"
                            placeholder="Ask about products..."
                            value={message}
                            onChange={(e) =>
                                setMessage(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            onClick={askAI}
                            disabled={loading}
                        >
                           {
                    loading
                    ? "Thinking..."
                    : "Ask AI"
                }
                        </button>

                    </div>
                )
            }

        </div>

    );

}

export default AIChatbot;