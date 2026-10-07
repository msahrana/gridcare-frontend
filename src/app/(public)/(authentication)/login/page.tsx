import Image from 'next/image';
import LoginForm from '@/components/form/login-form';

const LoginPage = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    {/* <Logo /> */}
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>

            <div className="relative h-full w-full">
                <Image
                    src="/Login-Photo.png"
                    alt="GridCare Login"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export default LoginPage;
