'use client';

import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { useCreateNotification } from '@/hooks';

import { ICreateNotification, User } from '@/interface';

interface CreateNotificationProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    users: User[];
}

const CreateNotification = ({
    open,
    onOpenChange,
    users,
}: CreateNotificationProps) => {
    const { mutate, isPending } = useCreateNotification();

    const [formData, setFormData] = useState<ICreateNotification>({
        userId: '',
        title: '',
        message: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        mutate(formData, {
            onSuccess: () => {
                setFormData({
                    userId: '',
                    title: '',
                    message: '',
                });

                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Create Notification</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* User */}
                    <div className="space-y-2">
                        <Label htmlFor="userId">Select User</Label>

                        <select
                            id="userId"
                            value={formData.userId}
                            disabled={isPending}
                            required
                            onChange={(event) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    userId: event.target.value,
                                }))
                            }
                            className="border-input bg-background h-10 w-full rounded-md border px-3 py-2 text-sm"
                        >
                            <option value="">Select User</option>

                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} - {user.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>

                        <Input
                            id="title"
                            value={formData.title}
                            disabled={isPending}
                            placeholder="Enter notification title"
                            required
                            onChange={(event) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    title: event.target.value,
                                }))
                            }
                        />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>

                        <Textarea
                            id="message"
                            value={formData.message}
                            disabled={isPending}
                            placeholder="Enter notification message"
                            rows={5}
                            required
                            onChange={(event) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    message: event.target.value,
                                }))
                            }
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isPending}
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Creating...' : 'Create Notification'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNotification;
