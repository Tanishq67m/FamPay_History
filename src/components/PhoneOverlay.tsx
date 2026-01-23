import { Wifi, Battery, Signal } from 'lucide-react';

export const PhoneOverlay = () => {
    return (
        <>
            {/* STATUS BAR */}
            <div className="absolute top-0 left-0 right-0 h-[44px] px-6 flex items-center justify-between z-50 pointer-events-none text-white select-none">

                {/* Time */}
                <div className="font-semibold text-[15px] tracking-tight ml-2">
                    9:41
                </div>

                {/* Dynamic Island / Notch Placeholder (Optional) */}
                {/* <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[120px] h-[35px] bg-black rounded-full z-50" /> */}

                {/* Icons */}
                <div className="flex items-center gap-1.5 mr-1">
                    <Signal size={16} strokeWidth={2.5} className="mr-0.5" />
                    <Wifi size={16} strokeWidth={2.5} />
                    <Battery size={20} strokeWidth={2.5} className="ml-0.5" />
                </div>
            </div>

            {/* HOME INDICATOR */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/40 rounded-full z-50 pointer-events-none" />
        </>
    );
};
