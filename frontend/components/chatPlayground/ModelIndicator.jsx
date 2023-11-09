"use client"

export default function ModelIndicator({ modelName }) {
    return (
        <div className="w-64 mb-4">
            <div className="relative w-full">
                <div id="dropdown-button"
                        className="inline-flex justify-left w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
                    <span className="mr-auto">Model: {modelName}</span>
                </div>
            </div>
        </div>
    );
};