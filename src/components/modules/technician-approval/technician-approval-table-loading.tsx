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
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>License No.</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact No.</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Experience (Years)</TableHead>
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
