import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 89;
const PHONE_NUMBER = '62XXXXXXXXXXX';

function getFramePath(index: number): string {
    const num = String(index).padStart(3, '0');
    return `/frames/ezgif-frame-${num}.jpg`;
}


function smoothScrollToElement(target: HTMLElement, offset = 96) {
    const startY = window.scrollY;
    const targetY = Math.max(
        target.getBoundingClientRect().top + window.scrollY - offset,
        0
    );
    const distance = targetY - startY;
    const duration = Math.min(Math.max(Math.abs(distance) * 0.65, 700), 1800);
    const startTime = performance.now();

    const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
}

function LiquidGlassCard({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`relative overflow-hidden rounded-[2rem] border border-white/25 bg-white/[0.10] p-7 text-white shadow-[0_18px_60px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-[1.9] before:pointer-events-none before:absolute before:inset-0 before:rounded-[2rem] before:bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.35),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_45%,rgba(255,255,255,0.12))] after:pointer-events-none after:absolute after:inset-[1px] after:rounded-[1.95rem] after:border after:border-white/10 ${className}`}
        >
            <div className="relative z-10">{children}</div>
        </div>
    );
}

function GlassNav() {
    const navItems = ['Home', 'Pricing', 'Facilities', 'Location', 'Contact'];

    return (
        <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4 md:px-8">
            <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/20 bg-white/[0.10] px-4 py-3 text-white shadow-[0_12px_40px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl backdrop-saturate-[1.8] md:px-6">
                <a href="#home" className="flex items-center gap-2 font-bold tracking-tight">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/15 shadow-inner">
                        K
                    </span>
                    <span className="hidden sm:block">Kos Premium</span>
                </a>

                <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/10 p-1 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/15 hover:text-white"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href="/login"
                        className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white sm:inline-flex"
                    >
                        Login
                    </a>
                    <a
                        href="/register"
                        className="rounded-full border border-white/25 bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-inner transition hover:bg-white/30"
                    >
                        Register
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default function Welcome() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [allLoaded, setAllLoaded] = useState(false);


    useEffect(() => {
        const handleAnchorClick = (event: MouseEvent) => {
            const link = (event.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!link) return;

            const hash = link.getAttribute('href');
            if (!hash || hash === '#') return;

            const target = document.querySelector(hash) as HTMLElement | null;
            if (!target) return;

            event.preventDefault();
            smoothScrollToElement(target);
            window.history.pushState(null, '', hash);
        };

        document.addEventListener('click', handleAnchorClick);
        return () => document.removeEventListener('click', handleAnchorClick);
    }, []);

    useEffect(() => {
        const images: HTMLImageElement[] = [];
        let loaded = 0;

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loaded++;
                setLoadedCount(loaded);
                if (loaded === TOTAL_FRAMES) setAllLoaded(true);
            };
            images.push(img);
        }

        imagesRef.current = images;
    }, []);

    useEffect(() => {
        if (!allLoaded) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const firstImg = imagesRef.current[0];
        canvas.width = firstImg.naturalWidth;
        canvas.height = firstImg.naturalHeight;
        ctx.drawImage(firstImg, 0, 0);

        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const scrollHeight = container.offsetHeight - window.innerHeight;
            const scrolled = -rect.top;
            const progress = Math.min(Math.max(scrolled / scrollHeight, 0), 1);
            const frameIndex = Math.min(Math.floor(progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);
            const img = imagesRef.current[frameIndex];

            if (img) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [allLoaded]);

    return (
        <>
            <Head title="Kos Premium - Sale Kos Strategis" />
            <GlassNav />

            {!allLoaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950">
                    <div className="mb-4 text-lg font-medium text-white">Memuat pengalaman terbaik...</div>
                    <div className="h-2 w-64 overflow-hidden rounded-full bg-neutral-800">
                        <div
                            className="h-full rounded-full bg-amber-400 transition-all duration-200"
                            style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
                        />
                    </div>
                    <div className="mt-2 text-sm text-neutral-400">
                        {loadedCount} / {TOTAL_FRAMES} frame
                    </div>
                </div>
            )}

            <main id="home" ref={containerRef} className="relative min-h-[620vh] overflow-clip bg-neutral-950">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <canvas ref={canvasRef} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.04),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.08)_35%,rgba(0,0,0,0.65))]" />
                </div>

                <section className="absolute inset-x-0 top-0 z-10">
                    <div className="flex min-h-screen items-center justify-center px-5 pt-24 text-center">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-xl">
                                Sale Kos-Kosan Premium • Lokasi Strategis
                            </div>
                            <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_8px_35px_rgba(0,0,0,0.55)] md:text-7xl lg:text-8xl">
                                Kos Premium untuk Investasi Masa Depan
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
                                Properti siap kelola dengan fasilitas modern, potensi okupansi tinggi, dan desain yang menarik untuk penghuni masa kini.
                            </p>
                            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <a
                                    href={`https://wa.me/${PHONE_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-white px-7 py-3.5 font-bold text-neutral-950 shadow-xl transition hover:scale-105 hover:bg-amber-100"
                                >
                                    Konsultasi via WhatsApp
                                </a>
                                <a
                                    href="#pricing"
                                    className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white/20"
                                >
                                    Lihat Penawaran
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-7xl space-y-28 px-5 pb-32 pt-[25vh] md:px-8 lg:px-10">
                        <section id="facilities" className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                            <LiquidGlassCard>
                                <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-amber-200/90">Facilities</p>
                                <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">Fasilitas bikin penghuni betah.</h2>
                                <p className="text-lg leading-8 text-white/78">
                                    Cocok untuk kos premium: kamar rapi, suasana nyaman, dan fasilitas yang mudah dipasarkan ke mahasiswa maupun pekerja.
                                </p>
                            </LiquidGlassCard>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    ['⚡', 'WiFi High Speed', 'Internet stabil untuk kerja, kuliah, dan streaming.'],
                                    ['❄️', 'AC & Furnished', 'Kamar siap huni dengan furniture esensial.'],
                                    ['🚿', 'Kamar Mandi Dalam', 'Privasi lebih baik, nilai sewa lebih tinggi.'],
                                    ['🛡️', 'Keamanan 24 Jam', 'CCTV dan akses terkontrol untuk penghuni.'],
                                ].map(([icon, title, desc]) => (
                                    <LiquidGlassCard key={title} className="p-5">
                                        <div className="mb-3 text-3xl">{icon}</div>
                                        <h3 className="mb-2 text-lg font-bold">{title}</h3>
                                        <p className="text-sm leading-6 text-white/70">{desc}</p>
                                    </LiquidGlassCard>
                                ))}
                            </div>
                        </section>

                        <section id="location" className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="order-2 grid gap-4 sm:grid-cols-3 lg:order-1">
                                {[
                                    ['5 Menit', 'ke pusat aktivitas'],
                                    ['95%', 'target okupansi'],
                                    ['24/7', 'area aman'],
                                ].map(([value, label]) => (
                                    <LiquidGlassCard key={label} className="text-center">
                                        <div className="text-4xl font-black text-amber-200">{value}</div>
                                        <div className="mt-2 text-sm text-white/70">{label}</div>
                                    </LiquidGlassCard>
                                ))}
                            </div>
                            <LiquidGlassCard className="order-1 lg:order-2">
                                <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-amber-200/90">Location</p>
                                <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">Dekat demand, dekat profit.</h2>
                                <p className="text-lg leading-8 text-white/78">
                                    Posisi strategis adalah kunci kos-kosan. Landing page ini menonjolkan lokasi, fasilitas, dan potensi income agar calon pembeli cepat paham value-nya.
                                </p>
                            </LiquidGlassCard>
                        </section>

                        <section id="pricing" className="grid gap-6 lg:grid-cols-3">
                            <LiquidGlassCard className="lg:col-span-1">
                                <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-amber-200/90">Pricing</p>
                                <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">Paket penawaran fleksibel.</h2>
                                <p className="text-white/75">Angka bisa kita ganti sesuai data asli properti Bang Aldo.</p>
                            </LiquidGlassCard>

                            {[
                                ['Basic Info', 'Mulai dari', 'Hubungi Kami', ['Detail lokasi', 'Foto/video properti', 'Simulasi sewa']],
                                ['Investor Pack', 'Penawaran', 'Terbaik', ['Proyeksi income', 'Data okupansi', 'Skema pembayaran']],
                            ].map(([name, prefix, price, list]) => (
                                <LiquidGlassCard key={name} className="flex flex-col">
                                    <h3 className="text-xl font-bold">{name}</h3>
                                    <div className="my-5">
                                        <div className="text-sm text-white/60">{prefix as string}</div>
                                        <div className="text-4xl font-black text-amber-200">{price as string}</div>
                                    </div>
                                    <ul className="mb-7 space-y-3 text-white/75">
                                        {(list as string[]).map((item) => (
                                            <li key={item} className="flex gap-3">
                                                <span className="text-amber-200">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href={`https://wa.me/${PHONE_NUMBER}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto rounded-full border border-white/25 bg-white/15 px-5 py-3 text-center font-bold text-white transition hover:bg-white/25"
                                    >
                                        Tanya Detail
                                    </a>
                                </LiquidGlassCard>
                            ))}
                        </section>

                        <section id="contact" className="pb-[45vh]">
                            <LiquidGlassCard className="mx-auto max-w-4xl text-center">
                                <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-amber-200/90">Contact</p>
                                <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">Siap lihat detail properti?</h2>
                                <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-white/78">
                                    Hubungi kami untuk data lengkap, lokasi, harga, dan jadwal survey kos-kosan.
                                </p>
                                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                                    <a
                                        href={`https://wa.me/${PHONE_NUMBER}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-green-500/85 px-8 py-4 font-black text-white shadow-xl transition hover:scale-105 hover:bg-green-500"
                                    >
                                        WhatsApp Sekarang
                                    </a>
                                    <a
                                        href={`tel:+${PHONE_NUMBER}`}
                                        className="rounded-full border border-white/25 bg-white/10 px-8 py-4 font-black text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white/20"
                                    >
                                        Telepon
                                    </a>
                                </div>
                            </LiquidGlassCard>
                        </section>
                    </div>
                </section>
            </main>

            <footer className="bg-neutral-950 px-6 py-8 text-center text-sm text-neutral-500">
                © {new Date().getFullYear()} Kos Premium. All rights reserved.
            </footer>
        </>
    );
}
