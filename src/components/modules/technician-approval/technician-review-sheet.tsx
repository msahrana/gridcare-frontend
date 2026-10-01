import { BadgeCheck, Mail, Phone, ShieldCheck, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { useApproveTechnician, useGetAllTechnicians } from '@/hooks';
import { ApproveTechnicianPayload, TechnicianParams } from '@/interface';

interface Props extends TechnicianParams {
    selectedId: string;
    onClose: () => void;
}

const TechnicianReviewSheet = ({ selectedId, onClose, ...params }: Props) => {
    const [confirmRejection, setConfirmRejection] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    const { data } = useGetAllTechnicians(params);
    const { mutate: verify, isPending } = useApproveTechnician();

    const selectedTechnician = data?.data?.find(
        (technician) => technician.id === selectedId,
    );

    const handleClose = () => {
        setConfirmRejection(false);
        setRejectionReason('');
        onClose();
    };

    const handleReviewAction = (
        verificationStatus: 'APPROVED' | 'REJECTED',
    ) => {
        const reviewData: ApproveTechnicianPayload = {
            technicianId: selectedId,
            verificationStatus,
            rejectionReason: rejectionReason.trim() || undefined,
        };

        verify(reviewData, {
            onSuccess: (res) => {
                toast.add({
                    title:
                        verificationStatus === 'APPROVED'
                            ? 'Technician Approved'
                            : 'Technician Rejected',
                    description:
                        res.message ||
                        'Technician status has been updated successfully',
                    type: 'success',
                });

                handleClose();
            },
            onError: (err) => {
                toast.add({
                    title: 'Action failed',
                    description:
                        err.message || 'Something went wrong. Please try again',
                    type: 'error',
                });
            },
        });
    };

    if (!selectedTechnician) {
        return null;
    }

    const detailRow = (label: string, value?: string | number | null) => (
        <div className="flex items-start justify-between gap-4 text-sm">
            <span className="shrink-0 text-muted-foreground">{label}</span>

            <span className="max-w-55 text-right font-medium wrap-break-words">
                {value ?? (
                    <span className="font-normal text-muted-foreground">—</span>
                )}
            </span>
        </div>
    );

    return (
        <Sheet open={!!selectedId} onOpenChange={handleClose}>
            <SheetContent side="left" className="gap-0 sm:max-w-md">
                <SheetHeader className="border-b">
                    <SheetTitle>Review and take action</SheetTitle>

                    <SheetDescription>
                        Review the technician application before taking action.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
                    {/* Technician */}
                    <div className="flex items-start gap-3">
                        <span className="rounded-full bg-primary/10 p-2.5">
                            <UserRound className="size-5 text-primary" />
                        </span>

                        <div className="min-w-0">
                            <p className="truncate font-semibold">
                                {selectedTechnician.user.name}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {selectedTechnician.employeeId}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Contact */}
                    <div className="space-y-3">
                        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            Contact
                        </p>

                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="size-4 shrink-0 text-muted-foreground" />

                            <span
                                className="truncate"
                                title={selectedTechnician.user.email}
                            >
                                {selectedTechnician.user.email}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Phone className="size-4 shrink-0 text-muted-foreground" />

                            <span>{selectedTechnician.phone || '—'}</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Technician information */}
                    <div className="space-y-3">
                        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            Technician Information
                        </p>

                        {detailRow(
                            'Employee ID',
                            selectedTechnician.employeeId,
                        )}

                        {detailRow(
                            'Experience',
                            `${selectedTechnician.experienceYears} yrs`,
                        )}

                        {detailRow('Status', selectedTechnician.status)}
                    </div>

                    <Separator />

                    {/* Skills */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            Skills
                        </p>

                        {selectedTechnician.skills ? (
                            <div className="space-y-1 text-sm text-muted-foreground">
                                {selectedTechnician.skills
                                    .split(',')
                                    .map((skill) => {
                                        const trimmedSkill = skill.trim();

                                        return (
                                            <div
                                                key={`${selectedTechnician.id}-${trimmedSkill}`}
                                            >
                                                • {trimmedSkill}
                                            </div>
                                        );
                                    })}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">—</p>
                        )}
                    </div>

                    <Separator />

                    {/* Verification */}
                    <div className="space-y-3">
                        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            Verification
                        </p>

                        <div className="flex items-center gap-2 text-sm">
                            <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />

                            <span>{selectedTechnician.verificationStatus}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <BadgeCheck className="size-4 shrink-0 text-muted-foreground" />

                            <span>
                                {selectedTechnician.user.emailVerified
                                    ? 'Email verified'
                                    : 'Email not verified'}
                            </span>
                        </div>
                    </div>

                    {/* Resume */}
                    {selectedTechnician.resume && (
                        <>
                            <Separator />

                            <div className="space-y-2">
                                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                                    Resume
                                </p>

                                <a
                                    href={selectedTechnician.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-primary underline"
                                >
                                    View Resume
                                </a>
                            </div>
                        </>
                    )}

                    {/* Rejection reason */}
                    {selectedTechnician.rejectionReason && (
                        <>
                            <Separator />

                            <div className="space-y-2">
                                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                                    Rejection Reason
                                </p>

                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {selectedTechnician.rejectionReason}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                <SheetFooter className="border-t">
                    {confirmRejection ? (
                        <div className="flex flex-col gap-3">
                            <Textarea
                                value={rejectionReason}
                                onChange={(e) =>
                                    setRejectionReason(e.target.value)
                                }
                                placeholder="Tell the technician why this application is being rejected…"
                                rows={4}
                                disabled={isPending}
                                autoFocus
                            />

                            <div className="flex gap-2">
                                <Button
                                    onClick={handleClose}
                                    variant="outline"
                                    size="lg"
                                    className="flex-1"
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={() =>
                                        handleReviewAction('REJECTED')
                                    }
                                    variant="destructive"
                                    size="lg"
                                    className="flex-1"
                                    disabled={
                                        !rejectionReason.trim() || isPending
                                    }
                                >
                                    {isPending && <Spinner />}

                                    {isPending
                                        ? 'Rejecting…'
                                        : 'Confirm Rejection'}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setConfirmRejection(true)}
                                variant="destructive"
                                size="lg"
                                className="flex-1"
                                disabled={isPending}
                            >
                                Reject
                            </Button>

                            <Button
                                onClick={() => handleReviewAction('APPROVED')}
                                variant="default"
                                size="lg"
                                className="flex-1"
                                disabled={isPending}
                            >
                                {isPending && <Spinner />}

                                {isPending ? 'Approving…' : 'Approve'}
                            </Button>
                        </div>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default TechnicianReviewSheet;
