import TechnicianApprovalTabs from '@/components/modules/technician-approval/technician-approval-tabs';

const AdminApproveTechnician = () => {
    return (
        <section className="p-5">
            <div>
                <h1 className="text-2xl font-bold">Technician Approval:</h1>
                <p>Please review and make sure the given data is real.</p>
            </div>

            <TechnicianApprovalTabs />
        </section>
    );
};

export default AdminApproveTechnician;
