import React from "react";

export default function ModelDetails({data}) {

    return (
        <table className="min-w-full">
            <tbody className="bg-white">
            <tr>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    Provider:
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {data.providerName}
                </td>
            </tr>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    Name:
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {data.modelName}
                </td>
            </tr>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    Model ID:
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {data.modelId}
                </td>
            </tr>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    Customizations:
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {data.customizationsSupported}
                </td>
            </tr>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    Output Modalities:
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {data.outputModalities}
                </td>
            </tr>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    Model ARN:
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {data.modelArn}
                </td>
            </tr>
            </tbody>
        </table>
    );
};