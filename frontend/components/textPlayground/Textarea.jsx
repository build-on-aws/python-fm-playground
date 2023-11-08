"use client";

export default function Textarea({ value, disabled, onChange }) {

    return (
        <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
                <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-0 bg-white rounded-xl">
                        <textarea id="input" rows="20"
                                disabled={disabled}
                                value={value}
                                onChange={onChange}
                                className="block p-4 w-full text-sm text-gray-800 bg-white"
                                placeholder="Write something..." required>
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};