import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Terms() {
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
                    <h1 className="text-3xl md:text-4xl font-black text-[#0a1628] mb-6">Terms of Use</h1>
                    <p className="text-[#4a6a8f] mb-8 text-sm">Last Updated: June 2026</p>

                    <div className="space-y-8 text-[#4a6a8f] text-sm leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">1. Acceptance of Terms</h2>
                            <p>By using the EETIRP website and services, you agree to these Terms of Use. If you do not agree, please do not use our services.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">2. Services Provided</h2>
                            <p>EETIRP provides engineering training programs, coding bootcamps, SaaS development, and placement preparation services. All services are subject to availability.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">3. User Accounts</h2>
                            <p>You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">4. Intellectual Property</h2>
                            <p>All content on this website, including text, graphics, logos, and software, is the property of EETIRP LTD and protected by copyright laws.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">5. User Conduct</h2>
                            <p>You agree not to misuse our services, harass others, or attempt to gain unauthorized access to our systems.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">6. Disclaimer</h2>
                            <p>Our services are provided "as is" without warranties of any kind. EETIRP is not liable for any damages arising from use of our services.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#0a1628] mb-3">7. Contact</h2>
                            <p>Questions about these Terms? Email us at <a href="mailto:eetirpltd@gmail.com" className="text-[#1a4a8a] hover:underline">eetirpltd@gmail.com</a></p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}