import { Plus } from 'lucide-react';
import { useState, useRef, MouseEvent } from 'react';

export const WalletCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div className="w-full relative perspective-[1000px] group">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
                className="w-full relative overflow-hidden rounded-[20px] bg-black border border-[#333] shadow-2xl transition-transform duration-100 ease-out cursor-default select-none aspect-[1.58/1] md:aspect-[1.8/1]"
            >

                {/* === CARD FACE === */}
                {/* Dark Gold Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-black to-[#050505] z-0" />

                {/* Decorative Blobs (FamX Colors) */}
                <div className="absolute top-[-40%] right-[-20%] w-[200px] h-[200px] bg-[#D4AF37]/20 rounded-full blur-[60px]" /> {/* Gold */}
                <div className="absolute bottom-[-30%] left-[-10%] w-[150px] h-[150px] bg-[#FFA500]/10 rounded-full blur-[50px]" /> {/* Orange */}

                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-6">

                    {/* Top Row: Chip & Logo */}
                    <div className="flex justify-between items-start">
                        <div className="w-[38px] h-[28px] rounded-[4px] border border-[#ffffff20] bg-gradient-to-br from-[#ffffff30] to-[#ffffff05] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute w-[150%] h-[1px] bg-white/20 top-1/3 -left-1/4 transform rotate-12" />
                            <div className="absolute w-[150%] h-[1px] bg-white/20 bottom-1/3 -left-1/4 transform rotate-12" />
                        </div>
                        <div className="flex items-center gap-1 opacity-80">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37]">PREMIUM</span>
                        </div>
                    </div>

                    {/* Middle: FamX Logo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8e8e8] to-[#999]">
                            fam<span className="text-[#F6A525]">X</span>
                        </h1>
                    </div>

                    {/* Bottom Row: Details */}
                    <div className="flex items-end justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-fam-muted uppercase tracking-wider mb-0.5">Balance</span>
                            <span className="text-xl font-bold text-white tracking-wide">₹12,450</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Visa/Mastercard Logo Simulation */}
                            <div className="h-4 flex -space-x-1 opacity-60 grayscale group-hover:grayscale-0 transition-all">
                                <div className="w-4 h-4 rounded-full bg-red-500/80 mix-blend-screen" />
                                <div className="w-4 h-4 rounded-full bg-yellow-500/80 mix-blend-screen" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shine Interaction */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
            </div>



        </div>
    );
};
