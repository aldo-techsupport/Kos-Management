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
    const targetY = Math.max(target.getBoundingClientRect().top + window.scrollY - offset, 0);
    const distance = targetY - startY;
    const duration = Math.min(Math.max(Math.abs(distance) * 0.65, 700), 1800);
    const startTime = performance.now();
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
}

/* ═══════════════════════════════════════════
   SVG Filter Definitions — cubiq liquid glass
   ═══════════════════════════════════════════ */
function LiquidGlassFilters() {
    return (
        <svg width="0" height="0" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} colorInterpolationFilters="sRGB">
            <filter id="pack-upper">
                <feColorMatrix type="matrix" values="0.4980392156862745 0 0 0 0 0 0.4980392156862745 0 0 0 0 0 0.4980392156862745 0 0 0 0 0 1 0" result="quantized" />
                <feComposite in="quantized" operator="over" result="composited" />
                <feColorMatrix in="composited" type="matrix" values="2 0 0 0 0 0 2 0 0 0 0 0 2 0 0 0 0 0 1 0" />
            </filter>
        </svg>
    );
}

export default function Welcome() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [allLoaded, setAllLoaded] = useState(false);

    useEffect(() => {
        if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
        return () => { if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'auto'; };
    }, []);

    useEffect(() => {
        const h = (e: MouseEvent) => {
            const link = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!link) return;
            const hash = link.getAttribute('href');
            if (!hash || hash === '#') return;
            const target = document.querySelector(hash) as HTMLElement | null;
            if (!target) return;
            e.preventDefault();
            smoothScrollToElement(target);
            window.history.pushState(null, '', hash);
        };
        document.addEventListener('click', h);
        return () => document.removeEventListener('click', h);
    }, []);

    useEffect(() => {
        const imgs: HTMLImageElement[] = [];
        let ld = 0;
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => { ld++; setLoadedCount(ld); if (ld === TOTAL_FRAMES) setAllLoaded(true); };
            imgs.push(img);
        }
        imagesRef.current = imgs;
    }, []);

    useEffect(() => {
        if (!allLoaded) return;
        const cnv = canvasRef.current, ct = containerRef.current;
        if (!cnv || !ct) return;
        const ctx = cnv.getContext('2d');
        if (!ctx) return;
        const first = imagesRef.current[0];
        cnv.width = first.naturalWidth;
        cnv.height = first.naturalHeight;
        ctx.drawImage(first, 0, 0);

        const onScroll = () => {
            const rect = ct.getBoundingClientRect();
            const sh = ct.offsetHeight - window.innerHeight;
            const scrolled = -rect.top;
            const prog = Math.min(Math.max(scrolled / sh, 0), 1);
            const idx = Math.min(Math.floor(prog * TOTAL_FRAMES), TOTAL_FRAMES - 1);
            const img = imagesRef.current[idx];
            if (img) { ctx.clearRect(0, 0, cnv.width, cnv.height); ctx.drawImage(img, 0, 0); }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [allLoaded]);

    const btnGlass = 'backdrop-filter-[url(#pack-upper)] after:content-[\'\'] after:absolute after:inset-0 after:pointer-events-none after:backdrop-filter-[url(#liquid-glass-new)_url(#fresnel)]';
    const cardGlass = 'before:content-[\'\'] before:absolute before:inset-0 before:backdrop-filter-[url(#pack-upper)] after:content-[\'\'] after:absolute after:inset-0 after:pointer-events-none after:backdrop-filter-[url(#liquid-glass-new)_url(#fresnel)]';

    return (
        <>
            <Head title="Kos Premium - Sale Kos Strategis" />

            {/* SVG Filter Definitions */}
            <svg className="absolute opacity-0 pointer-events-none" width="0" height="0" colorInterpolationFilters="sRGB">
                <filter id="pack-upper">
                    <feColorMatrix type="matrix" values="0.4980392156862745 0 0 0 0 0 0.4980392156862745 0 0 0 0 0 0.4980392156862745 0 0 0 0 0 1 0" result="quantized" />
                    <feComposite in="quantized" operator="over" result="composited" />
                    <feColorMatrix in="composited" type="matrix" values="2 0 0 0 0 0 2 0 0 0 0 0 2 0 0 0 0 0 1 0" />
                </filter>
                <filter id="liquid-glass-new" x="-20%" y="-20%" width="140%" height="140%">
                    {/* Unpack background */}
                    <feComponentTransfer result="SourceBackground" in="SourceGraphic">
                        <feFuncR type="discrete" tableValues="0.000 0.008 0.016 0.024 0.031 0.039 0.047 0.055 0.063 0.071 0.079 0.087 0.094 0.102 0.110 0.118 0.126 0.134 0.142 0.150 0.157 0.165 0.173 0.181 0.189 0.197 0.205 0.213 0.220 0.228 0.236 0.244 0.252 0.260 0.268 0.276 0.283 0.291 0.299 0.307 0.315 0.323 0.331 0.339 0.346 0.354 0.362 0.370 0.378 0.386 0.394 0.402 0.409 0.417 0.425 0.433 0.441 0.449 0.457 0.465 0.472 0.480 0.488 0.496 0.504 0.512 0.520 0.528 0.535 0.543 0.551 0.559 0.567 0.575 0.583 0.591 0.598 0.606 0.614 0.622 0.630 0.638 0.646 0.654 0.661 0.669 0.677 0.685 0.693 0.701 0.709 0.717 0.724 0.732 0.740 0.748 0.756 0.764 0.772 0.780 0.787 0.795 0.803 0.811 0.819 0.827 0.835 0.843 0.850 0.858 0.866 0.874 0.882 0.890 0.898 0.906 0.913 0.921 0.929 0.937 0.945 0.953 0.961 0.969 0.976 0.984 0.992 1.000" />
                        <feFuncG type="discrete" tableValues="0.000 0.008 0.016 0.024 0.031 0.039 0.047 0.055 0.063 0.071 0.079 0.087 0.094 0.102 0.110 0.118 0.126 0.134 0.142 0.150 0.157 0.165 0.173 0.181 0.189 0.197 0.205 0.213 0.220 0.228 0.236 0.244 0.252 0.260 0.268 0.276 0.283 0.291 0.299 0.307 0.315 0.323 0.331 0.339 0.346 0.354 0.362 0.370 0.378 0.386 0.394 0.402 0.409 0.417 0.425 0.433 0.441 0.449 0.457 0.465 0.472 0.480 0.488 0.496 0.504 0.512 0.520 0.528 0.535 0.543 0.551 0.559 0.567 0.575 0.583 0.591 0.598 0.606 0.614 0.622 0.630 0.638 0.646 0.654 0.661 0.669 0.677 0.685 0.693 0.701 0.709 0.717 0.724 0.732 0.740 0.748 0.756 0.764 0.772 0.780 0.787 0.795 0.803 0.811 0.819 0.827 0.835 0.843 0.850 0.858 0.866 0.874 0.882 0.890 0.898 0.906 0.913 0.921 0.929 0.937 0.945 0.953 0.961 0.969 0.976 0.984 0.992 1.000" />
                        <feFuncB type="discrete" tableValues="0.000 0.008 0.016 0.024 0.031 0.039 0.047 0.055 0.063 0.071 0.079 0.087 0.094 0.102 0.110 0.118 0.126 0.134 0.142 0.150 0.157 0.165 0.173 0.181 0.189 0.197 0.205 0.213 0.220 0.228 0.236 0.244 0.252 0.260 0.268 0.276 0.283 0.291 0.299 0.307 0.315 0.323 0.331 0.339 0.346 0.354 0.362 0.370 0.378 0.386 0.394 0.402 0.409 0.417 0.425 0.433 0.441 0.449 0.457 0.465 0.472 0.480 0.488 0.496 0.504 0.512 0.520 0.528 0.535 0.543 0.551 0.559 0.567 0.575 0.583 0.591 0.598 0.606 0.614 0.622 0.630 0.638 0.646 0.654 0.661 0.669 0.677 0.685 0.693 0.701 0.709 0.717 0.724 0.732 0.740 0.748 0.756 0.764 0.772 0.780 0.787 0.795 0.803 0.811 0.819 0.827 0.835 0.843 0.850 0.858 0.866 0.874 0.882 0.890 0.898 0.906 0.913 0.921 0.929 0.937 0.945 0.953 0.961 0.969 0.976 0.984 0.992 1.000" />
                    </feComponentTransfer>
                    {/* Unpack mask */}
                    <feComponentTransfer in="SourceGraphic">
                        <feFuncR type="discrete" tableValues="0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000" />
                        <feFuncG type="discrete" tableValues="0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000" />
                        <feFuncB type="discrete" tableValues="0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000 0.000 1.000" />
                    </feComponentTransfer>
                    <feColorMatrix type="luminanceToAlpha" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 2 0" />
                    <feComposite result="SourceMask" />
                    {/* Lighting - Black */}
                    <feDiffuseLighting in="SourceMask" diffuseConstant="1" surfaceScale="100">
                        <feDistantLight azimuth="225" elevation="180" />
                    </feDiffuseLighting>
                    <feColorMatrix type="luminanceToAlpha" />
                    <feColorMatrix result="side-black" values="0 0 0 0.0 0 0 0 0 0.0 0 0 0 0 0.0 0 0 0 0 0.9 0" />
                    {/* Yellow */}
                    <feDiffuseLighting in="SourceMask" diffuseConstant="0.52" surfaceScale="100">
                        <feDistantLight azimuth="45" elevation="180" />
                    </feDiffuseLighting>
                    <feColorMatrix type="luminanceToAlpha" />
                    <feColorMatrix result="side-yellow" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0" />
                    {/* Red */}
                    <feDiffuseLighting in="SourceMask" diffuseConstant="1" surfaceScale="100">
                        <feDistantLight azimuth="315" elevation="180" />
                    </feDiffuseLighting>
                    <feColorMatrix type="luminanceToAlpha" />
                    <feColorMatrix result="side-red" values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                    {/* Green */}
                    <feDiffuseLighting in="SourceMask" diffuseConstant="1" surfaceScale="100">
                        <feDistantLight azimuth="135" elevation="180" />
                    </feDiffuseLighting>
                    <feColorMatrix type="luminanceToAlpha" />
                    <feColorMatrix result="side-green" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0" />
                    {/* Blend sides */}
                    <feBlend in="side-green" mode="screen" />
                    <feBlend in="side-red" mode="screen" />
                    <feBlend in="side-yellow" mode="screen" />
                    <feBlend in="side-black" mode="multiply" />
                    {/* Refraction */}
                    <feMorphology result="refraction-thickness" radius="5" operator="dilate" />
                    <feGaussianBlur result="refraction-smoothness" in="refraction-thickness" stdDeviation="5" />
                    <feComposite result="balls-map" in2="SourceMask" operator="in" />
                    <feFlood result="normal-bg-color" floodColor="#808000" />
                    <feComposite result="NormalMapFull" in="balls-map" in2="normal-bg-color" operator="over" />
                    {/* Displacement */}
                    <feDisplacementMap result="displacement" in="SourceBackground" in2="NormalMapFull" scale="100" xChannelSelector="R" yChannelSelector="G" />
                    <feGaussianBlur result="blur-out" stdDeviation="1" in="displacement" />
                    <feColorMatrix in="blur-out" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                    <feComponentTransfer result="backdrop-processed">
                        <feFuncR type="linear" slope=".9" intercept="0.05" />
                        <feFuncG type="linear" slope=".9" intercept="0.05" />
                        <feFuncB type="linear" slope=".9" intercept="0.05" />
                    </feComponentTransfer>
                    <feComposite result="balls-final" in2="SourceMask" operator="in" />
                </filter>
                <filter id="fresnel">
                    <feMorphology in="SourceMask" result="stroke-width" radius="3" />
                    <feGaussianBlur result="outline-smoothness" stdDeviation="2" />
                    <feComposite result="bg-stroke-raw" in="SourceGraphic" operator="out" in2="outline-smoothness" />
                    <feColorMatrix result="bg-stroke" values="2 0 0 0 0.1 0 2 0 0 0.1 0 0 2 0 0.1 0 0 0 0.69 0" />
                    <feBlend result="outlined-balls" in="SourceGraphic" mode="overlay" />
                </filter>
            </svg>

            {/* Navbar */}
            <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4 md:px-8">
                <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/20 bg-white/[0.10] px-4 py-3 text-white shadow-[0_12px_40px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.35)] md:px-6" style={{ backdropFilter: 'url(#pack-upper) blur(20px) saturate(1.8)' }}>
                    <a href="#home" className="flex items-center gap-2 font-bold tracking-tight no-underline">
                        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/15 shadow-inner">K</span>
                        <span className="hidden sm:block">Kos Premium</span>
                    </a>
                    <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/10 p-1 md:flex">
                        {['Home','Pricing','Facilities','Location','Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm font-medium text-white/80 no-underline transition hover:bg-white/15 hover:text-white">{item}</a>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <a href="/login" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white/85 no-underline transition hover:bg-white/10 hover:text-white sm:inline-flex">Login</a>
                        <a href="/register" className="liquid-glass-btn relative isolate overflow-hidden rounded-full border border-white/25 bg-white/20 px-4 py-2 text-sm font-semibold text-white no-underline shadow-inner transition hover:bg-white/30" style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(12px)' }}>Register</a>
                    </div>
                </nav>
            </header>

            {!allLoaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950">
                    <div className="mb-4 text-lg font-medium text-white">Memuat pengalaman terbaik...</div>
                    <div className="h-2 w-64 overflow-hidden rounded-full bg-neutral-800">
                        <div className="h-full rounded-full bg-amber-400 transition-all duration-200" style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }} />
                    </div>
                    <div className="mt-2 text-sm text-neutral-400">{loadedCount} / {TOTAL_FRAMES} frame</div>
                </div>
            )}

            <main id="home" ref={containerRef} className="relative min-h-[620vh] overflow-clip bg-neutral-950">
                <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
                    <canvas ref={canvasRef} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.04),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.08)_35%,rgba(0,0,0,0.65))]" />
                </div>
                <section className="absolute inset-x-0 top-0 z-10">
                    {/* Hero */}
                    <div className="flex min-h-screen items-center justify-center px-5 pt-24 text-center">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/85" style={{ backdropFilter: 'blur(20px) saturate(1.6)' }}>
                                Sale Kos-Kosan Premium • Lokasi Strategis
                            </div>
                            <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_8px_35px_rgba(0,0,0,0.55)] md:text-7xl lg:text-8xl">Kos Premium untuk Investasi Masa Depan</h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">Properti siap kelola dengan fasilitas modern, potensi okupansi tinggi, dan desain yang menarik untuk penghuni masa kini.</p>
                            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <a href={`https://wa.me/${PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer"
                                    className="liquid-glass-btn relative isolate overflow-hidden rounded-full bg-white px-7 py-3.5 font-bold text-neutral-950 no-underline shadow-xl transition hover:scale-105 hover:bg-amber-100"
                                    style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(14px)' }}>
                                    <span className="relative z-10">Konsultasi via WhatsApp</span>
                                </a>
                                <a href="#pricing"
                                    className="liquid-glass-btn relative isolate overflow-hidden rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white no-underline transition hover:scale-105 hover:bg-white/20"
                                    style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(14px)' }}>
                                    <span className="relative z-10">Lihat Penawaran</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-7xl space-y-28 px-5 pb-32 pt-[25vh] md:px-8 lg:px-10">
                        {/* Facilities */}
                        <section id="facilities" className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                            <div className="liquid-glass-card relative isolate overflow-hidden rounded-[2rem] border border-white/25 p-7 text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)]" style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(20px) saturate(1.6)' }}>
                                <div className="relative z-10">
                                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-amber-200/90">Facilities</p>
                                    <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">Fasilitas bikin penghuni betah.</h2>
                                    <p className="text-lg leading-8 text-white/78">Cocok untuk kos premium: kamar rapi, suasana nyaman, dan fasilitas yang mudah dipasarkan ke mahasiswa maupun pekerja.</p>
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    ['⚡','WiFi High Speed','Internet stabil untuk kerja, kuliah, dan streaming.'],
                                    ['❄️','AC & Furnished','Kamar siap huni dengan furniture esensial.'],
                                    ['🚿','Kamar Mandi Dalam','Privasi lebih baik, nilai sewa lebih tinggi.'],
                                    ['🛡️','Keamanan 24 Jam','CCTV dan akses terkontrol untuk penghuni.'],
                                ].map(([icon, title, desc]) => (
                                    <div key={title} className="liquid-glass-card relative isolate overflow-hidden rounded-[2rem] border border-white/25 p-5 text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)]" style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(20px) saturate(1.6)' }}>
                                        <div className="relative z-10">
                                            <div className="mb-3 text-3xl">{icon}</div>
                                            <h3 className="mb-2 text-lg font-bold">{title}</h3>
                                            <p className="text-sm leading-6 text-white/70">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Location */}
                        <section id="location" className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="order-2 grid gap-4 sm:grid-cols-3 lg:order-1">
                                {[['5 Menit','ke pusat aktivitas'],['95%','target okupansi'],['24/7','area aman']].map(([value,label]) => (
                                    <div key={label} className="liquid-glass-card relative isolate overflow-hidden rounded-[2rem] border border-white/25 p-5 text-center text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)]" style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(20px) saturate(1.6)' }}>
                                        <div className="relative z-10">
                                            <div className="text-4xl font-black text-amber-200">{value}</div>
                                            <div className="mt-2 text-sm text-white/70">{label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="liquid-glass-card relative isolate overflow-hidden rounded-[2rem] border border-white/25 p-7 text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)] order-1 lg:order-2" style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(20px) saturate(1.6)' }}>
                                <div className="relative z-10">
                                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-amber-200/90">Location</p>
                                    <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">Dekat demand, dekat profit.</h2>
                                    <p className="text-lg leading-8 text-white/78">Posisi strategis adalah kunci kos-kosan. Landing page ini menonjolkan lokasi, fasilitas, dan potensi income agar calon pembeli cepat paham value-nya.</p>
                                </div>
                            </div>
                        </section>

                        {/* Pricing */}
                        <section id="pricing" className="grid gap-6 lg:grid-cols-3">
                            <div className="liquid-glass-card relative isolate overflow-hidden rounded-[2rem] border border-white/25 p-7 text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)] lg:col-span-1" style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(20px) saturate(1.6)' }}>
                                <div className="relative z-10">
                                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-amber-200/90">Pricing</p>
                                    <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">Paket penawaran fleksibel.</h2>
                                    <p className="text-white/75">Angka bisa kita ganti sesuai data asli properti Bang Aldo.</p>
                                </div>
                            </div>
                            {[
                                ['Basic Info','Mulai dari','Hubungi Kami',['Detail lokasi','Foto/video properti','Simulasi sewa']],
                                ['Investor Pack','Penawaran','Terbaik',['Proyeksi income','Data okupansi','Skema pembayaran']],
                            ].map(([name,prefix,price,list]) => (
                                <div key={name} className="liquid-glass-card relative isolate overflow-hidden rounded-[2rem] border border-white/25 p-7 text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)] flex flex-col" style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(20px) saturate(1.6)' }}>
                                    <div className="relative z-10 flex flex-col h-full">
                                        <h3 className="text-xl font-bold">{name}</h3>
                                        <div className="my-5"><div className="text-sm text-white/60">{prefix as string}</div><div className="text-4xl font-black text-amber-200">{price as string}</div></div>
                                        <ul className="mb-7 space-y-3 text-white/75">{(list as string[]).map((item) => (<li key={item} className="flex gap-3"><span className="text-amber-200">✓</span>{item}</li>))}</ul>
                                        <a href={`https://wa.me/${PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer"
                                            className="liquid-glass-btn mt-auto relative isolate overflow-hidden rounded-full border border-white/25 bg-white/15 px-5 py-3 text-center font-bold text-white no-underline transition hover:bg-white/25"
                                            style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(10px)' }}>
                                            <span className="relative z-10">Tanya Detail</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Contact */}
                        <section id="contact" className="pb-[45vh]">
                            <div className="liquid-glass-card relative isolate overflow-hidden rounded-[2rem] border border-white/25 p-7 text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)] mx-auto max-w-4xl text-center" style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(20px) saturate(1.6)' }}>
                                <div className="relative z-10">
                                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-amber-200/90">Contact</p>
                                    <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">Siap lihat detail properti?</h2>
                                    <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-white/78">Hubungi kami untuk data lengkap, lokasi, harga, dan jadwal survey kos-kosan.</p>
                                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                                        <a href={`https://wa.me/${PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer"
                                            className="liquid-glass-btn relative isolate overflow-hidden rounded-full bg-green-500/85 px-8 py-4 font-black text-white no-underline shadow-xl transition hover:scale-105 hover:bg-green-500"
                                            style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(12px)' }}>
                                            <span className="relative z-10">WhatsApp Sekarang</span>
                                        </a>
                                        <a href={`tel:+${PHONE_NUMBER}`}
                                            className="liquid-glass-btn relative isolate overflow-hidden rounded-full border border-white/25 bg-white/10 px-8 py-4 font-black text-white no-underline transition hover:scale-105 hover:bg-white/20"
                                            style={{ backdropFilter: 'url(#pack-upper) url(#liquid-glass-new) url(#fresnel) blur(12px)' }}>
                                            <span className="relative z-10">Telepon</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
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
