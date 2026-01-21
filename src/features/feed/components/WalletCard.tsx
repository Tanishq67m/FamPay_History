import { Plus } from 'lucide-react';

export const WalletCard = () => {
    return (
        <div className="w-full relative overflow-hidden rounded-[24px] bg-[#1c1c1e] border border-white/5 aspect-[1.58/1] shadow-2xl group cursor-default select-none">

            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-fam-bg to-fam-card z-0" />
            <div className="absolute top-[-50%] right-[-20%] w-[300px] h-[300px] bg-fam-accent/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-30%] left-[-10%] w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[60px]" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6">

                {/* Top Row */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-fam-muted text-xs font-medium tracking-wider uppercase mb-1">Total Balance</p>
                        <h2 className="text-3xl font-bold text-white tracking-tight">₹12,450.00</h2>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                        <div className="w-6 h-4 border-2 border-white/40 rounded-sm relative flex items-center justify-center">
                            <div className="w-full h-[1px] bg-white/40" />
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <div className="flex -space-x-2 overflow-hidden">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-[#1c1c1e] bg-gradient-to-tr from-gray-700 to-gray-600" />
                            ))}
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-fam-accent text-white px-4 py-2 rounded-full font-medium text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-fam-accent/20">
                        <Plus size={16} strokeWidth={3} />
                        <span>Add Money</span>
                    </button>
                </div>
            </div>

            {/* Shine Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>
    );
};
