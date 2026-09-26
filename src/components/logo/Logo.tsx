import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
    showText?: boolean;
    className?: string;
}

export default function Logo({ showText = true, className = '' }: LogoProps) {
    return (
        <Link
            href="/"
            aria-label="GridCare Home"
            className={`inline-flex items-center gap-3 ${className}`}
        >
            {/* Logo Icon */}
            <Image
                src="/icon.png"
                width={400}
                height={400}
                alt="GridCare"
                className="size-20 rounded-xl object-cover"
                priority
            />

            {/* Logo Text */}
            {showText && (
                <div className="leading-none">
                    <p className="text-5xl font-extrabold tracking-tight text-slate-900">
                        Grid<span className="text-[#ff8a00]">Care</span>
                    </p>

                    <p className="mt-1 text-[8px] font-medium tracking-wide text-blue-500 ">
                        <span className="text-[#ff8a00]">-</span> SMART POWER
                        OUTAGE MANAGEMENT SYSTEM{' '}
                        <span className="text-[#ff8a00]">-</span>
                    </p>
                </div>
            )}
        </Link>
    );
}
