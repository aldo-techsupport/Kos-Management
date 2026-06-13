import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="liquid-bg relative flex min-h-svh flex-col items-center justify-center overflow-hidden p-6 md:p-10">
            {/* Floating orbs */}
            <div className="liquid-orb liquid-orb-1" />
            <div className="liquid-orb liquid-orb-2" />
            <div className="liquid-orb liquid-orb-3" />

            <div className="relative z-10 w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl">
                                <AppLogoIcon className="size-7 fill-current text-foreground" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-semibold text-foreground drop-shadow-sm">
                                {title}
                            </h1>
                            <p className="text-center text-sm text-foreground/60">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="liquid-glass p-8">
                        <div className="relative z-10">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
