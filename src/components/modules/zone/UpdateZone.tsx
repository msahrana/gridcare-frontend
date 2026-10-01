'use client';

import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';

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

import { useUpdateZone } from '@/hooks/zone.hook';

interface UpdateZoneProps {
    zone: {
        id: string;
        name: string;
        code: string;
        description?: string | null;
    };
}

const UpdateZone = ({ zone }: UpdateZoneProps) => {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState(zone.name);
    const [code, setCode] = useState(zone.code);
    const [description, setDescription] = useState(zone.description ?? '');

    const { mutate: updateZone, isPending } = useUpdateZone();

    // Update form values whenever the dialog receives different zone data
    useEffect(() => {
        if (open) {
            setName(zone.name);
            setCode(zone.code);
            setDescription(zone.description ?? '');
        }
    }, [open, zone]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateZone(
            {
                id: zone.id,
                name,
                code,
                description,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-[#0055B8] hover:text-white"
                >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit Zone</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Update Zone</DialogTitle>

                    <DialogDescription>
                        Update the production zone information below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor={`name-${zone.id}`}>
                            Zone Name <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            id={`name-${zone.id}`}
                            placeholder="e.g. Production Zone A"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Code */}
                    <div className="space-y-2">
                        <Label htmlFor={`code-${zone.id}`}>
                            Zone Code <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            id={`code-${zone.id}`}
                            placeholder="e.g. ZONE-A"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor={`description-${zone.id}`}>
                            Description
                        </Label>

                        <Textarea
                            id={`description-${zone.id}`}
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
                            {isPending ? 'Updating...' : 'Update Zone'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateZone;
