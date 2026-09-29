import { Dispatch, SetStateAction } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useSuspenseGetAllTechnicians } from '@/hooks';
import { TechnicianParams } from '@/interface';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TablePagination from '@/components/ui/table-pagination';

interface Props extends TechnicianParams {
    handleReview: Dispatch<SetStateAction<string>>;
    handlePageChange: Dispatch<SetStateAction<number>>;
}

const TechnicianApprovalTable = ({
    handleReview,
    handlePageChange,
    ...params
}: Props) => {
    const { data } = useSuspenseGetAllTechnicians(params);

    const technicians = data?.data ?? [];
    const totalPages = data?.meta?.totalPages ?? 0;
    const isEmpty = technicians.length === 0;

    return (
        <>
            <div className="overflow-hidden rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
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
                        {isEmpty ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={6}>
                                    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                                        <span className="rounded-full bg-muted p-3">
                                            <SearchX className="size-5 text-muted-foreground" />
                                        </span>
                                        <p className="font-medium">
                                            No technicians found
                                        </p>
                                        <p className="max-w-sm text-sm text-muted-foreground">
                                            {params.searchTerm
                                                ? `No results for "${params.searchTerm}". Try a different name or email.`
                                                : 'There are no technicians in this view yet.'}
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            technicians.map((technician) => (
                                <TableRow key={technician.id}>
                                    <TableCell>{technician.name}</TableCell>

                                    <TableCell>{technician.email}</TableCell>
                                    <TableCell>
                                        {technician.contactNumber
                                            ? technician.contactNumber
                                            : '- - -'}
                                    </TableCell>

                                    <TableCell>
                                        {technician.experienceYears}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {technician.user.emailVerified ? (
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    handleReview(technician.id)
                                                }
                                                disabled={
                                                    technician.verificationStatus !==
                                                    'PENDING'
                                                }
                                            >
                                                Review
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled
                                                variant="outline"
                                                size="sm"
                                            >
                                                Not Verified
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="my-5">
                    <TablePagination
                        page={params.page ?? 1}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            )}
        </>
    );
};

export default TechnicianApprovalTable;
