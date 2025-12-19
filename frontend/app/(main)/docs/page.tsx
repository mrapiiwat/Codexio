"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Book,
  Code2,
  Terminal,
  Cpu,
  Menu,
  X,
  Search,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Users,
  MessageCircle,
  Github,
  Lock,
  Settings,
  AlertTriangle,
  Check
} from "lucide-react";

const docSections = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", id: "intro", desc: "Overview of Codexio." },
      { title: "Quick Start", id: "quick-start", desc: "Generate docs via Web UI." },
      { title: "CLI Installation", id: "cli", desc: "Install and use the CLI tool." },
    ]
  },
  {
    title: "Core Concepts",
    items: [
      { title: "AI Analysis Engine", id: "ai-engine", desc: "How parsing works." },
      { title: "Supported Languages", id: "languages", desc: "Compatible tech stacks." },
    ]
  },
  {
    title: "Advanced Usage",
    items: [
      { title: "Configuration", id: "configuration", desc: "Customizing codexio.json." },
    ]
  },
  {
    title: "Security & Support",
    items: [
      { title: "Privacy & Security", id: "privacy", desc: "Data handling policy." },
      { title: "Troubleshooting", id: "troubleshooting", desc: "Common errors." },
      { title: "Community", id: "community", desc: "Join the discussion." },
    ]
  }
];

const flatDocItems = docSections.flatMap(section => section.items);

const DocsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  // Scroll Spy Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Search Logic
  const searchResults = searchQuery.length > 0
    ? docSections.flatMap(section =>
      section.items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ).map(item => ({ ...item, section: section.title }))
    )
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchResultClick = (id: string) => {
    setSearchQuery("");
    setIsSearchFocused(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-teal-500 selection:text-white font-sans">
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition text-slate-400 hover:text-white"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg group">
              <div className="w-8 h-8 bg-linear-to-br from-teal-400 to-indigo-500 rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Code2 size={18} className="text-white" />
              </div>
              <span>Codexio</span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-mono">
                DOCS
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative hidden md:block" ref={searchRef}>
              <div className={`flex items-center gap-2 px-3 py-1.5 bg-white/5 border rounded-lg text-sm text-slate-500 w-64 transition cursor-text group ${isSearchFocused ? 'border-teal-500/50 ring-1 ring-teal-500/20 bg-slate-900' : 'border-white/10 hover:border-white/20'}`}>
                <Search size={14} className={`transition ${isSearchFocused ? 'text-teal-400' : 'group-hover:text-slate-300'}`} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500 w-full text-sm h-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                />
                {!searchQuery && (
                  <div className="ml-auto flex gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-slate-400 font-mono">⌘K</kbd>
                  </div>
                )}
              </div>

              {isSearchFocused && searchQuery && (
                <div className="absolute top-full mt-2 left-0 w-80 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  {searchResults.length > 0 ? (
                    <ul className="py-2">
                      <li className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Results</li>
                      {searchResults.map((result, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleSearchResultClick(result.id)}
                            className="w-full text-left px-4 py-3 hover:bg-white/5 transition border-l-2 border-transparent hover:border-teal-500 group"
                          >
                            <div className="text-sm text-slate-200 font-medium group-hover:text-teal-400">{result.title}</div>
                            <div className="text-xs text-slate-500 truncate">{result.desc}</div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-slate-500 text-sm">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
            <Link href="/" className="text-sm font-medium hover:text-white transition text-slate-400">Back to App</Link>
            <Link href="/login" className="bg-white text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-teal-50 transition shadow-lg shadow-teal-500/10">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-400mx-auto flex">

        <aside className={`
          fixed inset-y-0 left-0 z-40 w-72 transform bg-slate-950 border-r border-white/5 pt-20 pb-10 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:pt-8 lg:h-[calc(100vh-60px)] lg:static lg:top-15
          ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
        `}>
          <div className="h-full overflow-y-auto px-6 space-y-8 scrollbar-hide">
            {docSections.map((section, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-white mb-3 text-xs tracking-wider uppercase opacity-50 pl-3">{section.title}</h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`
                            flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all group
                            ${activeSection === item.id
                            ? "bg-teal-500/10 text-teal-400 font-medium"
                            : "text-slate-400 hover:bg-white/5 hover:text-teal-400"
                          }
                        `}
                      >
                        {item.id === 'intro' && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-500" />}
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0 py-10 px-6 lg:px-16 xl:px-24">
          <div className="max-w-3xl mx-auto space-y-16 pb-32">

            <div className="space-y-6 border-b border-white/5 pb-10">
              <div className="flex items-center gap-2 text-teal-400 text-sm font-medium mb-2">
                Docs <ChevronRight size={14} /> Introduction
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Introduction</h1>
              <p className="text-xl text-slate-400 leading-relaxed font-light">
                Codexio transforms your codebase into comprehensive, professional documentation in seconds. Stop writing READMEs manually and focus on shipping code.
              </p>
              <div className="flex gap-3 pt-4">
                <button className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition text-sm shadow-lg shadow-teal-900/20">
                  Get Started Free
                </button>
                <a href="https://github.com/mrapiiwat/Codexio.git" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition text-sm border border-white/10">
                  View on GitHub
                </a>
              </div>
            </div>

            <section id="intro" className="space-y-6 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 group">
                <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20 transition"><Book size={20} /></div>
                What is Codexio?
              </h2>
              <p className="leading-7 text-slate-300">
                Codexio is an automated documentation generator powered by advanced Large Language Models (LLMs). Unlike simple comment scrapers, Codexio reads your entire repository to understand the <strong>context</strong>, <strong>architecture</strong>, and <strong>business logic</strong> before writing a single word.
              </p>
              <ul className="space-y-3 mt-4">
                {[
                  "Analyzes file relationships and dependency graphs.",
                  "Generates installation guides based on package.json or requirements.txt.",
                  "Creates usage examples from your test files and API routes.",
                  "Updates automatically when you push code (via CI/CD)."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400">
                    <Check size={18} className="text-teal-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="quick-start" className="space-y-8 scroll-mt-24 pt-8 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 group">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition"><Zap size={20} /></div>
                Quick Start (Web UI)
              </h2>
              <p className="text-slate-300">The fastest way to generate documentation is through our web interface:</p>

              <div className="space-y-6">
                {[
                  { title: "Copy Repository URL", desc: "Navigate to your GitHub repository and copy the URL from your browser address bar." },
                  { title: "Paste in Codexio", desc: "Go to codexio.io and paste the link into the generator input box." },
                  { title: "Generate & Export", desc: "Click 'Generate'. Within seconds, you'll see a live preview. Click 'Download' to get your README.md." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center font-bold text-slate-500 border border-slate-700 group-hover:border-teal-500 group-hover:text-teal-400 transition-colors">
                      {i + 1}
                    </div>
                    <div className="pt-1">
                      <h4 className="font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">{step.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="cli" className="space-y-6 scroll-mt-24 pt-8 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 group">
                <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition"><Terminal size={20} /></div>
                CLI Installation
              </h2>
              <p className="leading-7 text-slate-300">
                Prefer the terminal? Use our CLI to generate docs directly from your local machine.
              </p>

              <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                  <span className="text-xs font-mono text-slate-500">Terminal</span>
                  <button onClick={() => copyToClipboard("npm install -g codexio-cli")} className="text-xs text-teal-400 hover:text-teal-300 transition">
                    {copiedCode === "npm install -g codexio-cli" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="p-4 font-mono text-sm space-y-2">
                  <div className="text-slate-400"># Install globally</div>
                  <div className="text-white">$ npm install -g codexio-cli</div>
                  <div className="text-slate-400 mt-4"># Generate docs for current folder</div>
                  <div className="text-white">$ codexio generate .</div>
                </div>
              </div>
            </section>

            <section id="ai-engine" className="space-y-6 scroll-mt-24 pt-8 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 group">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition"><Cpu size={20} /></div>
                AI Analysis Engine
              </h2>
              <p className="leading-7 text-slate-300">
                Codexio uses a multi-stage process to ensure accuracy. We don't just "guess" what your code does.
              </p>
              <div className="grid gap-4 mt-4">
                {[
                  { title: "1. Parsing", desc: "We build an Abstract Syntax Tree (AST) to understand the structure of your code without executing it." },
                  { title: "2. Context Extraction", desc: "We identify key entry points, exported functions, and API routes." },
                  { title: "3. Dependency Mapping", desc: "We map out how files interact with each other to explain the architecture." },
                  { title: "4. LLM Synthesis", desc: "Finally, we use a fine-tuned model to write human-readable explanations." }
                ].map((step, i) => (
                  <div key={i} className="p-4 border border-white/5 rounded-xl bg-white/2">
                    <h4 className="font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-slate-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="languages" className="space-y-6 scroll-mt-24 pt-8 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 group">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition"><Globe size={20} /></div>
                Supported Languages
              </h2>
              <p className="leading-7 text-slate-300">
                We currently offer full support with syntax highlighting and deep context analysis for the following:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java', 'PHP', 'Ruby'].map((lang) => (
                  <div key={lang} className="p-4 bg-white/3border border-white/5 rounded-xl text-center hover:border-teal-500/30 hover:bg-white/5transition cursor-default">
                    <span className="text-slate-300 font-medium">{lang}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="configuration" className="space-y-6 scroll-mt-24 pt-8 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 group">
                <div className="p-1.5 rounded-lg bg-gray-500/10 text-gray-400 group-hover:bg-gray-500/20 transition"><Settings size={20} /></div>
                Configuration
              </h2>
              <p className="leading-7 text-slate-300">
                You can customize the output by adding a <code>codexio.json</code> file to the root of your project.
              </p>
              <div className="bg-slate-900 rounded-xl border border-white/10 p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-slate-300">
                  {`{
  "projectName": "My Awesome App",
  "style": "professional",  // options: professional, casual, funny
  "includeBadges": true,
  "sections": {
    "installation": true,
    "apiReference": true,
    "contributing": false
  },
  "ignore": ["tests/", "dist/"]
}`}
                </pre>
              </div>
            </section>


            <section id="privacy" className="space-y-6 scroll-mt-24 pt-8 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 group">
                <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/20 transition"><Lock size={20} /></div>
                Privacy & Security
              </h2>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex gap-4">
                  <div className="mt-1"><ShieldCheck className="text-teal-500" /></div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Ephemeral Processing</h4>
                    <p className="text-sm text-slate-400">Your code is processed in ephemeral containers. Once the analysis is complete, the code is immediately wiped from our servers.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1"><Lock className="text-teal-500" /></div>
                  <div>
                    <h4 className="text-white font-bold mb-1">OAuth 2.0 Security</h4>
                    <p className="text-sm text-slate-400">We use standard OAuth 2.0 protocols. We only request read-only access to the specific repositories you select.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="troubleshooting" className="space-y-6 scroll-mt-24 pt-8 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 group">
                <div className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20 transition"><AlertTriangle size={20} /></div>
                Troubleshooting
              </h2>
              <div className="space-y-4">
                <div className="p-4 border border-white/5 rounded-xl bg-white/2">
                  <h4 className="font-bold text-white mb-1">Analysis Failed (Timeout)</h4>
                  <p className="text-sm text-slate-400">Large repositories (500MB) may time out. Try ignoring large assets in <code>codexio.json</code>.</p>
                </div>
                <div className="p-4 border border-white/5 rounded-xl bg-white/2">
                  <h4 className="font-bold text-white mb-1">Incorrect Context</h4>
                  <p className="text-sm text-slate-400">If the AI misinterprets your code, ensure you have a clear entry point (like <code>index.js</code> or <code>main.py</code>).</p>
                </div>
              </div>
            </section>

            <section id="community" className="space-y-6 scroll-mt-24 pt-8 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 group">
                <div className="p-1.5 rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition"><Users size={20} /></div>
                Community & Support
              </h2>
              <p className="leading-7 text-slate-300">
                We welcome contributions! Whether you want to fix a bug or add a new parser, check out our repository.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#" className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="text-teal-500" />
                    <span className="font-medium text-slate-300">Join Discord</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-teal-400" />
                </a>
                <a href="https://github.com/mrapiiwat/Codexio.git" className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <Github className="text-white" />
                    <span className="font-medium text-slate-300">Star on GitHub</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-teal-400" />
                </a>
              </div>
            </section>

          </div>
        </main>

        <aside className="hidden xl:block w-64 py-10 pr-8 sticky top-20 h-[calc(100vh-5rem)]">
          <h5 className="text-xs font-bold text-white mb-4 uppercase tracking-widest opacity-60">On this page</h5>
          <ul className="space-y-3 text-sm border-l border-white/10">
            {flatDocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`
                            block pl-4 -ml-0.5transition-all duration-200 border-l-2 truncate
                            ${activeSection === item.id
                      ? "border-teal-500 text-teal-400 font-medium scale-105 origin-left"
                      : "border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-500"
                    }
                        `}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

      </div>
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

export default DocsPage;