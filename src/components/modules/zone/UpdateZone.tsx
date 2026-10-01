'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { useCreateZone } from '@/hooks/zone.hook';

const CreateZone = () => {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

    const { mutate: createZone, isPending } = useCreateZone();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createZone(
            {
                name,
                code,
                description,
            },
            {
                onSuccess: () => {
                    setOpen(false);

                    // Reset form
                    setName('');
                    setCode('');
                    setDescription('');
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="hover:bg-[#0055B8]">Create New Zone</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Create New Zone</DialogTitle>

                    <DialogDescription>
                        Create a new production zone for your organization.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Zone Name <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            id="name"
                            placeholder="e.g. Production Zone A"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Code */}
                    <div className="space-y-2">
                        <Label htmlFor="code">
                            Zone Code <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            id="code"
                            placeholder="e.g. ZONE-A"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>

                        <Textarea
                            id="description"
                            placeholder="Enter zone description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="hover:bg-[#0055B8]"
                            disabled={isPending}
                        >
                            {isPending ? 'Creating...' : 'Create Zone'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateZone;
