import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#040a1c] text-white px-6 md:px-16 py-32">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-[#abd2fa] hover:text-white transition-colors mb-8 font-mono text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#091540] border-2 border-[#3d518c]/50 rounded-3xl p-8 md:p-12"
                >
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-6">Privacy Policy</h1>
                    <p className="text-gray-400 mb-2">Last Updated: June 2026</p>

                    <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                            <p>We collect personal information you provide directly, including name, email address, and inquiry details when you fill out our onboarding form.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
                            <p>We use your information to respond to inquiries, provide services, send updates about EETIRP programs, and improve our offerings.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">3. Data Sharing</h2>
                            <p>We do not sell or rent your personal information to third parties. We may share data with trusted partners who assist in operating our services.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">4. Data Security</h2>
                            <p>We implement security measures to protect your personal information. However, no transmission over the internet is 100% secure.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">5. Your Rights</h2>
                            <p>You may request access, correction, or deletion of your personal data by contacting us at <a href="mailto:eetirpltd@gmail.com" className="text-[#7692ff] hover:underline">eetirpltd@gmail.com</a></p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">6. Cookies</h2>
                            <p>We use cookies to enhance your browsing experience. You can adjust your browser settings to refuse cookies.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">7. Contact</h2>
                            <p>If you have questions about this Privacy Policy, email us at <a href="mailto:eetirpltd@gmail.com" className="text-[#7692ff] hover:underline">eetirpltd@gmail.com</a></p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}