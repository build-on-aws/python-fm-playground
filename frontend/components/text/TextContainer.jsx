"use client";

import React, { useState } from "react";
import GlobalConfig from "@/app/app.config"
import ModelSelector from "./ModelSelector";

export default function TextContainer() {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [temperatureValue, setTemperatureValue] = useState(0.8);
    const [maxTokensValue, setMaxTokensValue] = useState(300);

    const onModelChange = (newModel) => {
        console.log('Model changed to:', newModel);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleTemperatureValueChange = (e) => {
        let value = e.target.value;

        if (isNaN(value)) {
            value = "";
        } else if (value > 1) {
            value = 1;
        }

        setTemperatureValue(value);
    }

    const handleTemperatureValueBlur = (e) => {
        let value = e.target.value;

        if (isNaN(value) || value === "") {
            value = 0.8;
        } else if (value > 1) {
            value = 1;
        }

        setTemperatureValue(value);
    }

    const handleMaxTokensValueChange = (e) => {
        let value = e.target.value;

        if (isNaN(value)) {
            value = maxTokensValue;
        } else if (value > 2048) {
            value = 2048;
        }

        setMaxTokensValue(value);
    };

    const handleMaxTokensValueBlur = (e) => {
        let value = e.target.value;

        if (isNaN(value) || value === "") {
            value = 300;
        } else if (value < 85) {
            value = 85;
        } else if (value > 2048) {
            value = 2048;
        }

        setMaxTokensValue(value);
    };

    const isNullOrBlankOrEmpty = (str) => {
        return str == null || str.match(/^ *$/) !== null;
    }

    const getButtonClass = () => {
        const inactiveButtonClass = "flex w-[100px] items-center justify-center bg-indigo-300 rounded-xl text-white px-3 py-2 flex-shrink-0";
        const activeButtonClass = "flex w-[100px] items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-3 py-2 flex-shrink-0";
        return isLoading ? inactiveButtonClass : activeButtonClass;
    }

    const sendMessage = async () => {
        if (isNullOrBlankOrEmpty(inputValue)) { return; }

        setIsLoading(true);

        const endpoint = "/foundation-models/model/text/anthropic.claude-v2/invoke";
        const api = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;

        try {

            const body = JSON.stringify({
                prompt: inputValue,
                temperature: temperatureValue,
                maxTokens: maxTokensValue
            });

            const response = await fetch(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await response.json().then(data => {
                setInputValue(inputValue => inputValue + "\n\nAssistant: " + data.completion + "\n\n")
            });

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-auto h-full p-6">
            <ModelSelector onModelChange={ onModelChange } />
            <h3 className="text-3xl font-medium text-gray-700">Text Playground (Anthropic Claude V2)</h3>
            <div className="flex flex-col flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-8">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                        <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200">
                            <div className="p-0 bg-white rounded-xl">
                                <textarea id="input" rows="20"
                                        disabled={isLoading}
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        className="block p-4 w-full text-sm text-gray-800 bg-white"
                                        placeholder="Write something..." required>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                        <div className="">
                            <div className="relative w-full">
                                <label htmlFor="temperature">
                                    Temperature:
                                </label>
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="relative w-14">
                                <input
                                    placeholder="0.8"
                                    id="temperature"
                                    type="text"
                                    value={temperatureValue}
                                    onChange={handleTemperatureValueChange}
                                    onBlur={handleTemperatureValueBlur}
                                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                />

                            </div>
                        </div>
                        <div className="ml-8">
                            <div className="relative">
                                <label htmlFor="tokens">
                                    Max. length:
                                </label>
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="relative w-20">
                                <input
                                    placeholder="300"
                                    id="tokens"
                                    type="text"
                                    value={maxTokensValue}
                                    onChange={handleMaxTokensValueChange}
                                    onBlur={handleMaxTokensValueBlur}
                                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                />

                            </div>
                        </div>
                        <div className="ml-4 ml-auto">
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={sendMessage}
                                className={getButtonClass()}>
                                <span>Send</span>
                                <span className="ml-2">
                                <svg
                                    className="w-4 h-4 transform rotate-45 -mt-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
                                </path>
                                </svg>
                            </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};