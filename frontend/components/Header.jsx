"use client";

export default function Header() {
    return (
        <div className="w-full h-12 bg-black text-white fixed z-10">
            <div className="flex items-center h-full px-6">
                <a href="/" className="text-lg no-underline text-white hover:text-gray-200">Python FM Playground</a>
            </div>
        </div>
    )
}