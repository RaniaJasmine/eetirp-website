import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ComingSoon() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#faf8f5] text-[#0a1628] px-6 md:px-16 py-32 flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#1a4a8a] hover:text-[#0d2f5a] transition-colors mb-8 font-mono text-sm mx-auto"
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white border border-[#d0dae8] rounded-3xl p-12 shadow-sm"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-[#e8edf5] flex items-center justify-center">
                            <Construction className="w-10 h-10 text-[#1a4a8a]" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#0a1628] mb-4">Coming Soon! 🚀</h1>
                    <p className="text-[#4a6a8f] text-lg leading-relaxed mb-6">
                        We're working hard to bring you this course.
                        Stay tuned for updates!
                    </p>
                    <p className="text-sm text-[#4a6a8f] mb-8">
                        Want to be notified when this launches?
                        <a href="#onboarding" className="text-[#1a4a8a] font-bold hover:underline ml-1">
                            Join our ecosystem
                        </a>
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-[#1a4a8a] hover:bg-[#0d2f5a] text-white font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-all"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        </div>
    );
}