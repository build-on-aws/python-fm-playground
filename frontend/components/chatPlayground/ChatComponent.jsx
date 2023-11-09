"use client";

import Human from "@/components/chatPlayground/Human";
import React, { useState } from "react";
import Assistant from "@/components/chatPlayground/Assistant";
import Loader from "@/components/chatPlayground/Loader";
import GlobalConfig from "@/app/app.config";
import ModelIndicator from "@/components/chatPlayground/ModelIndicator";

export default function ChatContainer() {
    const [conversation, setConversation] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const endpoint = "/foundation-models/model/chat/anthropic.claude-v2/invoke";
    const api = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const extractPrompt = (body) => {
        let conversationBuilder = '';
        for (const message of body) {
            conversationBuilder += `${message.sender}: ${message.message}\n\n`;
        }

        return conversationBuilder.trim();
    }

    const sendMessage = async () => {
        const newMessage = { sender: "Human", message: inputValue };
        setConversation(prevConversation => [...prevConversation, newMessage]);
        setInputValue('');

        try {
            const message = extractPrompt([...conversation, newMessage]);

            setIsLoading(true);

            const response = await fetch(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await response.json().then(data => {
                setConversation(prevConversation => [...prevConversation, {
                    sender: "Assistant",
                    message: data.completion
                }]);
            });

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return <div className="flex flex-col flex-auto h-full p-6">
        <h3 className="text-3xl font-medium text-gray-700">Chat Playground</h3>
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-8">
            <ModelIndicator modelName="Anthropic Claude 2" />
            <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                        {conversation.map((item, i) => item.sender === "Assistant" ? (
                                <Assistant text={item.message} key={i}/>
                            ) : (
                                <Human text={item.message} key={i}/>
                            ))}
                        {isLoading ? ( <Loader /> ) : ( <div></div> ) }
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow">
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                            placeholder="Send a message"
                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                    </div>
                </div>
                <div className="ml-4">
                    <button
                        type="button"
                        onClick={sendMessage}
                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                        <span>Send</span>
                        <span className="ml-2">
              <svg
                  className="w-4 h-4 transform rotate-45 -mt-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
                    </button>
                </div>
            </div>
        </div>
    </div>;
}