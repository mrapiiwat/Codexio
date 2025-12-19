"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Mail,
  MessageCircle,
  Twitter,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  HelpCircle
} from "lucide-react";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-teal-500 selection:text-white font-sans flex flex-col">

      <div className="inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none h-full fixed" />

      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg group">
            <div className="w-8 h-8 bg-linear-to-br from-teal-400 to-indigo-500 rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
              <Code2 size={18} className="text-white" />
            </div>
            <span>Codexio</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-sm font-medium hover:text-white transition text-slate-400 hidden sm:block">Docs</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-white transition text-slate-400 hidden sm:block">Contact</Link>
            <Link href="/login" className="bg-white text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-teal-50 transition shadow-lg shadow-teal-500/10">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 grow pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium border border-teal-500/20">
              <MessageCircle size={14} /> <span>We'd love to hear from you</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Get in touch</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Have a question about Codexio? Whether you're interested in a custom enterprise plan or just want to report a bug, our team is ready to answer.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white">Contact Information</h3>

              <div className="space-y-4">
                <a href="mailto:support@codexio.io" className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-500/30 hover:bg-white/10 transition group">
                  <div className="p-3 bg-slate-900 rounded-xl text-teal-400 group-hover:scale-110 transition">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email Support</h4>
                    <p className="text-sm text-slate-400">support@codexio.io</p>
                    <p className="text-xs text-slate-500 mt-1">Response time: within 24 hours</p>
                  </div>
                </a>

                <a href="#" className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition group">
                  <div className="p-3 bg-slate-900 rounded-xl text-indigo-400 group-hover:scale-110 transition">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Discord Community</h4>
                    <p className="text-sm text-slate-400">Join our server</p>
                    <p className="text-xs text-slate-500 mt-1">Get help from 5,000+ developers</p>
                  </div>
                </a>

                <a href="#" className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-400/30 hover:bg-white/10 transition group">
                  <div className="p-3 bg-slate-900 rounded-xl text-blue-400 group-hover:scale-110 transition">
                    <Twitter size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Twitter / X</h4>
                    <p className="text-sm text-slate-400">@codexio_app</p>
                    <p className="text-xs text-slate-500 mt-1">Follow us for updates</p>
                  </div>
                </a>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-white font-semibold flex items-center gap-2 mb-4">
                  <MapPin size={18} className="text-red-400" /> Our Office
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  123 Innovation Drive, Tech District<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">

              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none" />

              {isSuccess ? (
                <div className="h-full min-h-100 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-400">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400 mb-8 max-w-xs mx-auto">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-teal-400 hover:text-teal-300 font-medium underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">First Name</label>
                      <input required type="text" placeholder="John" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Last Name</label>
                      <input required type="text" placeholder="Doe" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email Address</label>
                    <input required type="email" placeholder="john@company.com" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Subject</label>
                    <select className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition appearance-none cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Enterprise Plan</option>
                      <option>Report a Bug</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Message</label>
                    <textarea required rows={5} placeholder="How can we help you?" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition resize-none"></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-24 pt-16 border-t border-white/10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400">Maybe the answer you're looking for is already here.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { q: "Is Codexio free to use?", a: "Yes, we have a generous free tier for public repositories. Private repositories require a Pro plan." },
                { q: "Does it work with private repos?", a: "Absolutely. We use secure OAuth 2.0 to access your private code without storing it." },
                { q: "What languages are supported?", a: "We support JS, TS, Python, Go, Rust, Java, and many more. Check the docs for the full list." },
                { q: "Can I customize the output?", a: "Yes, you can add a `codexio.json` file to your project root to configure sections and style." },
                { q: "How do I report a bug?", a: "You can use the form above or open an issue on our public GitHub repository." },
                { q: "Do you offer enterprise support?", a: "Yes, we offer dedicated support and SLA for enterprise customers. Contact us for details." },
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-slate-900/30 border border-white/5 rounded-2xl hover:bg-slate-900/50 transition">
                  <h4 className="text-white font-semibold mb-3 flex items-start gap-2">
                    <HelpCircle size={18} className="text-teal-500 mt-1 shrink-0" /> {faq.q}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <footer className="border-t border-white/5 py-12 bg-slate-950 text-slate-400 text-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-white font-bold text-xl">
            <Code2 size={24} className="text-teal-400" /> Codexio
          </div>
          <p className="mb-6">AI-powered documentation generator for modern developers.</p>
          <p>© 2024 Codexio. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default ContactPage;