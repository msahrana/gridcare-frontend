import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const GlobalLoading = () => {
    return (
        <div className=" min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 px-4 relative">
            {/* Animated Background */}

            <div
                className="
                    absolute
                    top-20
                    left-20
                    h-40
                    w-40
                    rounded-full
                    bg-blue-400/30
                    blur-3xl
                    animate-pulse
                "
            />

            <div
                className="
                    absolute
                    bottom-20
                    right-20
                    h-52
                    w-52
                    rounded-full
                    bg-pink-400/30
                    blur-3xl
                    animate-pulse
                "
            />

            <Card
                className="
                    relative
                    z-10
                    w-full
                    max-w-md
                    border-none
                    shadow-2xl
                    backdrop-blur
                    bg-white/80
                    dark:bg-slate-900/80
                "
            >
                <CardContent
                    className="
                        p-8
                        space-y-6
                    "
                >
                    {/* Colorful Loader */}

                    <div
                        className="
                            flex
                            justify-center
                        "
                    >
                        <div
                            className="
                                relative
                                flex
                                items-center
                                justify-center
                                h-20
                                w-20
                                rounded-full
                                bg-linear-to-r
                                from-blue-500
                                via-purple-500
                                to-pink-500
                                animate-spin
                            "
                        >
                            <div
                                className="
                                    absolute
                                    h-14
                                    w-14
                                    rounded-full
                                    bg-white
                                    dark:bg-slate-900
                                "
                            />

                            <Loader2
                                className="
                                    relative
                                    h-8
                                    w-8
                                    text-purple-600
                                    animate-spin
                                "
                            />
                        </div>
                    </div>

                    {/* Text */}

                    <div
                        className="
                            text-center
                            space-y-2
                        "
                    >
                        <h2
                            className="
                                text-3xl
                                font-bold
                                bg-linear-to-r
                                from-blue-600
                                via-purple-600
                                to-pink-600
                                bg-clip-text
                                text-transparent
                            "
                        >
                            Loading...
                        </h2>

                        <p
                            className="
                                text-muted-foreground
                            "
                        >
                            Preparing your experience, please wait.
                        </p>
                    </div>

                    {/* Skeleton */}

                    <div
                        className="
                            space-y-3
                        "
                    >
                        <Skeleton
                            className="
                                h-4
                                w-full
                                bg-blue-200/60
                            "
                        />

                        <Skeleton
                            className="
                                h-4
                                w-5/6
                                bg-purple-200/60
                            "
                        />

                        <Skeleton
                            className="
                                h-4
                                w-4/6
                                bg-pink-200/60
                            "
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default GlobalLoading;
