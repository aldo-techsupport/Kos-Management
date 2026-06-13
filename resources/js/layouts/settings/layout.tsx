import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="liquid-bg relative min-h-screen overflow-hidden">
            {/* Background orbs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="liquid-orb liquid-orb-1 opacity-30" />
                <div className="liquid-orb liquid-orb-2 opacity-30" />
            </div>

            <div className="relative z-10 px-4 py-6">
                <Heading
                    title="Settings"
                    description="Manage your profile and account settings"
                />

                <div className="flex flex-col lg:flex-row lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-52">
                        <nav
                            className="flex flex-col space-y-1 space-x-0"
                            aria-label="Settings"
                        >
                            {sidebarNavItems.map((item, index) => (
                                <Link
                                    key={`${toUrl(item.href)}-${index}`}
                                    href={item.href}
                                    className={cn(
                                        'rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
                                        isCurrentOrParentUrl(item.href)
                                            ? 'liquid-glass text-foreground'
                                            : 'text-foreground/60 hover:text-foreground hover:bg-white/30'
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    <Separator className="my-6 lg:hidden" />

                    <div className="flex-1 md:max-w-2xl">
                        <section className="max-w-xl space-y-12">
                            <div className="liquid-glass p-8">
                                <div className="relative z-10">{children}</div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
