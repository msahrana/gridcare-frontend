'use client';

import { useGetAllZones } from '@/hooks/zone.hook';

const GetAllZones = () => {
    const { data, isLoading, isError } = useGetAllZones();

    if (isLoading) {
        return <div>Loading zones...</div>;
    }

    if (isError) {
        return <div>Failed to load zones.</div>;
    }

    return (
        <div className="overflow-x-auto rounded-lg border">
            <table className="w-full">
                <thead>
                    <tr className="border-b bg-gray-100 text-left">
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Code</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {data?.data?.map((zone) => (
                        <tr key={zone.id} className="border-b">
                            <td className="px-4 py-3 font-medium">
                                {zone.name}
                            </td>

                            <td className="px-4 py-3">{zone.code}</td>

                            <td className="px-4 py-3">{zone.description}</td>

                            <td className="px-4 py-3">
                                <span
                                    className={`font-medium ${
                                        zone.isActive
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {zone.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetAllZones;
