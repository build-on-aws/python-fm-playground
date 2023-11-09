"use client"

import React, {useState} from "react";
import { models } from '../../helpers/modelData';

export default function TextModelSelector({ model, onModelChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectModel = (item) => {
        setIsOpen(false);
        onModelChange(item);
    };

    return (
        <div className="w-64 mb-4">
            <div className="relative w-full">
                <button id="dropdown-button"
                    onClick={toggleDropdown}
                    className="inline-flex justify-left w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                    <span className="mr-auto">Model: {model.modelName}</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 ml-2 -mr-1 ml-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path fillRule="evenodd"
                                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd" />
                    </svg>
                </button>
                {isOpen && (
                <div className="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 text-sm w-64">
                    {models.map((item, index) => (
                        <a key={index} 
                            onClick={() => selectModel(item)}
                            href="#"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                            {item.modelName}
                        </a>
                    ))}
                    </div>
                    )}
            </div>
        </div>
    );
 };