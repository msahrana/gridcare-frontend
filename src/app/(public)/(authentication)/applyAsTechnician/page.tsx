import Image from 'next/image';
import ApplyAsTechnicianForm from '@/components/form/technician-apply-form';

const ApplyAsTechnician = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-3">
            <div className="flex flex-col col-span-2 gap-4 p-2 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    {/* <Logo /> */}
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xl">
                        <ApplyAsTechnicianForm />
                    </div>
                </div>
            </div>

            <div className="relative hidden bg-muted lg:block">
                <Image
                    src="/TechnicianPhoto.png"
                    width={800}
                    height={700}
                    alt="SR Healthcare"
                    className="absolute inset-0 h-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
};

export default ApplyAsTechnician;
