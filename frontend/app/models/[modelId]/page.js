"use client"

import React, {useEffect, useState} from "react";
import ModelDetails from "@/components/foundationModels/ModelDetails";
import GlobalConfig from "@/app/app.config";

export default function Model({params: {modelId}}) {
    const [data, setData] = useState(null);

    const endpoint = `/foundation-models/model/${modelId}`;
    const api = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(api);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Fetching data error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container px-6 py-8 mx-auto">
            <h3 className="text-3xl font-medium text-gray-700">Foundation Model Details</h3>
            <div className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div
                        className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        {data ?
                            <ModelDetails data={data} /> : <div></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}