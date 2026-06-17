import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#faf8f5] text-[#0a1628] px-6 md:px-16 py-32">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-[#1a4a8a] hover:text-[#0d2f5a] transition-colors mb-8 font-mono text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white border border-[#d0dae8] rounded-3xl p-8 md:p-12 shadow-sm"
                >
                    <h1 className="text-3xl md:text-4xl font-black text-[#0a1628] mb-6">Privacy Policy</h1>
                    <p className="text-[#4a6a8f] mb-8 text-sm">Last Updated: June 2026</p>

                    <div className="space-y-8 text-[#4a6a8f] text-sm leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">1. Information We Collect</h2>
                            <p>We collect personal information you provide directly, including name, email address, and inquiry details when you fill out our onboarding form.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">2. How We Use Your Information</h2>
                            <p>We use your information to respond to inquiries, provide services, send updates about EETIRP programs, and improve our offerings.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">3. Data Sharing</h2>
                            <p>We do not sell or rent your personal information to third parties. We may share data with trusted partners who assist in operating our services.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">4. Data Security</h2>
                            <p>We implement security measures to protect your personal information. However, no transmission over the internet is 100% secure.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">5. Your Rights</h2>
                            <p>You may request access, correction, or deletion of your personal data by contacting us at <a href="mailto:eetirpltd@gmail.com" className="text-[#1a4a8a] hover:underline">eetirpltd@gmail.com</a></p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">6. Cookies</h2>
                            <p>We use cookies to enhance your browsing experience. You can adjust your browser settings to refuse cookies.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">7. Contact</h2>
                            <p>If you have questions about this Privacy Policy, email us at <a href="mailto:eetirpltd@gmail.com" className="text-[#1a4a8a] hover:underline">eetirpltd@gmail.com</a></p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}