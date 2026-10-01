'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const TechnicianApprovalTableLoading = () => {
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead>Name</TableHead>
                        <TableHead>EmployeeId</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Experience (Years)</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {[1, 2, 3].map((item) => (
                        <TableRow key={item}>
                            <TableCell colSpan={7}>
                                <Skeleton className="h-5 w-full" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TechnicianApprovalTableLoading;
