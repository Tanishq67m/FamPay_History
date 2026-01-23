import { Bell, Check, Info, X } from 'lucide-react';
import { clsx } from 'clsx';

interface NotificationProps {
    id: number;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'success' | 'alert';
    read: boolean;
}

const STATIC_NOTIFICATIONS: NotificationProps[] = [
    {
        id: 1,
        title: 'Payment Received',
        message: 'You received ₹500 from Ankit.',
        time: '2m ago',
        type: 'success',
        read: false,
    },
    {
        id: 2,
        title: 'New Feature Alert',
        message: 'Check out the new AI insights for your transactions!',
        time: '1h ago',
        type: 'info',
        read: false,
    },
    {
        id: 3,
        title: 'Security Update',
        message: 'We have updated our privacy policy.',
        time: '5h ago',
        type: 'alert',
        read: true,
    },
];

interface NotificationListProps {
    onClose: () => void;
}

export const NotificationList = ({ onClose }: NotificationListProps) => {
    return (
        <div className="absolute inset-x-2 top-16 z-50 bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-in slide-in-from-top-2 fade-in duration-200 overflow-hidden flex flex-col max-h-[60vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-2">
                    <Bell size={16} className="text-fam-accent" />
                    <h3 className="font-bold text-white text-sm tracking-wide">Notifications</h3>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-white/10 text-fam-muted transition-colors"
                >
                    <X size={16} />
                </button>
            </div>

            {/* List */}
            <div className="overflow-y-auto p-2">
                {STATIC_NOTIFICATIONS.map((notif) => (
                    <div
                        key={notif.id}
                        className={clsx(
                            "p-3 mb-2 rounded-xl transition-all border border-transparent",
                            notif.read ? "bg-transparent opacity-60" : "bg-white/5 border-white/5"
                        )}
                    >
                        <div className="flex gap-3">
                            <div className={clsx(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                notif.type === 'success' && "bg-green-500/20 text-green-400",
                                notif.type === 'info' && "bg-blue-500/20 text-blue-400",
                                notif.type === 'alert' && "bg-amber-500/20 text-amber-400",
                            )}>
                                {notif.type === 'success' && <Check size={14} />}
                                {notif.type === 'info' && <Info size={14} />}
                                {notif.type === 'alert' && <Bell size={14} />}
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white mb-0.5 leading-none">{notif.title}</h4>
                                <p className="text-[11px] text-fam-muted leading-tight mb-1.5">{notif.message}</p>
                                <span className="text-[9px] text-fam-muted/50 font-mono uppercase tracking-widest">{notif.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/5 text-center bg-white/[0.02]">
                <button className="text-[10px] text-fam-accent font-semibold tracking-wider uppercase hover:text-white transition-colors">
                    Mark all as read
                </button>
            </div>
        </div>
    );
};
