import React, { useState } from 'react';
import Image from 'next/image';
import Spinner from "@/components/Spinner";
import StyleSelector from "@/components/imagePlayground/StyleSelector";
import GlobalConfig from "@/app/app.config";

export default function ImageContainer() {
    const [imgSrc, setImgSrc] = useState('/placeholder.png');
    const [inputValue, setInputValue] = useState('');
    const [stylePreset, setStylePreset] = useState('no style');
    const [isLoading, setIsLoading] = useState(false);

    const endpoint = "/foundation-models/model/image/stability.stable-diffusion-xl/invoke";
    const api = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;

    const handleStyleChange = (newStyle) => {
        setStylePreset(newStyle);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const sendMessage = async () => {
        if (inputValue.trim() === '') { return; }

        setIsLoading(true);

        if (stylePreset === "no style") {
            setStylePreset("");
        }

        const prompt = {
            prompt: inputValue.trim(),
            stylePreset: stylePreset
        }

        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(prompt)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const body = await response.json();

            setImgSrc(`data:image/png;base64,${body.imageByteArray}`);
        } catch (error) {
            console.error('Error fetching image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-auto h-full p-6">
            <h3 className="text-3xl font-medium text-gray-700">Image Playground (Stable Diffusion XL)</h3>
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-8">
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
                                placeholder="Image prompt"
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
                        </div>
                    </div>
                    <StyleSelector onStyleChange={handleStyleChange}/>
                    <div className="ml-4">
                        <button
                            type="button"
                            onClick={sendMessage}
                            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                        >
                            <span>Create image</span>
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
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                            <div className="col-start-1 col-end-11 p-3 rounded-lg">
                                <div className="flex flex-row items-center w-[512px] h-[512px]">
                                    {isLoading ? (
                                        <Spinner />
                                    ) : (
                                        <Image src={imgSrc} alt="AI generated image" width="512" height="512" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}