"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Code2, Github, Terminal, Cpu, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const comp = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      const tl = gsap.timeline();
      tl.from(".hero-elem", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.to(bgGridRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: comp.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="bg-slate-950 text-white overflow-x-hidden relative selection:bg-teal-500 selection:text-white min-h-screen flex flex-col">

      <div ref={bgGridRef} className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none h-full" />

      <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-xl font-bold flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-linear-to-br from-teal-400 to-indigo-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Code2 size={20} className="text-white" />
            </div>
            <span>Codexio</span>
          </div>
          <div className="flex gap-4">
            <Link href="/docs" className="text-slate-300 hover:text-white transition py-2 text-sm font-medium">Docs</Link>
            <Link href="/contact" className="text-slate-300 hover:text-white transition py-2 text-sm font-medium">Contact</Link>
            <Link href="/login" className="bg-white text-slate-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-teal-50 hover:scale-105 transition shadow-lg shadow-teal-500/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main ref={heroRef} className="relative z-10 max-w-6xl mx-auto pt-40 px-6 text-center pb-32 grow">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125bg-teal-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="space-y-8 mb-12">
          <div className="hero-elem inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-medium mb-4">
            <Sparkles size={14} />
            <span>AI-Powered Documentation Generator</span>
          </div>

          <h1 className="hero-elem text-5xl md:text-8xl font-extrabold tracking-tight leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-linear-to-b from-white via-white to-slate-500">Stop writing docs.</span> <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-indigo-500">Let AI code for you.</span>
          </h1>

          <p className="hero-elem text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Generates beautiful, comprehensive READMEs from your codebase in seconds using advanced AI analysis.
          </p>
        </div>

        <div className="hero-elem max-w-xl mx-auto relative group z-30 mb-10">
          <div className="absolute -inset-1 bg-linear-to-r from-teal-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
          <div className="relative flex items-center bg-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl p-2 ring-1 ring-white/10">
            <div className="pl-4 text-slate-500 font-mono hidden sm:block">github.com/</div>
            <input type="text" placeholder="username/repository" className="flex-1 bg-transparent border-none outline-none text-white px-3 py-4 placeholder:text-slate-600 w-full font-mono" />
            <button className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2">
              Generate <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="hero-elem pt-10 border-t border-white/5">
          <p className="text-slate-500 text-sm mb-6">TRUSTED BY DEVELOPERS WORKING WITH</p>
          <div className="flex justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2"><Github /> <span className="font-bold">GitHub</span></div>
            <div className="flex items-center gap-2"><Globe /> <span className="font-bold">Vercel</span></div>
            <div className="flex items-center gap-2"><Terminal /> <span className="font-bold">Next.js</span></div>
            <div className="flex items-center gap-2"><Cpu /> <span className="font-bold">OpenAI</span></div>
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

export default HomePage;