"use client";

import Link from "next/link";
import { BookOpenText, Github, Chrome, ArrowRight, ShieldCheck } from "lucide-react";

const Login = () => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}...`);
  };

  return (
    <div className="min-h-screen flex bg-white selection:bg-teal-500 selection:text-white">

      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-slate-950 items-center justify-center">

        <div className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#2dd4bf 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}>
        </div>


        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>

        <div className="relative z-10 p-12 text-center max-w-lg">
          <div className="inline-flex mb-8 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl shadow-teal-500/10">
            <BookOpenText size={56} className="text-teal-400" />
          </div>

          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Document your code <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-indigo-400">
              like a Pro.
            </span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Stop wasting time writing READMEs manually. <br />
            Let Codexio's AI analyze your repository and generate comprehensive documentation in seconds.
          </p>

          <div className="flex justify-center gap-4 text-sm font-medium text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck size={14} className="text-teal-400" /> Secure
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Chrome size={14} className="text-teal-400" /> Fast
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">

        <div className="lg:hidden absolute top-8 left-8">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-xl">
            <div className="p-1.5 bg-slate-900 rounded-lg">
              <BookOpenText size={20} className="text-white" />
            </div>
            <span>Codexio</span>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-slate-500">
              Please sign in to access your dashboard.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <button
              onClick={() => handleSocialLogin("github")}
              className="group w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-slate-900 text-base font-bold rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all duration-200 shadow-lg shadow-slate-900/20 active:scale-[0.98]"
            >
              <Github size={20} className="text-white group-hover:scale-110 transition-transform" />
              <span>Continue with GitHub</span>
              <ArrowRight size={16} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-400">or</span>
              </div>
            </div>

            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-slate-200 text-base font-medium rounded-xl text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all duration-200 active:scale-[0.98]"
            >
              <Chrome size={20} className="text-red-500" />
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="text-xs text-center text-slate-500 mt-10">
            Having trouble signing in?{" "}
            <Link
              href="/contact"
              className="font-semibold text-slate-900 hover:text-teal-600 hover:underline transition-colors"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;