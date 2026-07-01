import { useState } from "react";
import api from "../services/api";
import "../styles/AIChatbot.css";

function AIChatbot() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const askAI = async () => {

        if (!message.trim()) return;

        try {

            setLoading(true);

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
                    text: response.data
                }
            ]);

        } catch (error) {

            console.log(error);

            setMessages(prev => [
                ...prev,
                {
                    role: "ai",
                    text: "Sorry, something went wrong."
                }
            ]);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <button
                className="chat-toggle"
                onClick={() => setOpen(!open)}
            >
                💬
            </button>

            {
                open && (

                    <div className="chat-box">

                        <div className="chat-header">

                            <span>
                                🤖 AI Shopping Assistant
                            </span>

                            <button
                                className="close-btn"
                                onClick={() => setOpen(false)}
                            >
                                ✖
                            </button>

                        </div>

                        <div className="chat-messages">

                            {
                                messages.map(
                                    (msg, index) => (

                                        <div
                                            key={index}
                                            className={
                                                msg.role === "user"
                                                    ? "user-message"
                                                    : "ai-message"
                                            }
                                        >
                                            {msg.text}
                                        </div>

                                    )
                                )
                            }

                            {
                                loading &&
                                (
                                    <div className="ai-message">
                                        🤖 Thinking...
                                    </div>
                                )
                            }

                        </div>

                        <div className="chat-input">

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
                                Send
                            </button>

                        </div>

                    </div>

                )
            }

        </div>

    );

}

export default AIChatbot;