import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from "@/components/Navigation";
import Content from "@/components/Content";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Python FM Playground',
    description: 'This sample application shows how to use the Amazon Bedrock SDK for Python.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="bg-gray-200">
        <div>
            <div className="flex h-screen bg-gray-200">
                <Navigation />
                <Content children={children} />
            </div>
        </div>
        </body>
        </html>
    )
}
