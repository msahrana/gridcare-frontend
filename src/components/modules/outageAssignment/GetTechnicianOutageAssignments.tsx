'use client';

import { IOutageAssignment } from '@/interface';

interface GetOutageAssignmentsProps {
    data: IOutageAssignment[];
}

const GetTechnicianOutageAssignments = ({
    data,
}: GetOutageAssignmentsProps) => {
    return (
        <>
            {/* Outage Assignment Table */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Outage Title</th>
                            <th className="px-4 py-3">Technician Id</th>
                            <th className="px-4 py-3">Outage Status</th>
                            <th className="px-4 py-3">Outage Priority</th>
                            <th className="px-4 py-3">Assignment Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((assignment) => (
                                <tr key={assignment.id} className="border-b">
                                    {/* Outage */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {assignment.outage.title}
                                            </p>

                                            <p className="text-xs text-muted-foreground w-auto">
                                                {assignment.outage.description}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Technician */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {
                                                    assignment.technician
                                                        .employeeId
                                                }
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {assignment.technician.phone}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-4 py-3">
                                        <span className="text-sm">
                                            {assignment.outage.type}
                                        </span>
                                    </td>

                                    {/* Priority */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                assignment.outage.priority ===
                                                'CRITICAL'
                                                    ? 'bg-red-100 text-red-700'
                                                    : assignment.outage
                                                            .priority === 'HIGH'
                                                      ? 'bg-orange-100 text-orange-700'
                                                      : assignment.outage
                                                              .priority ===
                                                          'MEDIUM'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-green-100 text-green-700'
                                            }`}
                                        >
                                            {assignment.outage.priority}
                                        </span>
                                    </td>

                                    {/* Assignment Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                assignment.status ===
                                                'COMPLETED'
                                                    ? 'bg-green-100 text-green-700'
                                                    : assignment.status ===
                                                        'CANCELLED'
                                                      ? 'bg-red-100 text-red-700'
                                                      : assignment.status ===
                                                          'IN_PROGRESS'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : assignment.status ===
                                                            'ACCEPTED'
                                                          ? 'bg-cyan-100 text-cyan-700'
                                                          : 'bg-purple-100 text-purple-700'
                                            }`}
                                        >
                                            {assignment.status}
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
                                    No outage assignments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GetTechnicianOutageAssignments;
