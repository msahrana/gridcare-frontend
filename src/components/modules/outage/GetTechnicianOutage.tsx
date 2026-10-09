import { IOutage } from '@/interface';

interface GetAllOutagesProps {
    data: IOutage[];
}

const GetTechnicianOutage = ({ data }: GetAllOutagesProps) => {
    return (
        <>
            {/* Outage Table */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Area</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Priority</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((outage) => (
                                <tr key={outage.id} className="border-b">
                                    {/* Title */}
                                    <td className="px-4 py-3 font-medium">
                                        {outage.title}
                                    </td>

                                    {/* Area */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {outage.area.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {outage.area.code}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-4 py-3">
                                        <span className="text-sm">
                                            {outage.type}
                                        </span>
                                    </td>

                                    {/* Priority */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                outage.priority === 'CRITICAL'
                                                    ? 'bg-red-100 text-red-700'
                                                    : outage.priority === 'HIGH'
                                                      ? 'bg-orange-100 text-orange-700'
                                                      : outage.priority ===
                                                          'MEDIUM'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-green-100 text-green-700'
                                            }`}
                                        >
                                            {outage.priority}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                outage.status === 'RESTORED' ||
                                                outage.status === 'CLOSED'
                                                    ? 'bg-green-100 text-green-700'
                                                    : outage.status ===
                                                        'CANCELLED'
                                                      ? 'bg-red-100 text-red-700'
                                                      : outage.status ===
                                                          'IN_PROGRESS'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : outage.status ===
                                                            'ASSIGNED'
                                                          ? 'bg-purple-100 text-purple-700'
                                                          : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {outage.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No outages found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GetTechnicianOutage;
