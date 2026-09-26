import Image from 'next/image';
import RegisterForm from '@/components/form/register-form';

const RegisterPage = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    {/* <Logo /> */}
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <RegisterForm />
                    </div>
                </div>
            </div>

            <div className="relative">
                <Image
                    src="/register.png"
                    alt="Register for GridCare"
                    width={600}
                    height={600}
                    priority
                    className="h-auto w-full object-contain"
                />
            </div>
        </div>
    );
};

export default RegisterPage;
