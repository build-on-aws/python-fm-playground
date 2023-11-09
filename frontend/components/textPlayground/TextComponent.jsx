"use client";

import React, { useState } from "react";
import GlobalConfig from "@/app/app.config"
import TextModelSelector from "./TextModelSelector";
import Textarea from "./Textarea";
import { defaultModel, defaultPayload } from "@/helpers/modelData";
import NumericInput from "./NumericInput";

export default function TextContainer() {
    const [isLoading, setIsLoading] = useState(false);
    const [payload, setPayload] = useState(defaultPayload);
    const [selectedModel, setSelectedModel] = useState(defaultModel);

    const onModelChange = (newModel) => {
        setSelectedModel(newModel);
        setPrompt("");
        setTemperature(newModel.temperatureRange.default);
        setMaxTokens(newModel.maxTokenRange.default);
    }

    const setPrompt = (newPrompt) => setPayload(
        (prevPayload) => ({ ...prevPayload, prompt: newPrompt })
    );

    const setTemperature = (newTemperature) => setPayload(
        (prevPayload) => ({ ...prevPayload, temperature: newTemperature })
    );

    const setMaxTokens = (newMaxTokens) => setPayload(
        (prevPayload) => ({ ...prevPayload, maxTokens: newMaxTokens })
    );

    const handlePromptChange = (e) => setPrompt(e.target.value);

    const handleTemperatureChange = (value) => setTemperature(value);

    const handleMaxTokensChange = (value) => setMaxTokens(value);

    const getButtonClass = () => {
        const inactiveButtonClass = "flex w-[100px] items-center justify-center bg-indigo-300 rounded-xl text-white px-3 py-2 flex-shrink-0";
        const activeButtonClass = "flex w-[100px] items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-3 py-2 flex-shrink-0";
        return isLoading ? inactiveButtonClass : activeButtonClass;
    }

    const sendMessage = async () => {
        if (payload.prompt === null || payload.prompt === undefined || payload.prompt.trim() === "") { return; }

        setIsLoading(true);

        const endpoint = `/foundation-models/model/text/${selectedModel.modelId}/invoke`;
        const api = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;

        try {
            const body = JSON.stringify({
                prompt: payload.prompt,
                temperature: payload.temperature,
                maxTokens: payload.maxTokens,
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
                if (selectedModel.modelId === "anthropic.claude-v2") {
                    setPrompt(`Human: ${payload.prompt}\n\nAssistant: ${data.completion}\n\nHuman: `)
                } else {
                    setPrompt(`${payload.prompt}\n\n${data.completion}\n\n`)
                }
            });

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-auto h-full p-6">
            <h3 className="text-3xl font-medium text-gray-700">Text Playground</h3>
            <div className="flex flex-col flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-8">
                <TextModelSelector model={selectedModel} onModelChange={onModelChange} />
                <Textarea 
                    value={payload.prompt}
                    disabled={isLoading}
                    onChange={handlePromptChange} 
                />
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
                            <NumericInput
                                className="relative w-14"
                                placeholder={selectedModel.temperatureRange.default}
                                value={payload.temperature}
                                range={selectedModel.temperatureRange}
                                disabled={isLoading}
                                callback={handleTemperatureChange}
                            />
                        </div>
                        <div className="ml-8">
                            <div className="relative">
                                <label htmlFor="tokens">
                                    Max. length:
                                </label>
                            </div>
                        </div>
                        <div className="ml-4">
                            <NumericInput 
                                className="relative w-20"
                                placeholder={selectedModel.maxTokenRange.default}
                                value={payload.maxTokens}
                                range={selectedModel.maxTokenRange}
                                disabled={isLoading}
                                callback={handleMaxTokensChange}
                            />
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
