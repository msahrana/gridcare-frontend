import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface SearchInputProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchInput = ({
    value,
    onChange,
    placeholder = 'Search...',
    className,
}: SearchInputProps) => {
    return (
        <div className={className}>
            <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

                <Input
                    type="search"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="pl-9"
                />
            </div>
        </div>
    );
};

export default SearchInput;
