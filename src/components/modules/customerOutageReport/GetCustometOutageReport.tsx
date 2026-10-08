'use client';



import { IOutageReport } from '@/interface';

interface GetAllOutageReportsProps {
    data: IOutageReport[];
}

const GetCustometOutageReport = ({ data }: GetAllOutageReportsProps) => {
    

    return (
        <>
            {/* Outage Report Table */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Outage</th>
                            <th className="px-4 py-3">Area</th>
                            <th className="px-4 py-3">Reporter</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Location</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((outageReport) => (
                                <tr key={outageReport.id} className="border-b">
                                    {/* Outage */}
                                    <td className="px-4 py-3">
                                        {outageReport.outage ? (
                                            <div>
                                                <p className="font-medium">
                                                    {outageReport.outage.title}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {outageReport.outage.status}
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">
                                                No outage linked
                                            </span>
                                        )}
                                    </td>

                                    {/* Area */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {outageReport.area.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {outageReport.area.code}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Reporter */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {outageReport.reporter.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {outageReport.reporter.email}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Description */}
                                    <td className="max-w-md px-4 py-3">
                                        <p className="line-clamp-2 text-sm">
                                            {outageReport.description}
                                        </p>
                                    </td>

                                    {/* Location */}
                                    <td className="px-4 py-3">
                                        <div className="text-sm">
                                            <p>
                                                Lat:{' '}
                                                {outageReport.latitude ?? 'N/A'}
                                            </p>

                                            <p>
                                                Lng:{' '}
                                                {outageReport.longitude ??
                                                    'N/A'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No outage reports found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GetCustometOutageReport;
