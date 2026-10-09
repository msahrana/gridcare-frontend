'use client';

import { IRestoration } from '@/interface';

interface GetAllRestorationProps {
    data: IRestoration[];
}

const GetTechnicianRestoration = ({ data }: GetAllRestorationProps) => {
    return (
        <>
            {/* =========================
                Restoration Table
            ========================== */}

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Outage</th>
                            <th className="px-4 py-3">Area</th>
                            <th className="px-4 py-3">Technician</th>
                            <th className="px-4 py-3">Started</th>
                            <th className="px-4 py-3">Completed</th>
                            <th className="px-4 py-3">Duration</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Remarks</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((restoration) => {
                                return (
                                    <tr
                                        key={restoration.id}
                                        className="border-b"
                                    >
                                        {/* Outage */}
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">
                                                    {restoration.outage.title}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {restoration.outage.type}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Area */}
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">
                                                    {
                                                        restoration.outage.area
                                                            .name
                                                    }
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {
                                                        restoration.outage.area
                                                            .code
                                                    }
                                                </p>
                                            </div>
                                        </td>

                                        {/* Technician */}
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">
                                                    {
                                                        restoration.technician
                                                            .employeeId
                                                    }
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {
                                                        restoration.technician
                                                            .phone
                                                    }
                                                </p>
                                            </div>
                                        </td>

                                        {/* Started */}
                                        <td className="px-4 py-3 text-sm">
                                            {new Date(
                                                restoration.startedAt,
                                            ).toLocaleString()}
                                        </td>

                                        {/* Completed */}
                                        <td className="px-4 py-3 text-sm">
                                            {restoration.completedAt
                                                ? new Date(
                                                      restoration.completedAt,
                                                  ).toLocaleString()
                                                : 'Not completed'}
                                        </td>

                                        {/* Duration */}
                                        <td className="px-4 py-3 text-sm">
                                            {restoration.duration !== null
                                                ? `${restoration.duration} min`
                                                : 'N/A'}
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-3">
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                    restoration.status ===
                                                    'COMPLETED'
                                                        ? 'bg-green-100 text-green-700'
                                                        : restoration.status ===
                                                            'CANCELLED'
                                                          ? 'bg-red-100 text-red-700'
                                                          : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                            >
                                                {restoration.status}
                                            </span>
                                        </td>

                                        {/* Remarks */}
                                        <td className="max-w-xs px-4 py-3 text-sm">
                                            <p className="line-clamp-2">
                                                {restoration.remarks || 'N/A'}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={9}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No restorations found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GetTechnicianRestoration;
