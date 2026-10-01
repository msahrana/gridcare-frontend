'use client';

import { useState } from 'react';

import CreateZone from '@/components/modules/zone/CreateZone';
import GetAllZones from '@/components/modules/zone/GetZone';
import SearchInput from '@/components/shared/SearchInput';

const Zones = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Zones</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search by zone or code..."
                    />
                </div>

                <CreateZone />
            </div>

            <GetAllZones searchTerm={searchTerm} />
        </div>
    );
};

export default Zones;
