import CreateZone from '@/components/modules/zone/CreateZone';
import GetAllZones from '@/components/modules/zone/GetZone';

const Zones = () => {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">All Zones</h1>

                <CreateZone />
            </div>

            <GetAllZones />
        </div>
    );
};

export default Zones;
