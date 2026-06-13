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
        <div className="liquid-glass p-6">
            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-foreground/60">
                        {label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-foreground">
                        {value}
                    </p>
                    {trend && (
                        <p className="mt-1 text-xs font-medium text-emerald-600">
                            {trend}
                        </p>
                    )}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-black/5 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-foreground/70" />
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
        <div className={`liquid-glass p-6 ${className}`}>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="liquid-bg relative flex flex-1 flex-col overflow-hidden rounded-xl">
                {/* Background orbs */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="liquid-orb liquid-orb-1 opacity-30" />
                    <div className="liquid-orb liquid-orb-2 opacity-30" />
                    <div className="liquid-orb liquid-orb-3 opacity-20" />
                </div>

                <div className="relative z-10 flex flex-1 flex-col gap-6 p-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-foreground/60">
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
                            <h2 className="mb-4 text-lg font-semibold text-foreground">
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
                                        className="flex items-center justify-between rounded-xl border border-black/[0.06] bg-black/[0.03] p-3 backdrop-blur-sm"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-foreground/90">
                                                {item.action}
                                            </p>
                                            <p className="text-xs text-foreground/60">
                                                {item.detail}
                                            </p>
                                        </div>
                                        <span className="text-xs text-foreground/50">
                                            {item.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        <div className="flex flex-col gap-6">
                            <GlassCard>
                                <h2 className="mb-4 text-lg font-semibold text-foreground">
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
                                            className="flex items-center justify-between rounded-xl border border-black/[0.06] bg-black/[0.03] p-3 backdrop-blur-sm"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-foreground/90">
                                                    {item.room}
                                                </p>
                                                <p className="text-xs text-foreground/60">
                                                    {item.type}
                                                </p>
                                            </div>
                                            <span className="text-xs font-medium text-foreground/70">
                                                {item.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>

                            <GlassCard>
                                <h2 className="mb-4 text-lg font-semibold text-foreground">
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
                                            className="flex items-center justify-between rounded-xl border border-amber-300/30 bg-amber-100/30 p-3"
                                        >
                                            <p className="text-sm text-foreground/80">
                                                {item.text}
                                            </p>
                                            <span className="text-xs font-medium text-amber-700">
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
