'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { getTransactionById } from '@/features/feed/api';
import { PhoneOverlay } from "@/components/PhoneOverlay";
import { Transaction } from '@/features/feed/types';
import { formatDate } from '@/lib/formatters';
import { generateStory } from '@/features/feed/utils/storyGenerator';


export default function TransactionPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);

    // Removed direct params access as it causes issues in Next.js 15+ (params is a Promise)

    useEffect(() => {
        const fetchTx = async () => {
            if (id) {
                const data = await getTransactionById(id);
                if (data) {
                    setTransaction(data);
                }
            }
            setLoading(false);
        };
        fetchTx();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-fam-neutral/20" />
                    <div className="h-4 w-32 bg-fam-neutral/20 rounded" />
                </div>
            </div>
        );
    }

    if (!transaction) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">Transaction not found</h2>
                    <button onClick={() => router.back()} className="text-fam-accent hover:underline">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const isCredit = transaction.direction === 'CREDIT';

    return (
        // Outer Container - Simulates the "Desk" on large screens
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-0 md:p-8 font-sans bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black">

            {/* Mobile Frame Container */}
            <div className="w-full md:max-w-[380px] h-[100dvh] md:h-[95vh] md:max-h-[850px] bg-fam-bg flex flex-col relative overflow-hidden md:rounded-[40px] md:border-[8px] md:border-[#1a1a1a] md:shadow-2xl shadow-black ring-1 ring-white/5">
                <PhoneOverlay />

                {/* Header */}
                <header className="flex-none z-30 px-5 pt-6 pb-4 flex items-center justify-between bg-fam-bg/80 backdrop-blur-md sticky top-0 border-b border-white/5">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <span className="font-bold tracking-wide">Transaction Details</span>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <Share2 size={18} />
                        </button>
                    </div>
                </header>

                <main className="flex-1 min-h-0 relative px-6 pt-4 pb-12 overflow-y-auto">
                    {/* Amount Section */}
                    <div className="text-center mb-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
                        <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 overflow-hidden">
                            {transaction.counterparty.avatar ? (
                                <img src={transaction.counterparty.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-2xl font-bold text-fam-muted">{transaction.counterparty.name[0]}</span>
                            )}
                        </div>

                        <h2 className="text-fam-muted text-sm font-medium tracking-wide uppercase mb-2">
                            {isCredit ? 'Received from' : 'Paid to'}
                        </h2>
                        <h1 className="text-2xl font-bold mb-3">{transaction.counterparty.name}</h1>
                        <div className="text-5xl font-black tracking-tighter text-white/90">
                            <span className="text-3xl font-medium align-top mr-1">₹</span>
                            {transaction.amount.toLocaleString()}
                        </div>
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                            <div className={`w-1.5 h-1.5 rounded-full ${transaction.status === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-xs font-medium text-fam-muted tracking-wide uppercase">
                                {transaction.status} • {formatDate(transaction.timestamp)}
                            </span>
                        </div>
                    </div>

                    {/* AI Insights Card */}
                    <div className="mb-6 relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-fam-accent/50 to-purple-500/50 rounded-2xl opacity-75 blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-[#111] rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles size={16} className="text-fam-accent fill-fam-accent" />
                                <h3 className="font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                    FamX AI Insight
                                </h3>
                            </div>

                            <p className="text-sm leading-relaxed text-fam-muted/90">
                                {generateStory(transaction)}
                            </p>

                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-widest text-fam-muted/50">Spending Pattern</span>
                                <span className="text-xs font-semibold text-white/80">Unusual Activity</span>
                            </div>
                        </div>
                    </div>

                    {/* Details List */}
                    <div className="bg-[#111] rounded-2xl p-6 border border-white/5 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-fam-muted">Payment Method</span>
                            <span className="text-sm font-medium">FamCard •••• 4242</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-fam-muted">Category</span>
                            <span className="text-sm font-medium capitalize">{transaction.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-fam-muted">Transaction ID</span>
                            <span className="text-sm font-mono text-fam-muted/70">{transaction.id.split('-')[0]}...</span>
                        </div>

                        <div className="pt-4 border-t border-dashed border-white/10">
                            <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold transition-colors text-fam-accent">
                                Raise an Issue
                            </button>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
