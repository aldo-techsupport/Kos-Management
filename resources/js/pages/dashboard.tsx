import { Head } from '@inertiajs/react';
import { Building2, Users, Wallet, TrendingUp } from 'lucide-react';
import { dashboard } from '@/routes';

function GlassStatCard({
    icon: Icon,
    label,
    value,
    trend,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    trend?: string;
}) {
    return (
        <div className="liquid-glass-light dark:liquid-glass p-6">
            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-foreground/60 dark:text-white/60">
                        {label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-foreground dark:text-white">
                        {value}
                    </p>
                    {trend && (
                        <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-300/80">
                            {trend}
                        </p>
                    )}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm dark:border-white/15 dark:bg-white/10">
                    <Icon className="h-5 w-5 text-foreground/70 dark:text-white/70" />
                </div>
            </div>
        </div>
    );
}

function GlassCard({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`liquid-glass-light dark:liquid-glass p-6 ${className}`}>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="liquid-bg-light dark:liquid-bg relative min-h-screen overflow-hidden">
                {/* Background orbs */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="liquid-orb liquid-orb-1 opacity-30 dark:opacity-50" />
                    <div className="liquid-orb liquid-orb-2 opacity-30 dark:opacity-50" />
                    <div className="liquid-orb liquid-orb-3 opacity-20 dark:opacity-40" />
                </div>

                <div className="relative z-10 flex h-full flex-1 flex-col gap-6 p-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-foreground dark:text-white">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-foreground/60 dark:text-white/60">
                            Overview properti kos-kosan Anda
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <GlassStatCard
                            icon={Building2}
                            label="Total Kamar"
                            value="24"
                            trend="+2 bulan ini"
                        />
                        <GlassStatCard
                            icon={Users}
                            label="Penghuni Aktif"
                            value="21"
                            trend="87.5% okupansi"
                        />
                        <GlassStatCard
                            icon={Wallet}
                            label="Pendapatan"
                            value="Rp 42.5jt"
                            trend="+12% dari bulan lalu"
                        />
                        <GlassStatCard
                            icon={TrendingUp}
                            label="Rata-rata Rating"
                            value="4.8"
                            trend="⭐ Excellent"
                        />
                    </div>

                    {/* Main Content Area */}
                    <div className="grid flex-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
                        <GlassCard>
                            <h2 className="mb-4 text-lg font-semibold text-foreground dark:text-white">
                                Aktivitas Terbaru
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { action: 'Pembayaran diterima', detail: 'Kamar 12 - Rp 2.500.000', time: '2 jam lalu' },
                                    { action: 'Penghuni baru check-in', detail: 'Kamar 08 - Ahmad Fauzi', time: '5 jam lalu' },
                                    { action: 'Maintenance selesai', detail: 'Kamar 03 - AC service', time: '1 hari lalu' },
                                    { action: 'Perpanjangan kontrak', detail: 'Kamar 15 - 6 bulan', time: '2 hari lalu' },
                                    { action: 'Pembayaran diterima', detail: 'Kamar 07 - Rp 2.800.000', time: '3 hari lalu' },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-foreground dark:text-white/90">
                                                {item.action}
                                            </p>
                                            <p className="text-xs text-foreground/60 dark:text-white/50">
                                                {item.detail}
                                            </p>
                                        </div>
                                        <span className="text-xs text-foreground/50 dark:text-white/40">
                                            {item.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        <div className="flex flex-col gap-6">
                            <GlassCard>
                                <h2 className="mb-4 text-lg font-semibold text-foreground dark:text-white">
                                    Kamar Tersedia
                                </h2>
                                <div className="space-y-3">
                                    {[
                                        { room: 'Kamar 05', type: 'Standard', price: 'Rp 2.500.000/bln' },
                                        { room: 'Kamar 19', type: 'Premium', price: 'Rp 3.200.000/bln' },
                                        { room: 'Kamar 22', type: 'Standard', price: 'Rp 2.500.000/bln' },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-foreground dark:text-white/90">
                                                    {item.room}
                                                </p>
                                                <p className="text-xs text-foreground/60 dark:text-white/50">
                                                    {item.type}
                                                </p>
                                            </div>
                                            <span className="text-xs font-medium text-foreground/70 dark:text-white/60">
                                                {item.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>

                            <GlassCard>
                                <h2 className="mb-4 text-lg font-semibold text-foreground dark:text-white">
                                    Reminder
                                </h2>
                                <div className="space-y-3">
                                    {[
                                        { text: 'Tagihan listrik jatuh tempo', date: '15 Jun' },
                                        { text: 'Kontrak kamar 11 berakhir', date: '20 Jun' },
                                        { text: 'Jadwal fumigasi', date: '25 Jun' },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between rounded-xl border border-amber-200/20 bg-amber-100/10 p-3 dark:border-amber-200/10 dark:bg-amber-200/[0.04]"
                                        >
                                            <p className="text-sm text-foreground/80 dark:text-white/70">
                                                {item.text}
                                            </p>
                                            <span className="text-xs font-medium text-amber-700 dark:text-amber-200/80">
                                                {item.date}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
