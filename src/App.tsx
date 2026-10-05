/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

const LOGO_HEADER = "https://lh3.googleusercontent.com/aida-public/AB6AXuCM8ZBzN4Ql-9549k2zZkgPD8CxH_0A2Ire1CouhUW7yC_gDIWij9yRbQaZo4g9RqPEPs_y39kEANIb1k0zFKTmbjv98Hw8AUAt-D6uPosWkXnc84CBVD_RHVlXeYrlcbh5bC4oQr1MjG5KWIrK9JgkvY-d3BKz43rpYOcsEeamk_SrOs2wG3VT634xTM4INws38812LAsoZZ8uTO1YzCCVy7oqvVgb9X0eLRkeGiprcywE39cayx24auZv7S-CM8e32wg";
const HERO_CREST = "https://lh3.googleusercontent.com/aida-public/AB6AXuBJyIOFX3mkUKaYaiCfzYhUfk4ivNKJxOhhEBI1f7E3EVmXGyU9XbwqIs3-1qOWQaJyQUgYD8aigCZCJSeZsdQXfHIZjic9IjzLqhDjZChd1SFEpkwrMgPVG4UZplShKV3s_ecUDK0_XpSA4JiELRqePKI013SvRQiLEbyVs7VsDD6olHvMZxgXz3d6p1y-qfHTWomyHMtq6UERYAJs2uMOdM4nmAfqsTwRSM9mSOp-e02c6km0Xs1-ZATU2VmTU1RQzkg";
const LOGO_FOOTER = "https://lh3.googleusercontent.com/aida-public/AB6AXuD4rlUmVWlXNIWHNhTWQv5rZZ9JG8OqdzQDn0_jpSa3nAfCSNPgr18YE1tSRIDnS7smqPRm4JGGV3zkA5H7JQyHGJJhIfHsbvBatO6stsxRBql4XhLmlcUokSpEezPiZSTUYF-JCfnIkyn2X3doXeQZB22px5-tHId5m-GQFUMv-iRitev-SLshQ5gMGz5c8tvkiaqOKj1ubcP2h9lFY0DOBZdWkFE4YJa5I8sC1G6Cp_AAYtW5psHL6dqOY3-8Em42RhQ";

const SERVICE_OPTIONS = [
  "AI Solutions",
  "Software Development",
  "Business Automation",
  "Business Systems",
  "Digital Growth",
  "Other"
];

// Official Business WhatsApp Configuration
const WHATSAPP_NUMBER = "919111436410";
const DEFAULT_PREFILLED_MESSAGE = "Hi BRAJ TECHNOLOGIES, I’d like to discuss a business/technology requirement.";
const WHATSAPP_ENQUIRY_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_PREFILLED_MESSAGE)}`;


interface EnquiryPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  details: string;
  budgetTimeline?: string;
}

const buildWhatsAppEnquiryUrl = (data: EnquiryPayload) => {
  const budget = data.budgetTimeline && data.budgetTimeline.trim() ? data.budgetTimeline.trim() : "Not specified";
  const message = `Hi BRAJ TECHNOLOGIES,\n\nI’d like to discuss a business/technology requirement.\n\nName: ${data.name.trim()}\nCompany: ${data.company.trim()}\nEmail: ${data.email.trim()}\nPhone: ${data.phone.trim()}\nRequirement Type: ${data.service}\nBudget / Timeline: ${budget}\n\nRequirement Details:\n${data.details.trim()}\n\nPlease get in touch with me regarding this enquiry.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [liveTokenRate, setLiveTokenRate] = useState(4280);

  // Modal Form State
  const [modalForm, setModalForm] = useState<EnquiryPayload>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'AI Solutions',
    details: '',
    budgetTimeline: ''
  });
  const [modalErrors, setModalErrors] = useState<Record<string, string>>({});
  const [modalSubmittedUrl, setModalSubmittedUrl] = useState<string | null>(null);

  // In-Page Section Form State
  const [pageForm, setPageForm] = useState<EnquiryPayload>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'AI Solutions',
    details: '',
    budgetTimeline: ''
  });
  const [pageErrors, setPageErrors] = useState<Record<string, string>>({});
  const [pageSubmittedUrl, setPageSubmittedUrl] = useState<string | null>(null);

  // Subtle live telemetry pulse for real-time feel
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTokenRate(prev => {
        const delta = Math.floor(Math.random() * 41) - 20;
        return Math.max(4200, Math.min(4350, prev + delta));
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Lock scroll when modal is active and listen to Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEnquiryModalOpen(false);
      }
    };
    if (enquiryModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enquiryModalOpen]);

  const handleOpenEnquiryModal = (serviceDefault = 'AI Solutions') => {
    setModalForm(prev => ({ ...prev, service: serviceDefault }));
    setModalErrors({});
    setModalSubmittedUrl(null);
    setEnquiryModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!modalForm.name.trim()) errors.name = 'Name is required';
    if (!modalForm.company.trim()) errors.company = 'Company / Business Name is required';
    if (!modalForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalForm.email.trim())) {
      errors.email = 'Valid corporate email is required';
    }
    if (!modalForm.phone.trim()) errors.phone = 'Phone number is required';
    if (!modalForm.details.trim()) errors.details = 'Please tell us about your requirement';

    if (Object.keys(errors).length > 0) {
      setModalErrors(errors);
      return;
    }

    setModalErrors({});
    const url = buildWhatsAppEnquiryUrl(modalForm);
    setModalSubmittedUrl(url);

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Browser popup blocker fallback - user can click the button on screen
    }
  };

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!pageForm.name.trim()) errors.name = 'Name is required';
    if (!pageForm.company.trim()) errors.company = 'Company / Business Name is required';
    if (!pageForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pageForm.email.trim())) {
      errors.email = 'Valid corporate email is required';
    }
    if (!pageForm.phone.trim()) errors.phone = 'Phone number is required';
    if (!pageForm.details.trim()) errors.details = 'Please tell us about your requirement';

    if (Object.keys(errors).length > 0) {
      setPageErrors(errors);
      return;
    }

    setPageErrors({});
    const url = buildWhatsAppEnquiryUrl(pageForm);
    setPageSubmittedUrl(url);

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback
    }
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-[#070A10] font-body-md text-[#F2F4FA] antialiased relative selection:bg-[#F2CA50] selection:text-[#281E00] min-h-screen">
      {/* Ambient Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070a12]/85 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="h-20 max-w-[1360px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md">
          {/* Exact Logo & Typography */}
          <a className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 group" href="#hero" aria-label="BRAJ TECHNOLOGIES - Return to homepage">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-full p-[1.5px] bg-gradient-to-tr from-[#F2CA50] via-[#FFE088] to-[#F2CA50]/40 shadow-[0_0_15px_rgba(242,202,80,0.3)] transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0e16] flex items-center justify-center">
                <img
                  alt="BRAJ TECHNOLOGIES Official Brand Seal - AI, Software & Automation"
                  className="h-full w-full object-cover"
                  src={LOGO_HEADER}
                  loading="eager"
                  width="44"
                  height="44"
                />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-[16px] min-[375px]:text-[18px] sm:text-[19px] tracking-[0.12em] sm:tracking-[0.14em] text-white font-extrabold uppercase leading-none truncate sm:overflow-visible">
                BRAJ <span className="text-[#F2CA50] font-normal tracking-[0.14em] sm:tracking-[0.2em] text-[13px] min-[375px]:text-[14px] sm:text-[15px] ml-1">TECHNOLOGIES</span>
              </span>
              <span className="font-label-caps text-[7px] min-[360px]:text-[7.5px] min-[390px]:text-[8px] sm:text-[9px] tracking-[0.05em] min-[360px]:tracking-[0.08em] min-[390px]:tracking-[0.12em] sm:tracking-[0.22em] text-[#A69E8D] uppercase mt-0.5 sm:mt-1 whitespace-nowrap overflow-hidden text-ellipsis sm:overflow-visible">
                AI • SOFTWARE • AUTOMATION • BUSINESS GROWTH
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            <a className="transition-colors tracking-wide text-[#F2CA50] font-semibold text-sm hover:text-[#FFE088]" href="#hero">Solutions</a>
            <a className="text-sm font-medium text-[#B8B3A4] hover:text-white transition-colors tracking-wide" href="#what-we-build">What We Build</a>
            <a className="text-sm font-medium text-[#B8B3A4] hover:text-white transition-colors tracking-wide" href="#ai-solutions">AI Solutions</a>
            <a className="text-sm font-medium text-[#B8B3A4] hover:text-white transition-colors tracking-wide" href="#software-in-action">Software &amp; Automation</a>
            <a className="text-sm font-medium text-[#B8B3A4] hover:text-white transition-colors tracking-wide" href="#business-growth">Business Growth</a>
            <a className="text-sm font-medium text-[#B8B3A4] hover:text-white transition-colors tracking-wide" href="#philosophy">Vision</a>
            <a className="text-sm font-medium text-[#B8B3A4] hover:text-white transition-colors tracking-wide" href="#contact-engagement">Contact</a>
          </nav>

          {/* Right CTAs & Hamburger Toggle */}
          <div className="flex items-center gap-3 md:gap-space-md shrink-0">
            <div className="hidden md:flex items-center gap-space-xs px-3 py-1 rounded-full bg-[#1B2234]/70 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7BD0FF] animate-pulse shadow-[0_0_8px_#7BD0FF]"></span>
              <span className="font-label-caps text-[10px] uppercase text-[#7BD0FF] tracking-widest">Global Deployments</span>
            </div>
            <button
              type="button"
              onClick={() => handleOpenEnquiryModal()}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#F2CA50] via-[#FFE088] to-[#F2CA50] text-[#281E00] font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_24px_rgba(242,202,80,0.45)] transition-all cursor-pointer"
            >
              BUILD WITH US →
            </button>
            {/* Hamburger Button (Mobile / Tablet) */}
            <button
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="xl:hidden p-2 rounded-lg bg-[#141A29] border border-white/10 text-white hover:text-[#F2CA50] transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-white/5 bg-[#070A10]/98 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#7BD0FF] animate-pulse"></span>
              <span className="font-label-caps text-xs text-[#7BD0FF] tracking-widest uppercase">Global Enterprise Deployments Active</span>
            </div>
            <a onClick={handleNavClick} className="text-base font-semibold text-[#F2CA50] py-2 border-b border-white/5" href="#hero">Solutions</a>
            <a onClick={handleNavClick} className="text-base text-[#F2F4FA] hover:text-[#F2CA50] py-2 border-b border-white/5 transition-colors" href="#what-we-build">What We Build</a>
            <a onClick={handleNavClick} className="text-base text-[#F2F4FA] hover:text-[#F2CA50] py-2 border-b border-white/5 transition-colors" href="#ai-solutions">AI Solutions</a>
            <a onClick={handleNavClick} className="text-base text-[#F2F4FA] hover:text-[#F2CA50] py-2 border-b border-white/5 transition-colors" href="#software-in-action">Software &amp; Automation</a>
            <a onClick={handleNavClick} className="text-base text-[#F2F4FA] hover:text-[#F2CA50] py-2 border-b border-white/5 transition-colors" href="#business-growth">Business Growth</a>
            <a onClick={handleNavClick} className="text-base text-[#F2F4FA] hover:text-[#F2CA50] py-2 border-b border-white/5 transition-colors" href="#philosophy">Vision</a>
            <a onClick={handleNavClick} className="text-base text-[#F2F4FA] hover:text-[#F2CA50] py-2 transition-colors" href="#contact-engagement">Contact</a>
            <button
              type="button"
              onClick={() => {
                handleNavClick();
                handleOpenEnquiryModal();
              }}
              className="mt-2 w-full text-center py-3 rounded-lg bg-gradient-to-r from-[#F2CA50] via-[#FFE088] to-[#F2CA50] text-[#281E00] font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
            >
              BUILD WITH US →
            </button>
          </div>
        )}
      </header>

      <main className="w-full pt-20 bg-[#070A10] min-h-screen">
        <div className="flex flex-col w-full">
          {/* CINEMATIC HERO SECTION */}
          <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden pt-6 sm:pt-10 md:pt-16 pb-8 md:pb-12 cosmic-gradient scroll-mt-20" id="hero">
            <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/3 w-[340px] sm:w-[500px] md:w-[700px] h-[300px] md:h-[500px] max-w-full bg-[#7BD0FF]/10 blur-[120px] md:blur-[160px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 md:left-1/4 w-full md:w-[900px] h-[300px] md:h-[400px] bg-gradient-to-t from-[#F2CA50]/20 via-[#F2CA50]/10 to-transparent blur-[100px] md:blur-[140px] rounded-full"></div>
              
              {/* Starlight Points Layer */}
              <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12%" cy="18%" fill="#fff" opacity="0.8" r="1"></circle>
                <circle cx="28%" cy="12%" fill="#7BD0FF" opacity="0.9" r="1.5"></circle>
                <circle cx="42%" cy="22%" fill="#fff" opacity="0.5" r="1"></circle>
                <circle cx="68%" cy="15%" fill="#7BD0FF" opacity="0.85" r="2"></circle>
                <circle cx="82%" cy="28%" fill="#FFE088" opacity="0.8" r="1.5"></circle>
                <circle cx="91%" cy="10%" fill="#fff" opacity="0.9" r="2"></circle>
                <circle cx="18%" cy="45%" fill="#fff" opacity="0.4" r="1"></circle>
                <circle cx="34%" cy="65%" fill="#F2CA50" opacity="0.6" r="2"></circle>
                <circle cx="52%" cy="48%" fill="#7BD0FF" opacity="0.7" r="1.5"></circle>
                <circle cx="88%" cy="62%" fill="#fff" opacity="0.5" r="1"></circle>
                <circle cx="75%" cy="80%" fill="#F2CA50" opacity="0.5" r="2.5"></circle>
              </svg>

              {/* Upward Sweeping Dynamic Light Beam / Fiber Optics Filament Mesh */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-30 sm:opacity-50 md:opacity-100" 
                fill="none" 
                preserveAspectRatio="xMidYMid slice" 
                viewBox="0 0 1440 980" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="fiberGlowAmberToCyan" x1="0%" x2="90%" y1="90%" y2="10%">
                    <stop offset="0%" stopColor="#F2CA50" stopOpacity="0.95"></stop>
                    <stop offset="35%" stopColor="#FFE088" stopOpacity="0.9"></stop>
                    <stop offset="70%" stopColor="#7BD0FF" stopOpacity="0.95"></stop>
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1"></stop>
                  </linearGradient>
                  <linearGradient id="fiberGlowCyanSoft" x1="10%" x2="85%" y1="95%" y2="5%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6"></stop>
                    <stop offset="45%" stopColor="#7BD0FF" stopOpacity="0.75"></stop>
                    <stop offset="100%" stopColor="#E1F2FF" stopOpacity="0.9"></stop>
                  </linearGradient>
                  <filter height="140%" id="streamGlow" width="140%" x="-20%" y="-20%">
                    <feGaussianBlur result="blur" stdDeviation="4"></feGaussianBlur>
                    <feMerge>
                      <feMergeNode in="blur"></feMergeNode>
                      <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#streamGlow)">
                  <path d="M-80 820 C 350 820, 680 780, 950 560 C 1140 400, 1220 220, 1260 -20" fill="none" stroke="url(#fiberGlowAmberToCyan)" strokeWidth="2.2"></path>
                  <path d="M-40 840 C 380 830, 710 770, 980 540 C 1170 370, 1240 190, 1275 -30" fill="none" stroke="url(#fiberGlowCyanSoft)" strokeWidth="1.8"></path>
                  <path d="M 0 860 C 420 840, 740 760, 1010 520 C 1195 340, 1260 160, 1290 -40" fill="none" stroke="url(#fiberGlowAmberToCyan)" strokeDasharray="12 4" strokeWidth="2.8"></path>
                  <path d="M 60 880 C 460 850, 770 740, 1035 500 C 1215 320, 1275 140, 1305 -50" fill="none" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="1.5"></path>
                  <path d="M 120 900 C 500 860, 800 720, 1060 480 C 1235 300, 1290 120, 1320 -60" fill="none" stroke="url(#fiberGlowAmberToCyan)" strokeWidth="2"></path>
                  <path d="M 180 920 C 540 870, 830 700, 1085 460 C 1250 280, 1305 100, 1335 -70" fill="none" stroke="url(#fiberGlowCyanSoft)" strokeWidth="1.2"></path>
                  <path d="M 240 940 C 580 880, 860 680, 1110 440 C 1270 260, 1320 80, 1350 -80" fill="none" stroke="#7BD0FF" strokeWidth="1.6"></path>
                  <path d="M 300 960 C 620 890, 890 660, 1130 420 C 1285 240, 1330 60, 1360 -90" fill="none" stroke="#FFE088" strokeWidth="1.2"></path>
                  <path d="M 360 980 C 660 900, 920 640, 1150 400 C 1300 220, 1340 40, 1370 -100" fill="none" stroke="#FFFFFF" strokeWidth="1"></path>
                </g>
                {/* Network Constellation Node Intersections */}
                <g fill="#FFFFFF">
                  <circle cx="950" cy="560" fill="#FFE088" r="4"></circle>
                  <circle cx="980" cy="540" fill="#7BD0FF" r="3"></circle>
                  <circle cx="1035" cy="500" fill="#FFFFFF" r="4.5"></circle>
                  <circle cx="1060" cy="480" fill="#7BD0FF" r="3"></circle>
                  <circle cx="1110" cy="440" fill="#FFFFFF" r="4"></circle>
                  <circle cx="1140" cy="400" fill="#7BD0FF" r="4"></circle>
                  <circle cx="1170" cy="370" fill="#FFE088" r="5"></circle>
                  <circle cx="1200" cy="330" fill="#FFFFFF" r="3.5"></circle>
                  <circle cx="1235" cy="280" fill="#7BD0FF" r="4.5"></circle>
                  <circle cx="1260" cy="220" fill="#FFE088" r="3"></circle>
                  <circle cx="1275" cy="160" fill="#FFFFFF" r="4"></circle>
                </g>
                <line opacity="0.6" stroke="#7BD0FF" strokeWidth="0.8" x1="950" x2="980" y1="560" y2="540"></line>
                <line opacity="0.7" stroke="#FFFFFF" strokeWidth="0.8" x1="980" x2="1035" y1="540" y2="500"></line>
                <line opacity="0.6" stroke="#7BD0FF" strokeWidth="0.8" x1="1035" x2="1060" y1="500" y2="480"></line>
                <line opacity="0.8" stroke="#FFFFFF" strokeWidth="0.9" x1="1060" x2="1110" y1="480" y2="440"></line>
                <line opacity="0.6" stroke="#FFE088" strokeWidth="0.8" x1="1110" x2="1140" y1="440" y2="400"></line>
                <line opacity="0.7" stroke="#7BD0FF" strokeWidth="0.8" x1="1140" x2="1170" y1="400" y2="370"></line>
                <line opacity="0.8" stroke="#FFFFFF" strokeWidth="0.8" x1="1170" x2="1200" y1="370" y2="330"></line>
                <line opacity="0.7" stroke="#7BD0FF" strokeWidth="0.9" x1="1200" x2="1235" y1="330" y2="280"></line>
                <line opacity="0.6" stroke="#FFE088" strokeWidth="0.8" x1="1235" x2="1260" y1="280" y2="220"></line>
                {/* Heritage Base Platform & Colonnades (Seamless Width for Mobile & Desktop) */}
                <g fill="#070A10" opacity="0.35">
                  <rect height="250" width="1440" x="0" y="730"></rect>
                  <path d="M 40 730 L 40 680 Q 75 640 110 680 L 110 730 Z"></path>
                  <path d="M 55 640 Q 75 600 95 640 Z"></path>
                  <rect height="12" width="4" x="73" y="590"></rect>
                  <circle cx="75" cy="588" r="3"></circle>
                  <rect height="50" width="8" x="44" y="680"></rect>
                  <rect height="50" width="8" x="98" y="680"></rect>
                  <rect height="50" width="8" x="71" y="680"></rect>
                  <path d="M 160 730 L 160 670 Q 210 625 260 670 L 260 730 Z"></path>
                  <path d="M 180 630 Q 210 580 240 630 Z"></path>
                  <rect height="12" width="4" x="208" y="570"></rect>
                  <circle cx="210" cy="568" r="3.5"></circle>
                  <rect height="60" width="10" x="168" y="670"></rect>
                  <rect height="60" width="10" x="242" y="670"></rect>
                  <rect height="60" width="10" x="205" y="670"></rect>
                  <path d="M 310 730 L 310 685 Q 345 650 380 685 L 380 730 Z"></path>
                  <path d="M 325 655 Q 345 618 365 655 Z"></path>
                  <rect height="12" width="4" x="343" y="608"></rect>
                  <circle cx="345" cy="606" r="3"></circle>
                  <rect height="45" width="7" x="316" y="685"></rect>
                  <rect height="45" width="7" x="367" y="685"></rect>
                  <path d="M 430 730 L 430 695 Q 460 665 490 695 L 490 730 Z"></path>
                  <path d="M 445 668 Q 460 635 475 668 Z"></path>
                  <rect height="10" width="4" x="458" y="628"></rect>
                  <circle cx="460" cy="626" r="2.5"></circle>
                  <rect height="35" width="6" x="435" y="695"></rect>
                  <rect height="35" width="6" x="479" y="695"></rect>
                  <path d="M 0 730 L 0 710 Q 20 695 40 710 L 40 730 Z"></path>
                  <path d="M 110 730 L 110 710 Q 135 695 160 710 L 160 730 Z"></path>
                  <path d="M 260 730 L 260 710 Q 285 695 310 710 L 310 730 Z"></path>
                  <path d="M 380 730 L 380 710 Q 405 695 430 710 L 430 730 Z"></path>
                  <path d="M 490 730 L 490 715 Q 520 705 550 715 L 550 730 Z"></path>
                  <path d="M 550 730 L 550 715 Q 580 705 610 715 L 610 730 Z"></path>
                </g>
              </svg>
              {/* Seamless Ambient Glow Floor */}
              <div className="absolute bottom-4 left-0 w-full md:w-[55%] h-56 bg-gradient-to-t from-[#F2CA50]/30 via-[#F2CA50]/10 to-transparent blur-3xl pointer-events-none"></div>
            </div>

            {/* Hero Content Layer */}
            <div className="relative z-10 max-w-[1360px] mx-auto px-margin-mobile md:px-margin w-full flex flex-col justify-between flex-grow">
              <div className="flex flex-col items-start gap-3 sm:gap-4 pt-2 sm:pt-4 md:pt-6">
                {/* Exact Metallic Brand Seal */}
                <div className="w-14 h-14 min-[375px]:w-16 min-[375px]:h-16 md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-b from-[#FFE088] via-[#D4AF37] to-[#806B22] shadow-[0_0_30px_rgba(242,202,80,0.35)] transition-transform hover:scale-105 shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0D14] flex items-center justify-center p-0.5">
                    <img
                      alt="BRAJ TECHNOLOGIES Sovereign Brand Crest - AI, Software and Automation"
                      className="w-full h-full object-cover"
                      src={HERO_CREST}
                      width="80"
                      height="80"
                    />
                  </div>
                </div>

                {/* "I N T R O D U C I N G" Tracking Label */}
                <div className="pt-1 sm:pt-2">
                  <span className="font-label-caps text-[10px] min-[375px]:text-xs md:text-sm tracking-[0.35em] sm:tracking-[0.45em] text-[#CFC8B8] uppercase font-semibold">
                    I N T R O D U C I N G
                  </span>
                </div>

                {/* Display Title - One Semantic H1 */}
                <h1 className="flex flex-col -mt-1">
                  <span className="font-headline-2xl text-[48px] min-[360px]:text-[56px] min-[390px]:text-[64px] sm:text-[90px] md:text-[116px] lg:text-[132px] leading-none tracking-tight font-black text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
                    BRAJ
                  </span>
                  <span className="font-headline-md sm:font-headline-lg text-[18px] min-[360px]:text-[22px] min-[390px]:text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px] tracking-[0.2em] min-[360px]:tracking-[0.26em] sm:tracking-[0.38em] md:tracking-[0.45em] text-[#E0D8C3] uppercase font-light -mt-0.5 sm:-mt-1 md:-mt-3">
                    TECHNOLOGIES
                  </span>
                </h1>

                {/* Subtitle & Value Statement */}
                <div className="max-w-2xl mt-1 sm:mt-2 md:mt-4">
                  <p className="text-lg min-[375px]:text-xl md:text-2xl text-white font-normal tracking-wide leading-snug drop-shadow-[0_2px_10px_rgba(7,10,16,0.8)]">
                    Building technology that moves businesses forward.
                  </p>
                  <p className="text-xs min-[375px]:text-sm md:text-base text-[#B8B3A4] font-normal mt-2 leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(7,10,16,0.8)]">
                    AI, software, automation and digital systems designed around real business needs. Scalable technological foundations that eliminate operational bottlenecks and compound enterprise valuation.
                  </p>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto relative z-20">
                  <button
                    type="button"
                    onClick={() => handleOpenEnquiryModal()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#F2CA50] via-[#FFE088] to-[#F2CA50] text-[#281E00] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(242,202,80,0.35)] hover:shadow-[0_0_45px_rgba(242,202,80,0.55)] transition-all cursor-pointer"
                  >
                    <span>BUILD WITH US</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                  <a
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-[#1B2234]/80 hover:bg-[#242C42] border border-white/10 text-white text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md transition-all text-center"
                    href="#what-we-build"
                  >
                    <span>Explore Capabilities</span>
                    <span className="material-symbols-outlined text-[#7BD0FF] text-[18px]">tune</span>
                  </a>
                </div>
              </div>

              {/* Lower Banner / Ticker */}
              <div className="w-full overflow-hidden pt-8 sm:pt-12 md:pt-16 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 border-t border-white/10 mt-8 md:mt-12">
                <div className="w-full md:w-auto overflow-x-auto no-scrollbar py-1">
                  <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] min-[360px]:text-xs md:text-sm font-medium tracking-[0.14em] min-[360px]:tracking-[0.18em] sm:tracking-[0.25em] text-[#C9C2AF] uppercase whitespace-nowrap">
                    <span className="shrink-0 whitespace-nowrap">AI</span>
                    <span className="text-[#F2CA50] shrink-0">•</span>
                    <span className="shrink-0 whitespace-nowrap">SOFTWARE</span>
                    <span className="text-[#F2CA50] shrink-0">•</span>
                    <span className="shrink-0 whitespace-nowrap">AUTOMATION</span>
                    <span className="text-[#F2CA50] shrink-0">•</span>
                    <span className="shrink-0 whitespace-nowrap">BUSINESS GROWTH</span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#857D6D]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#7BD0FF]"></span> 99.98% RESILIENCE
                    </span>
                    <span>•</span>
                    <span className="text-[#F2CA50] font-semibold">4.2x VELOCITY</span>
                    <span>•</span>
                    <span>$140M+ VALUATION CREATED</span>
                  </div>
                  <a
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#F2CA50] hover:border-[#F2CA50] hover:scale-110 transition-all shrink-0 ml-auto md:ml-0"
                    href="#what-we-build"
                    aria-label="Scroll to What We Build"
                  >
                    <span className="material-symbols-outlined text-[20px]">east</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* METRICS CONSOLE BAR */}
          <section className="w-full bg-[#05080E] py-8 border-y border-white/5">
            <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="flex flex-col p-5 rounded-xl bg-[#0F1420]/70 border border-white/5 hover:border-[#F2CA50]/30 transition-all">
                  <span className="font-headline-md text-headline-md text-[#F2CA50] font-bold">99.98%</span>
                  <span className="font-label-caps uppercase text-[#B8B3A4] tracking-wider mt-1">System Resilience</span>
                  <span className="text-xs text-[#857D6D] mt-1 font-mono">Distributed redundant mesh</span>
                </div>
                <div className="flex flex-col p-5 rounded-xl bg-[#0F1420]/70 border border-white/5 hover:border-[#7BD0FF]/30 transition-all">
                  <span className="font-headline-md text-headline-md text-[#7BD0FF] font-bold">4.2x</span>
                  <span className="font-label-caps uppercase text-[#B8B3A4] tracking-wider mt-1">Operational Velocity</span>
                  <span className="text-xs text-[#857D6D] mt-1 font-mono">Workflow cycle reduction</span>
                </div>
                <div className="flex flex-col p-5 rounded-xl bg-[#0F1420]/70 border border-white/5 hover:border-[#F2CA50]/30 transition-all">
                  <span className="font-headline-md text-headline-md text-[#F2CA50] font-bold">$140M+</span>
                  <span className="font-label-caps uppercase text-[#B8B3A4] tracking-wider mt-1">Value Generated</span>
                  <span className="text-xs text-[#857D6D] mt-1 font-mono">Client enterprise capitalization</span>
                </div>
                <div className="flex flex-col p-5 rounded-xl bg-[#0F1420]/70 border border-white/5 hover:border-[#7BD0FF]/30 transition-all">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#7BD0FF] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    <span className="font-headline-md text-headline-md text-white font-bold">0.00ms</span>
                  </div>
                  <span className="font-label-caps uppercase text-[#B8B3A4] tracking-wider mt-1">Zero Legacy Friction</span>
                  <span className="text-xs text-[#857D6D] mt-1 font-mono">Real-time state consistency</span>
                </div>
              </div>
            </div>
          </section>

          {/* "WHAT WE BUILD" (Enterprise Positioning - 5 Core Pillars) */}
          <section className="w-full py-space-3xl relative bg-[#070A10]" id="what-we-build">
            <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                  <div className="flex items-center gap-2 text-[#F2CA50]">
                    <span className="w-2 h-2 rounded-full bg-[#F2CA50] shadow-[0_0_8px_#F2CA50]"></span>
                    <span className="font-label-caps uppercase tracking-widest text-[#F2CA50]">ARCHITECTURE &amp; STRATEGY</span>
                  </div>
                  <h2 className="font-headline-xl text-white font-bold tracking-tight">
                    What We Build
                  </h2>
                  <p className="font-body-md text-[#B8B3A4]">
                    Positioning BRAJ TECHNOLOGIES as a serious technology and business-growth partner. Five sovereign technological pillars architected to turn operational complexity into deterministic, compounding market advantage.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-space-sm font-label-caps text-[#857D6D] uppercase tracking-wider">
                  <span>DEPLOYMENT STACK 2025.4</span>
                  <span className="material-symbols-outlined text-[16px] text-[#7BD0FF]">memory</span>
                </div>
              </div>

              {/* 5 Core Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                {/* Pillar 01: AI Solutions */}
                <div className="lg:col-span-2 rounded-2xl bg-[#0F1420]/80 border border-white/10 p-space-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#F2CA50]/40 hover:bg-[#141A29] transition-all">
                  <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#F2CA50]/10 rounded-full blur-[100px] pointer-events-none"></div>
                  <div className="flex flex-col gap-space-md relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-[#F2CA50] font-bold">01 // AI Solutions</span>
                      <span className="px-space-sm py-1 rounded-full bg-[#1B2234] border border-white/5 text-[#7BD0FF] font-label-caps uppercase tracking-wider">
                        Cognitive Engine
                      </span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">
                      Cognitive Engines, Autonomous Agents &amp; Predictive Frameworks
                    </h3>
                    <p className="font-body-md text-[#B8B3A4] max-w-xl">
                      We engineer custom enterprise LLMs, predictive decision matrices, high-precision computer vision frameworks, and automated cognitive agents tailored strictly around corporate IP and proprietary internal data lakes.
                    </p>
                  </div>
                  <div className="mt-space-xl pt-space-md bg-[#05070B]/80 border border-white/5 rounded-xl p-space-md flex flex-col gap-space-sm relative z-10">
                    <div className="flex items-center justify-between font-label-caps text-[#B8B3A4]">
                      <span>INFERENCE DISPATCH RATE</span>
                      <span className="text-[#F2CA50] font-mono">3,840 T/SEC // 99.4% CONF</span>
                    </div>
                    <div className="w-full h-9 flex items-end gap-1.5 pt-2">
                      <div className="w-1/12 bg-[#F2CA50]/30 h-2 rounded-t"></div>
                      <div className="w-1/12 bg-[#F2CA50]/50 h-4 rounded-t"></div>
                      <div className="w-1/12 bg-[#7BD0FF]/50 h-6 rounded-t"></div>
                      <div className="w-1/12 bg-[#7BD0FF]/80 h-7 rounded-t"></div>
                      <div className="w-1/12 bg-[#F2CA50] h-8 rounded-t"></div>
                      <div className="w-1/12 bg-[#F2CA50]/70 h-5 rounded-t"></div>
                      <div className="w-1/12 bg-[#7BD0FF]/60 h-7 rounded-t"></div>
                      <div className="w-1/12 bg-[#F2CA50]/90 h-9 rounded-t"></div>
                      <div className="w-1/12 bg-[#F2CA50] h-6 rounded-t"></div>
                      <div className="w-1/12 bg-[#7BD0FF] h-7 rounded-t"></div>
                      <div className="w-1/12 bg-[#F2CA50]/70 h-5 rounded-t"></div>
                      <div className="w-1/12 bg-[#F2CA50] h-8 rounded-t"></div>
                    </div>
                  </div>
                </div>

                {/* Pillar 02: Software Development */}
                <div className="rounded-2xl bg-[#0F1420]/80 border border-white/10 p-space-xl flex flex-col justify-between group hover:border-[#7BD0FF]/40 hover:bg-[#141A29] transition-all">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-[#7BD0FF] font-bold">02 // Software Development</span>
                      <span className="material-symbols-outlined text-[#7BD0FF]">code_blocks</span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">
                      Mission-Critical Cloud Platforms &amp; Resilient APIs
                    </h3>
                    <p className="font-body-md text-[#B8B3A4]">
                      High-throughput distributed systems, sovereign multi-region cloud infrastructures, and high-performance bespoke software built with fault-tolerant concurrency.
                    </p>
                  </div>
                  <div className="mt-space-lg flex items-center justify-between pt-space-md bg-[#05070B]/60 border border-white/5 p-space-sm rounded-lg">
                    <span className="font-label-caps text-[#857D6D] uppercase">Latency Sinks</span>
                    <span className="font-label-caps text-[#7BD0FF] font-mono">SUB-12MS GLOBAL</span>
                  </div>
                </div>

                {/* Pillar 03: Business Automation */}
                <div className="rounded-2xl bg-[#0F1420]/80 border border-white/10 p-space-xl flex flex-col justify-between group hover:border-[#F2CA50]/40 hover:bg-[#141A29] transition-all">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-[#F2CA50] font-bold">03 // Business Automation</span>
                      <span className="material-symbols-outlined text-[#F2CA50]">dynamic_feed</span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">
                      Zero-Touch Enterprise Orchestration &amp; Pipelines
                    </h3>
                    <p className="font-body-md text-[#B8B3A4]">
                      End-to-end autonomous workflows eliminating recurring human bottlenecks across billing, underwriting, supply logistics, and multi-system data reconciliations.
                    </p>
                  </div>
                  <div className="mt-space-lg flex items-center justify-between pt-space-md bg-[#05070B]/60 border border-white/5 p-space-sm rounded-lg">
                    <span className="font-label-caps text-[#857D6D] uppercase">Manual Labor Reduction</span>
                    <span className="font-label-caps text-[#F2CA50] font-mono">-84.6% OVERHEAD</span>
                  </div>
                </div>

                {/* Pillar 04: Business Systems */}
                <div className="rounded-2xl bg-[#0F1420]/80 border border-white/10 p-space-xl flex flex-col justify-between group hover:border-[#7BD0FF]/40 hover:bg-[#141A29] transition-all">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-[#7BD0FF] font-bold">04 // Business Systems</span>
                      <span className="material-symbols-outlined text-[#7BD0FF]">hub</span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">
                      Unified Operating Architectures &amp; Compliance Suites
                    </h3>
                    <p className="font-body-md text-[#B8B3A4]">
                      Integrated ERP/CRM backbones, SOC2-auditable governance layers, and enterprise transaction grids that ensure deterministic record management.
                    </p>
                  </div>
                  <div className="mt-space-lg flex items-center justify-between pt-space-md bg-[#05070B]/60 border border-white/5 p-space-sm rounded-lg">
                    <span className="font-label-caps text-[#857D6D] uppercase">Integrity Verification</span>
                    <span className="font-label-caps text-[#7BD0FF] font-mono">100% IMMUTABLE</span>
                  </div>
                </div>

                {/* Pillar 05: Digital Growth */}
                <div className="rounded-2xl bg-[#0F1420]/80 border border-white/10 p-space-xl flex flex-col justify-between group hover:border-[#F2CA50]/40 hover:bg-[#141A29] transition-all">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-[#F2CA50] font-bold">05 // Digital Growth</span>
                      <span className="material-symbols-outlined text-[#F2CA50]">trending_up</span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">
                      Algorithmic Revenue Engines &amp; Conversion Portals
                    </h3>
                    <p className="font-body-md text-[#B8B3A4]">
                      Ultra-responsive enterprise interfaces designed to capture market share, maximize customer lifetime value, and continuously automate sales funnel conversions.
                    </p>
                  </div>
                  <div className="mt-space-lg flex items-center justify-between pt-space-md bg-[#05070B]/60 border border-white/5 p-space-sm rounded-lg">
                    <span className="font-label-caps text-[#857D6D] uppercase">EBITDA Velocity</span>
                    <span className="font-label-caps text-[#F2CA50] font-mono">+310% COMPOUND</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: AI SOLUTIONS (Practical, Business-Focused AI) */}
          <section className="w-full py-space-3xl bg-[#05070B] relative border-t border-white/5" id="ai-solutions">
            <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                  <div className="flex items-center gap-2 text-[#F2CA50]">
                    <span className="w-2 h-2 rounded-full bg-[#F2CA50] shadow-[0_0_8px_#F2CA50]"></span>
                    <span className="font-label-caps uppercase tracking-widest text-[#F2CA50]">PRACTICAL ARTIFICIAL INTELLIGENCE</span>
                  </div>
                  <h2 className="font-headline-xl text-white font-bold tracking-tight">
                    AI Solutions Engineered for Real Business Problems
                  </h2>
                  <p className="font-body-md text-[#B8B3A4]">
                    We cut through the noise of superficial generative toys. BRAJ designs production-grade, hardened intelligence engines built for concrete efficiency gains, risk reduction, and determinable ROI.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1B2234] border border-white/5 text-xs text-[#7BD0FF] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#7BD0FF] animate-pulse"></span>
                  <span>MODEL DRIFT: &lt;0.01%</span>
                </div>
              </div>

              {/* 6 Interactive Feature Cards (3 Columns / 2 Rows) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                {/* Card 1: AI Assistants */}
                <div className="p-space-xl rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#F2CA50]/40 hover:bg-[#141A29] transition-all flex flex-col justify-between group">
                  <div className="flex flex-col gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center text-[#F2CA50] mb-2">
                      <span className="material-symbols-outlined text-[24px]">support_agent</span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">1. AI Assistants</h3>
                    <p className="font-body-sm text-[#B8B3A4] leading-relaxed">
                      Context-aware internal copilots trained strictly on proprietary enterprise documentation, SOPs, and compliance frameworks to accelerate team productivity without knowledge leakage.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#857D6D]">
                    <span>ZERO HALLUCINATION RAG</span>
                    <span className="text-[#F2CA50] font-bold">100% ISOLATED</span>
                  </div>
                </div>

                {/* Card 2: AI Agents */}
                <div className="p-space-xl rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#7BD0FF]/40 hover:bg-[#141A29] transition-all flex flex-col justify-between group">
                  <div className="flex flex-col gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#7BD0FF]/10 border border-[#7BD0FF]/20 flex items-center justify-center text-[#7BD0FF] mb-2">
                      <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">2. AI Agents</h3>
                    <p className="font-body-sm text-[#B8B3A4] leading-relaxed">
                      Autonomous multi-step agents that execute operational tasks, cross-validate multi-department data streams, and request human-in-the-loop approvals only when boundary conditions are met.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#857D6D]">
                    <span>AUTONOMOUS EXECUTION</span>
                    <span className="text-[#7BD0FF] font-bold">STATE PRESERVED</span>
                  </div>
                </div>

                {/* Card 3: AI Automation */}
                <div className="p-space-xl rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#F2CA50]/40 hover:bg-[#141A29] transition-all flex flex-col justify-between group">
                  <div className="flex flex-col gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center text-[#F2CA50] mb-2">
                      <span className="material-symbols-outlined text-[24px]">auto_read_play</span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">3. AI Automation</h3>
                    <p className="font-body-sm text-[#B8B3A4] leading-relaxed">
                      End-to-end multi-format document extraction, invoice triage, unstructured data structuring, and automated exception routing across legacy ERPs and modern ledgers.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#857D6D]">
                    <span>DOCUMENT TRIAGE</span>
                    <span className="text-[#F2CA50] font-bold">99.8% PRECISION</span>
                  </div>
                </div>

                {/* Card 4: AI Analytics */}
                <div className="p-space-xl rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#7BD0FF]/40 hover:bg-[#141A29] transition-all flex flex-col justify-between group">
                  <div className="flex flex-col gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#7BD0FF]/10 border border-[#7BD0FF]/20 flex items-center justify-center text-[#7BD0FF] mb-2">
                      <span className="material-symbols-outlined text-[24px]">query_stats</span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">4. AI Analytics</h3>
                    <p className="font-body-sm text-[#B8B3A4] leading-relaxed">
                      Predictive demand forecasting, customer churn anticipation, anomalous expenditure detection, and automated financial intelligence that informs executive decisions before month-end close.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#857D6D]">
                    <span>PREDICTIVE ACCURACY</span>
                    <span className="text-[#7BD0FF] font-bold">94.7% CONFIDENCE</span>
                  </div>
                </div>

                {/* Card 5: Custom AI Solutions */}
                <div className="p-space-xl rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#F2CA50]/40 hover:bg-[#141A29] transition-all flex flex-col justify-between group">
                  <div className="flex flex-col gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center text-[#F2CA50] mb-2">
                      <span className="material-symbols-outlined text-[24px]">developer_board</span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">5. Custom AI Solutions</h3>
                    <p className="font-body-sm text-[#B8B3A4] leading-relaxed">
                      Bespoke fine-tuned domain models, local open-weight instances on air-gapped clusters, and custom multi-modal vision systems engineered strictly for unique operational bottlenecks.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#857D6D]">
                    <span>DEPLOYMENT TOPOLOGY</span>
                    <span className="text-[#F2CA50] font-bold">ON-PREM / SOVEREIGN VPC</span>
                  </div>
                </div>

                {/* Card 6: AI Integrations */}
                <div className="p-space-xl rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#7BD0FF]/40 hover:bg-[#141A29] transition-all flex flex-col justify-between group">
                  <div className="flex flex-col gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#7BD0FF]/10 border border-[#7BD0FF]/20 flex items-center justify-center text-[#7BD0FF] mb-2">
                      <span className="material-symbols-outlined text-[24px]">cable</span>
                    </div>
                    <h3 className="font-title-lg text-white font-semibold">6. AI Integrations</h3>
                    <p className="font-body-sm text-[#B8B3A4] leading-relaxed">
                      Seamless bi-directional connectors between legacy SQL, mainframe or enterprise clouds and state-of-the-art vector stores, inference routers, and streaming event triggers.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#857D6D]">
                    <span>INTEGRATION PROTOCOL</span>
                    <span className="text-[#7BD0FF] font-bold">SUB-20MS PIPELINE</span>
                  </div>
                </div>
              </div>

              {/* Live Operational Telemetry Simulation Widget */}
              <div className="mt-space-xl rounded-2xl bg-[#080B14] border border-white/10 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="flex flex-col gap-1 w-full lg:w-1/3">
                  <span className="font-label-caps text-xs text-[#F2CA50] uppercase tracking-widest">LIVE SYSTEM TELEMETRY</span>
                  <h4 className="text-white font-headline-sm text-lg font-bold">Cluster Orchestration Load</h4>
                  <p className="text-xs text-[#B8B3A4] font-mono">Telemetry active across 14 sovereign enterprise regions.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-2/3">
                  <div className="p-3 rounded-lg bg-[#141A29] border border-white/5 flex flex-col">
                    <span className="text-[10px] text-[#857D6D] uppercase font-mono">Token Dispatch</span>
                    <span className="text-[#F2CA50] font-bold font-mono text-base transition-all">{liveTokenRate} tok/s</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141A29] border border-white/5 flex flex-col">
                    <span className="text-[10px] text-[#857D6D] uppercase font-mono">P99 Latency</span>
                    <span className="text-[#7BD0FF] font-bold font-mono text-base">9.4 ms</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141A29] border border-white/5 flex flex-col">
                    <span className="text-[10px] text-[#857D6D] uppercase font-mono">Validation Accuracy</span>
                    <span className="text-white font-bold font-mono text-base">99.98%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141A29] border border-white/5 flex flex-col">
                    <span className="text-[10px] text-[#857D6D] uppercase font-mono">Safety Guardrails</span>
                    <span className="text-[#F2CA50] font-bold font-mono text-base">Zero Bypass</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: SOFTWARE & AUTOMATION IN ACTION */}
          <section className="w-full py-space-3xl bg-[#070A10] relative overflow-hidden" id="software-in-action">
            <div className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-[#7BD0FF]/5 blur-[120px] rounded-full"></div>
            </div>
            <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
              <div className="text-center max-w-3xl mx-auto mb-space-2xl">
                <span className="font-label-caps uppercase text-[#7BD0FF] tracking-widest mb-space-xs block">
                  ENGINEERED FOR SCALE
                </span>
                <h2 className="font-headline-xl text-white font-bold tracking-tight">
                  Software &amp; Automation in Action
                </h2>
                <p className="font-body-lg text-[#B8B3A4] mt-space-sm">
                  A definitive architectural divergence between fragile patchwork systems and BRAJ sovereign autonomous pipelines.
                </p>
              </div>

              {/* Architectural Contrast Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-stretch mb-space-2xl">
                {/* Left: Fragmented Legacy Stack */}
                <div className="rounded-2xl bg-[#0F1420]/70 border border-white/5 p-space-xl flex flex-col justify-between">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="px-space-sm py-1 rounded bg-[#93000A]/30 border border-[#FFB4AB]/20 text-[#FFB4AB] font-label-caps uppercase tracking-wider">
                        Fragmented Legacy Stack
                      </span>
                      <span className="font-label-caps text-[#857D6D] uppercase font-mono">STATUS: DEGRADING</span>
                    </div>
                    <h3 className="font-headline-sm text-white font-semibold">
                      Disconnected Tools &amp; Manual Hand-offs
                    </h3>
                    <p className="font-body-sm text-[#B8B3A4]">
                      Isolated vendor silos, brittle webhook scripts, high employee cognitive drain, and recurring operational downtime during transaction spikes.
                    </p>
                    <div className="my-space-md p-space-md rounded-xl bg-[#05070B]/80 border border-white/5 flex flex-col gap-space-sm">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[#141A29]/60 text-[#B8B3A4] text-body-sm border border-white/5">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#FFB4AB] text-[18px]">warning</span> CRM Database
                        </span>
                        <span className="text-[#FFB4AB] font-mono text-xs">Sync Delay (+4.2 hrs)</span>
                      </div>
                      <div className="flex justify-center text-[#857D6D]">
                        <span className="material-symbols-outlined text-[16px]">south</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[#141A29]/60 text-[#B8B3A4] text-body-sm border border-white/5">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#FFB4AB] text-[18px]">sync_problem</span> Manual CSV Ingestion
                        </span>
                        <span className="text-[#FFB4AB] font-mono text-xs">Error Rate 14.8%</span>
                      </div>
                      <div className="flex justify-center text-[#857D6D]">
                        <span className="material-symbols-outlined text-[16px]">south</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[#141A29]/60 text-[#B8B3A4] text-body-sm border border-white/5">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#FFB4AB] text-[18px]">block</span> Ledger Update
                        </span>
                        <span className="text-[#FFB4AB] font-mono text-xs">Batch Pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-space-md flex items-center justify-between text-[#B8B3A4] font-label-caps uppercase border-t border-white/5">
                    <span>Engineering Debt Liability</span>
                    <span className="text-[#FFB4AB] font-bold font-mono">HIGH RISK</span>
                  </div>
                </div>

                {/* Right: BRAJ Unified Architecture */}
                <div className="rounded-2xl bg-[#1B2234]/80 border border-[#F2CA50]/30 p-space-xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#F2CA50]/15 rounded-full blur-[90px] pointer-events-none"></div>
                  <div className="flex flex-col gap-space-md relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="px-space-sm py-1 rounded bg-[#F2CA50]/20 border border-[#F2CA50]/40 text-[#F2CA50] font-label-caps uppercase tracking-wider font-semibold">
                        BRAJ Unified Architecture
                      </span>
                      <span className="flex items-center gap-1.5 text-[#7BD0FF] font-label-caps font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7BD0FF] animate-pulse"></span> ACTIVE STREAM
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-white font-semibold">
                      Event-Driven Autonomous Mesh
                    </h3>
                    <p className="font-body-sm text-[#B8B3A4]">
                      Zero-latency distributed message queues, real-time AI validation, atomic transaction persistence, and self-healing cloud microservices.
                    </p>
                    <div className="my-space-md p-space-md rounded-xl bg-[#05070B] border border-white/10 flex flex-col gap-space-sm font-mono text-xs text-[#F2F4FA]">
                      <div className="flex items-center justify-between text-[#857D6D] pb-1 border-b border-white/5">
                        <span>PIPELINE_ORCHESTRATOR // V4</span>
                        <span className="text-[#F2CA50] font-bold">HEALTH 100%</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F1420] text-[#F2F4FA] border border-white/5">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#F2CA50] text-[18px]">bolt</span>
                          <span>Stream Ingest (42k msgs/s)</span>
                        </span>
                        <span className="text-[#7BD0FF] font-bold">0.82 ms</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F1420] text-[#F2F4FA] border border-white/5">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#F2CA50] text-[18px]">neurology</span>
                          <span>Cognitive Validation Filter</span>
                        </span>
                        <span className="text-[#F2CA50] font-bold">100% Pass</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F1420] text-[#F2F4FA] border border-white/5">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#7BD0FF] text-[18px]">database</span>
                          <span>Global State Ledger Replication</span>
                        </span>
                        <span className="text-[#7BD0FF] font-bold">Synchronized</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-space-md flex items-center justify-between text-[#F2F4FA] font-label-caps uppercase relative z-10 border-t border-white/10">
                    <span className="text-[#B8B3A4]">Operational Advantage</span>
                    <span className="text-[#F2CA50] font-bold font-mono">COMPOUNDING ASSET</span>
                  </div>
                </div>
              </div>

              {/* 6 Core Capabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-[#0F1420]/60 border border-white/5 hover:border-[#F2CA50]/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-[#F2CA50]">devices</span>
                      <span className="font-label-caps text-[10px] text-[#857D6D] uppercase font-mono">FRONTEND MESH</span>
                    </div>
                    <h4 className="text-white font-title-md font-semibold mb-2">Websites &amp; Web Applications</h4>
                    <p className="text-xs text-[#B8B3A4] leading-relaxed">
                      Ultra-fast, responsive web applications engineered for sub-second page loads, enterprise security, and seamless user experiences.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#F2CA50] font-mono">SSR / EDGE CACHED</span>
                </div>
                <div className="p-6 rounded-xl bg-[#0F1420]/60 border border-white/5 hover:border-[#7BD0FF]/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-[#7BD0FF]">cloud_done</span>
                      <span className="font-label-caps text-[10px] text-[#857D6D] uppercase font-mono">MULTI-TENANT</span>
                    </div>
                    <h4 className="text-white font-title-md font-semibold mb-2">SaaS &amp; Business Platforms</h4>
                    <p className="text-xs text-[#B8B3A4] leading-relaxed">
                      Multi-tenant, SOC2-compliant enterprise cloud software built with dedicated tenant isolation, automated billing, and audit logs.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#7BD0FF] font-mono">99.99% MULTI-REGION</span>
                </div>
                <div className="p-6 rounded-xl bg-[#0F1420]/60 border border-white/5 hover:border-[#F2CA50]/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-[#F2CA50]">monitoring</span>
                      <span className="font-label-caps text-[10px] text-[#857D6D] uppercase font-mono">EXECUTIVE HUD</span>
                    </div>
                    <h4 className="text-white font-title-md font-semibold mb-2">Dashboards &amp; KPI Consoles</h4>
                    <p className="text-xs text-[#B8B3A4] leading-relaxed">
                      Real-time operational cockpits, telemetry consoles, and financial intelligence surfaces providing instantaneous visibility.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#F2CA50] font-mono">WEBSOCKET REAL-TIME</span>
                </div>
                <div className="p-6 rounded-xl bg-[#0F1420]/60 border border-white/5 hover:border-[#7BD0FF]/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-[#7BD0FF]">account_tree</span>
                      <span className="font-label-caps text-[10px] text-[#857D6D] uppercase font-mono">CUSTOM ERP/CRM</span>
                    </div>
                    <h4 className="text-white font-title-md font-semibold mb-2">CRM &amp; Business Systems</h4>
                    <p className="text-xs text-[#B8B3A4] leading-relaxed">
                      Custom operating systems tailored strictly to your company's operational flow rather than forcing you into rigid commercial boxes.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#7BD0FF] font-mono">DETERMINISTIC LOGS</span>
                </div>
                <div className="p-6 rounded-xl bg-[#0F1420]/60 border border-white/5 hover:border-[#F2CA50]/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-[#F2CA50]">published_with_changes</span>
                      <span className="font-label-caps text-[10px] text-[#857D6D] uppercase font-mono">EVENT BUS</span>
                    </div>
                    <h4 className="text-white font-title-md font-semibold mb-2">Workflow Automation</h4>
                    <p className="text-xs text-[#B8B3A4] leading-relaxed">
                      Zero-latency message brokers, event streaming pipelines, and self-healing job queues eliminating manual copy-pasting across departments.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#F2CA50] font-mono">ATOMIC TRANSACTIONAL</span>
                </div>
                <div className="p-6 rounded-xl bg-[#0F1420]/60 border border-white/5 hover:border-[#7BD0FF]/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="material-symbols-outlined text-[#7BD0FF]">webhook</span>
                      <span className="font-label-caps text-[10px] text-[#857D6D] uppercase font-mono">CONNECTORS</span>
                    </div>
                    <h4 className="text-white font-title-md font-semibold mb-2">APIs &amp; Integrations</h4>
                    <p className="text-xs text-[#B8B3A4] leading-relaxed">
                      Resilient REST, gRPC, and GraphQL endpoints unifying disparate databases, payment gateways, partner networks, and internal services.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#7BD0FF] font-mono">FAIL-SAFE RETRIES</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: BUSINESS GROWTH */}
          <section className="w-full py-space-3xl bg-[#05070B] relative border-t border-white/5" id="business-growth">
            <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                  <div className="flex items-center gap-2 text-[#F2CA50]">
                    <span className="w-2 h-2 rounded-full bg-[#F2CA50] shadow-[0_0_8px_#F2CA50]"></span>
                    <span className="font-label-caps uppercase tracking-widest text-[#F2CA50]">MEASURABLE IMPACT</span>
                  </div>
                  <h2 className="font-headline-xl text-white font-bold tracking-tight">
                    Technology as an Engine for Business Growth
                  </h2>
                  <p className="font-body-md text-[#B8B3A4]">
                    Code is not a passive operational tax. When engineered purposefully, software systems systematically expand pipeline volume, accelerate deal cycles, and expand operating margins.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-[#F2CA50] font-bold font-headline-sm">+310%</span>
                    <span className="font-label-caps text-[10px] text-[#857D6D] uppercase">Pipeline Acceleration</span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10"></div>
                  <div className="text-right">
                    <span className="block text-[#7BD0FF] font-bold font-headline-sm">-84%</span>
                    <span className="font-label-caps text-[10px] text-[#857D6D] uppercase">Manual Workflow Time</span>
                  </div>
                </div>
              </div>

              {/* 6 Growth Capability Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-space-lg rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#F2CA50]/40 transition-all flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-[#F2CA50] text-[28px] mb-3">target</span>
                    <h3 className="text-white font-title-md font-semibold mb-2">Lead Generation</h3>
                    <p className="text-sm text-[#B8B3A4] leading-relaxed">
                      Intelligent inbound capture pipelines, dynamic intent analysis, algorithmic scoring, and automated qualification that routes enterprise opportunities instantly.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-xs text-[#F2CA50] font-mono">+180% Qualified Flow</span>
                </div>
                <div className="p-space-lg rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#7BD0FF]/40 transition-all flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-[#7BD0FF] text-[28px] mb-3">speed</span>
                    <h3 className="text-white font-title-md font-semibold mb-2">CRM &amp; Sales Systems</h3>
                    <p className="text-sm text-[#B8B3A4] leading-relaxed">
                      Friction-free sales pipelines with automated multi-channel sequences, real-time deal alerts, and proactive notifications that ensure zero dropped leads.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-xs text-[#7BD0FF] font-mono">Zero Lost Opportunities</span>
                </div>
                <div className="p-space-lg rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#F2CA50]/40 transition-all flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-[#F2CA50] text-[28px] mb-3">troubleshoot</span>
                    <h3 className="text-white font-title-md font-semibold mb-2">SEO &amp; AEO Domination</h3>
                    <p className="text-sm text-[#B8B3A4] leading-relaxed">
                      Engineered for both classic Google rank and modern Answer Engine Optimization (ChatGPT, Perplexity, Claude citations) with programmatic schema networks.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-xs text-[#F2CA50] font-mono">Generative Search Primed</span>
                </div>
                <div className="p-space-lg rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#7BD0FF]/40 transition-all flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-[#7BD0FF] text-[28px] mb-3">insights</span>
                    <h3 className="text-white font-title-md font-semibold mb-2">Attribution Analytics</h3>
                    <p className="text-sm text-[#B8B3A4] leading-relaxed">
                      Multi-touch attribution models, customer acquisition cohort tracking, real-time unit economics, and executive clarity over channel performance.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-xs text-[#7BD0FF] font-mono">100% Attribution Fidelity</span>
                </div>
                <div className="p-space-lg rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#F2CA50]/40 transition-all flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-[#F2CA50] text-[28px] mb-3">point_of_sale</span>
                    <h3 className="text-white font-title-md font-semibold mb-2">Conversion Systems</h3>
                    <p className="text-sm text-[#B8B3A4] leading-relaxed">
                      Personalized buyer journeys, minimal checkout friction, dynamic social validation, and behavioral triggers designed to compound visitor LTV.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-xs text-[#F2CA50] font-mono">+64% Checkout Velocity</span>
                </div>
                <div className="p-space-lg rounded-2xl bg-[#0F1420]/70 border border-white/5 hover:border-[#7BD0FF]/40 transition-all flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-[#7BD0FF] text-[28px] mb-3">precision_manufacturing</span>
                    <h3 className="text-white font-title-md font-semibold mb-2">Process Automation</h3>
                    <p className="text-sm text-[#B8B3A4] leading-relaxed">
                      Scale revenue 10x without 10x headcount expansion. Replace manual data transfers, reconciliation spreadsheets, and ticketing friction with sovereign software.
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 text-xs text-[#7BD0FF] font-mono">Compounding Leverage</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: OUR VISION & PHILOSOPHY */}
          <section className="w-full py-space-3xl relative bg-[#070A10] border-t border-white/5" id="philosophy">
            <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
                {/* Left Editorial Statement */}
                <div className="lg:col-span-5 flex flex-col gap-space-md">
                  <div className="flex items-center gap-2 text-[#F2CA50]">
                    <span className="w-2 h-2 rounded-full bg-[#F2CA50] shadow-[0_0_8px_#F2CA50]"></span>
                    <span className="font-label-caps uppercase tracking-widest text-[#F2CA50]">PROVENANCE &amp; CREED</span>
                  </div>
                  <h2 className="font-headline-xl text-white font-bold tracking-tight">
                    Inspired by Braj. Built for the future.
                  </h2>
                  <div className="p-4 rounded-xl bg-[#1B2234]/60 border-l-2 border-[#F2CA50]">
                    <p className="text-base text-[#F2CA50] font-semibold italic">
                      “Technology should not simply exist. It should help businesses solve problems, operate better and grow.”
                    </p>
                  </div>
                  <p className="font-body-lg text-[#B8B3A4] font-normal leading-relaxed">
                    We believe enterprise software should never be a recurring line-item cost or a liability. True engineering turns computational infrastructure into sovereign commercial leverage—built to outlast market volatility and compound enterprise valuation.
                  </p>
                  <div className="pt-space-sm">
                    <span className="font-title-md text-[#F2CA50] font-semibold tracking-wide">BRAJ TECHNOLOGIES LEADERSHIP</span>
                    <p className="font-body-sm text-[#857D6D]">Architecting Sovereign Compute for Global Leaders</p>
                  </div>
                </div>

                {/* Right: 3 Philosophical Tenets */}
                <div className="lg:col-span-7 flex flex-col gap-space-md">
                  {/* Tenet 01 */}
                  <div className="p-space-lg rounded-2xl bg-[#0F1420]/80 border border-white/5 hover:border-[#F2CA50]/40 hover:bg-[#141A29] transition-all flex items-start gap-space-lg">
                    <div className="w-12 h-12 rounded-xl bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center shrink-0">
                      <span className="font-headline-sm text-[#F2CA50] font-bold">01</span>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <h3 className="font-title-lg text-white font-semibold">
                        Strategic Architecture
                      </h3>
                      <p className="font-body-md text-[#B8B3A4]">
                        Every API endpoint, distributed pipeline, and neural parameter is engineered strictly to serve measurable EBITDA expansion, eliminating vanity development.
                      </p>
                    </div>
                  </div>

                  {/* Tenet 02 */}
                  <div className="p-space-lg rounded-2xl bg-[#0F1420]/80 border border-white/5 hover:border-[#7BD0FF]/40 hover:bg-[#141A29] transition-all flex items-start gap-space-lg">
                    <div className="w-12 h-12 rounded-xl bg-[#7BD0FF]/10 border border-[#7BD0FF]/20 flex items-center justify-center shrink-0">
                      <span className="font-headline-sm text-[#7BD0FF] font-bold">02</span>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <h3 className="font-title-lg text-white font-semibold">
                        Autonomous Resilience
                      </h3>
                      <p className="font-body-md text-[#B8B3A4]">
                        Fault-tolerant topological mesh networks with automatic failover circuits, immutable data auditability, and self-repairing background workers.
                      </p>
                    </div>
                  </div>

                  {/* Tenet 03 */}
                  <div className="p-space-lg rounded-2xl bg-[#0F1420]/80 border border-white/5 hover:border-[#F2CA50]/40 hover:bg-[#141A29] transition-all flex items-start gap-space-lg">
                    <div className="w-12 h-12 rounded-xl bg-[#F2CA50]/10 border border-[#F2CA50]/20 flex items-center justify-center shrink-0">
                      <span className="font-headline-sm text-[#F2CA50] font-bold">03</span>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <h3 className="font-title-lg text-white font-semibold">
                        Elegant Precision
                      </h3>
                      <p className="font-body-md text-[#B8B3A4]">
                        Clean, hyper-responsive digital interfaces engineered for executive clarity, backed by zero-trust cryptography and military-grade protocol verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HIGH-IMPACT CLOSING BANNER */}
          <section className="w-full py-16 bg-gradient-to-r from-[#0C1220] via-[#141A29] to-[#0C1220] border-y border-white/10">
            <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col gap-2">
                <span className="font-label-caps text-xs text-[#7BD0FF] uppercase tracking-widest font-semibold">PARTNERSHIP ENGAGEMENT</span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold font-headline-md">
                  Have a business problem worth solving?
                </h3>
                <p className="text-base text-[#B8B3A4] font-light">
                  Let’s build the technology to solve it.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenEnquiryModal()}
                className="shrink-0 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#F2CA50] via-[#FFE088] to-[#F2CA50] text-[#281E00] font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(242,202,80,0.35)] hover:shadow-[0_0_35px_rgba(242,202,80,0.55)] transition-all cursor-pointer"
              >
                <span>BUILD WITH US</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </section>

          {/* SECTION 8: DISCOVERY BRIEF & ENGAGEMENT */}
          <section className="w-full py-space-3xl bg-[#090D16] border-t border-white/5 relative overflow-hidden" id="contact-engagement">
            <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
                {/* Left: Liaison & Channels */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="flex flex-col gap-space-md">
                    <span className="font-label-caps uppercase text-[#F2CA50] tracking-widest">
                      CONFIDENTIAL ENGAGEMENT
                    </span>
                    <h2 className="font-headline-xl text-white font-bold tracking-tight">
                      Ready to elevate your operational trajectory?
                    </h2>
                    <p className="font-body-lg text-[#B8B3A4]">
                      Engage our principal engineering team for architectural discovery, system audit, or custom platform deployment.
                    </p>
                  </div>

                  {/* Channels & SLA */}
                  <div className="mt-space-2xl flex flex-col gap-space-md p-space-lg rounded-2xl bg-[#05070B] border border-white/5">
                    <div className="flex items-center justify-between pb-space-sm border-b border-white/5">
                      <span className="font-label-caps text-[#857D6D] uppercase tracking-wider">RESPONSE PROTOCOL</span>
                      <span className="flex items-center gap-1.5 text-[#7BD0FF] font-label-caps font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7BD0FF] animate-pulse"></span> SLA &lt; 12 HOURS
                      </span>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-[#F2CA50] text-[24px]">mail</span>
                      <div className="flex flex-col">
                        <span className="font-body-sm text-white font-semibold">Official Email</span>
                        <a
                          href="mailto:technologiesbraj@gmail.com"
                          className="font-body-sm text-[#F2CA50] hover:text-[#FFE088] hover:underline transition-colors break-all"
                        >
                          technologiesbraj@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-[#F2CA50] text-[24px]">chat</span>
                      <div className="flex flex-col">
                        <span className="font-body-sm text-white font-semibold">Official WhatsApp Line</span>
                        <a
                          href={WHATSAPP_ENQUIRY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body-sm text-[#F2CA50] hover:underline inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Direct WhatsApp Enquiry</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-[#F2CA50] text-[24px]">location_on</span>
                      <div className="flex flex-col">
                        <span className="font-body-sm text-white font-semibold">Headquarters</span>
                        <span className="font-body-sm text-[#857D6D]">Jabalpur, Madhya Pradesh, India</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-[#7BD0FF] text-[24px]">photo_camera</span>
                      <div className="flex flex-col">
                        <span className="font-body-sm text-white font-semibold">Official Instagram</span>
                        <a
                          href="https://www.instagram.com/brajtechnologies"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body-sm text-[#7BD0FF] hover:underline inline-flex items-center gap-1 transition-colors"
                        >
                          <span>@brajtechnologies</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Interactive Discovery Brief Form */}
                <div className="lg:col-span-7 rounded-2xl bg-[#0F1420] border border-white/10 p-space-xl shadow-2xl flex flex-col gap-space-lg">
                  <div className="flex flex-col gap-space-xs">
                    <span className="font-title-lg text-white font-semibold">Architectural Discovery Brief</span>
                    <p className="font-body-sm text-[#B8B3A4]">Complete the brief below to transmit your requirement directly to our team via WhatsApp.</p>
                  </div>

                  {pageSubmittedUrl ? (
                    <div className="p-6 rounded-xl bg-[#141A29] border border-[#7BD0FF]/40 text-center flex flex-col items-center gap-4 animate-fadeIn">
                      <div className="w-12 h-12 rounded-full bg-[#7BD0FF]/10 border border-[#7BD0FF]/30 flex items-center justify-center text-[#7BD0FF]">
                        <span className="material-symbols-outlined text-[28px]">check_circle</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-white font-title-md font-semibold">Enquiry Form Compiled</h4>
                        <p className="text-sm text-[#B8B3A4] max-w-md">
                          Your requirement details for <strong>{pageForm.company}</strong> ({pageForm.service}) have been prepared. Click below to initiate your WhatsApp conversation with our principal team.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                        <a
                          href={pageSubmittedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F2CA50] via-[#FFE088] to-[#F2CA50] text-[#281E00] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(242,202,80,0.35)] hover:shadow-[0_0_30px_rgba(242,202,80,0.55)] transition-all cursor-pointer"
                        >
                          <span>CONTINUE TO WHATSAPP →</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setPageSubmittedUrl(null);
                            setPageForm({
                              name: '',
                              company: '',
                              email: '',
                              phone: '',
                              service: 'AI Solutions',
                              details: '',
                              budgetTimeline: ''
                            });
                          }}
                          className="px-5 py-3.5 rounded-xl bg-[#1B2234] hover:bg-[#242C42] border border-white/10 text-white text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
                        >
                          Reset Form
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form className="flex flex-col gap-space-md" onSubmit={handlePageSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between">
                            <span>Name <span className="text-[#F2CA50]">*</span></span>
                          </label>
                          <input
                            className={`w-full bg-[#05070B] border ${pageErrors.name ? 'border-[#FFB4AB]' : 'border-white/10'} px-4 py-3 rounded-lg font-body-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] transition-colors`}
                            placeholder="e.g. Vikramaditya Sharma"
                            value={pageForm.name}
                            onChange={(e) => {
                              setPageForm(prev => ({ ...prev, name: e.target.value }));
                              if (pageErrors.name) setPageErrors(prev => ({ ...prev, name: '' }));
                            }}
                            type="text"
                          />
                          {pageErrors.name && <span className="text-xs text-[#FFB4AB] mt-0.5">{pageErrors.name}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between">
                            <span>Company / Business Name <span className="text-[#F2CA50]">*</span></span>
                          </label>
                          <input
                            className={`w-full bg-[#05070B] border ${pageErrors.company ? 'border-[#FFB4AB]' : 'border-white/10'} px-4 py-3 rounded-lg font-body-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] transition-colors`}
                            placeholder="e.g. Acme Global Enterprises"
                            value={pageForm.company}
                            onChange={(e) => {
                              setPageForm(prev => ({ ...prev, company: e.target.value }));
                              if (pageErrors.company) setPageErrors(prev => ({ ...prev, company: '' }));
                            }}
                            type="text"
                          />
                          {pageErrors.company && <span className="text-xs text-[#FFB4AB] mt-0.5">{pageErrors.company}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between">
                            <span>Email <span className="text-[#F2CA50]">*</span></span>
                          </label>
                          <input
                            className={`w-full bg-[#05070B] border ${pageErrors.email ? 'border-[#FFB4AB]' : 'border-white/10'} px-4 py-3 rounded-lg font-body-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] transition-colors`}
                            placeholder="name@company.com"
                            value={pageForm.email}
                            onChange={(e) => {
                              setPageForm(prev => ({ ...prev, email: e.target.value }));
                              if (pageErrors.email) setPageErrors(prev => ({ ...prev, email: '' }));
                            }}
                            type="email"
                          />
                          {pageErrors.email && <span className="text-xs text-[#FFB4AB] mt-0.5">{pageErrors.email}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between">
                            <span>Phone Number <span className="text-[#F2CA50]">*</span></span>
                          </label>
                          <input
                            className={`w-full bg-[#05070B] border ${pageErrors.phone ? 'border-[#FFB4AB]' : 'border-white/10'} px-4 py-3 rounded-lg font-body-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] transition-colors`}
                            placeholder="e.g. +91 98765 43210"
                            value={pageForm.phone}
                            onChange={(e) => {
                              setPageForm(prev => ({ ...prev, phone: e.target.value }));
                              if (pageErrors.phone) setPageErrors(prev => ({ ...prev, phone: '' }));
                            }}
                            type="tel"
                          />
                          {pageErrors.phone && <span className="text-xs text-[#FFB4AB] mt-0.5">{pageErrors.phone}</span>}
                        </div>
                      </div>

                      {/* What do you need help with? */}
                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-[#857D6D] uppercase">
                          What do you need help with? <span className="text-[#F2CA50]">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {SERVICE_OPTIONS.map((service) => {
                            const isSelected = pageForm.service === service;
                            return (
                              <button
                                key={service}
                                type="button"
                                onClick={() => setPageForm(prev => ({ ...prev, service }))}
                                className={`px-3.5 py-2 rounded-lg font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#F2CA50] text-[#281E00] shadow-[0_0_12px_rgba(242,202,80,0.35)]'
                                    : 'bg-[#141A29] text-[#F2F4FA] border border-white/5 hover:border-[#F2CA50]/40'
                                }`}
                              >
                                {service}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tell us about your requirement */}
                      <div className="flex flex-col gap-1">
                        <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between">
                          <span>Tell us about your requirement <span className="text-[#F2CA50]">*</span></span>
                        </label>
                        <textarea
                          className={`w-full bg-[#05070B] border ${pageErrors.details ? 'border-[#FFB4AB]' : 'border-white/10'} px-4 py-3 rounded-lg font-body-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] resize-none transition-colors`}
                          placeholder="Describe the problem, operational bottlenecks, expected features, or specific deliverables..."
                          rows={4}
                          value={pageForm.details}
                          onChange={(e) => {
                            setPageForm(prev => ({ ...prev, details: e.target.value }));
                            if (pageErrors.details) setPageErrors(prev => ({ ...prev, details: '' }));
                          }}
                        ></textarea>
                        {pageErrors.details && <span className="text-xs text-[#FFB4AB] mt-0.5">{pageErrors.details}</span>}
                      </div>

                      {/* Budget / Timeline */}
                      <div className="flex flex-col gap-1">
                        <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between">
                          <span>Budget / Timeline <span className="text-xs text-[#857D6D] lowercase font-normal">(optional)</span></span>
                        </label>
                        <input
                          className="w-full bg-[#05070B] border border-white/10 px-4 py-3 rounded-lg font-body-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] transition-colors"
                          placeholder="e.g. $10k - $25k, Launch within 6-8 weeks"
                          value={pageForm.budgetTimeline}
                          onChange={(e) => setPageForm(prev => ({ ...prev, budgetTimeline: e.target.value }))}
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
                        <div className="flex items-center gap-2 text-[#857D6D] font-label-caps uppercase text-xs">
                          <span className="material-symbols-outlined text-[#F2CA50] text-[18px]">verified_user</span>
                          <span>Bilateral NDA Protected</span>
                        </div>
                        <button
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-8 py-4 rounded-xl bg-gradient-to-r from-[#F2CA50] via-[#FFE088] to-[#F2CA50] text-[#281E00] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(242,202,80,0.45)] transition-all cursor-pointer"
                          type="submit"
                        >
                          <span>SEND ENQUIRY →</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* SECTION 9: FOOTER */}
      <footer className="w-full bg-[#05070B] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin pt-space-3xl pb-space-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-xl pb-space-2xl">
            {/* Logo & Mission Column */}
            <div className="lg:col-span-2 flex flex-col gap-space-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#F2CA50] via-[#FFE088] to-[#F2CA50]/40 shadow-[0_0_15px_rgba(242,202,80,0.25)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0D14] flex items-center justify-center">
                    <img
                      alt="BRAJ TECHNOLOGIES Official Brand Seal - Jabalpur, India"
                      className="h-full w-full object-cover"
                      src={LOGO_FOOTER}
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <span className="font-headline-sm text-lg tracking-[0.14em] text-white font-extrabold uppercase">
                  BRAJ <span className="text-[#F2CA50] font-normal tracking-[0.2em] text-sm">TECHNOLOGIES</span>
                </span>
              </div>
              <p className="font-body-sm text-[#B8B3A4] max-w-sm">
                Sovereign enterprise technology, hyper-scale AI automation, and mission-critical software architectures engineered for global market leadership.
              </p>

              {/* Official Contact Badges in Footer */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5 text-xs text-[#B8B3A4]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#F2CA50] text-[16px]">location_on</span>
                  <span>Jabalpur, Madhya Pradesh, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#7BD0FF] text-[16px]">mail</span>
                  <a href="mailto:technologiesbraj@gmail.com" className="hover:text-[#F2CA50] transition-colors break-all">
                    technologiesbraj@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#F2CA50] text-[16px]">chat</span>
                  <a
                    href={WHATSAPP_ENQUIRY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Business Channel
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#7BD0FF] text-[16px]">photo_camera</span>
                  <a
                    href="https://www.instagram.com/brajtechnologies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7BD0FF] hover:underline inline-flex items-center gap-1 transition-colors"
                  >
                    <span>@brajtechnologies</span>
                    <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="px-2.5 py-1 rounded bg-[#141A29] border border-white/5 text-[#B8B3A4] font-label-caps text-[10px] uppercase">SOC2 Type II</span>
                <span className="px-2.5 py-1 rounded bg-[#141A29] border border-white/5 text-[#B8B3A4] font-label-caps text-[10px] uppercase">ISO 27001</span>
                <span className="px-2.5 py-1 rounded bg-[#141A29] border border-white/5 text-[#B8B3A4] font-label-caps text-[10px] uppercase">Tier 4 Sovereign</span>
              </div>
            </div>

            {/* Solutions Links */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-caps uppercase text-[#F2CA50] tracking-widest">Solutions</span>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#ai-solutions">AI Assistants &amp; Agents</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#ai-solutions">AI Automation &amp; Triage</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#ai-solutions">Predictive Analytics</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#ai-solutions">Custom AI Solutions</a>
            </div>

            {/* What We Build Links */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-caps uppercase text-[#F2CA50] tracking-widest">What We Build</span>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#what-we-build">AI Solutions</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#what-we-build">Software Development</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#what-we-build">Business Automation</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#what-we-build">Business Systems</a>
            </div>

            {/* Capabilities Links */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-caps uppercase text-[#F2CA50] tracking-widest">Capabilities</span>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#software-in-action">Web &amp; SaaS Platforms</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#software-in-action">Executive Dashboards</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#business-growth">Lead Gen &amp; Sales Engines</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#business-growth">SEO &amp; AEO Architecture</a>
            </div>

            {/* Direct Contact Column */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-caps uppercase text-[#F2CA50] tracking-widest">Contact</span>
              <a
                className="font-body-sm text-[#B8B3A4] hover:text-[#F2CA50] transition-colors break-all flex items-center gap-1.5"
                href="mailto:technologiesbraj@gmail.com"
              >
                <span className="material-symbols-outlined text-[15px] text-[#F2CA50]">mail</span>
                <span>technologiesbraj@gmail.com</span>
              </a>
              <a
                className="font-body-sm text-[#F2CA50] hover:underline transition-colors flex items-center gap-1.5"
                href={WHATSAPP_ENQUIRY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[15px]">chat</span>
                <span>WhatsApp Business Enquiry</span>
              </a>
              <a
                className="font-body-sm text-[#7BD0FF] hover:underline transition-colors flex items-center gap-1.5"
                href="https://www.instagram.com/brajtechnologies"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                <span>@brajtechnologies</span>
              </a>
              <span className="font-body-sm text-[#857D6D] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#F2CA50]">location_on</span>
                <span>Jabalpur, MP, India</span>
              </span>
              <a className="font-body-sm text-[#857D6D] hover:text-white transition-colors mt-2" href="#philosophy">
                Our Vision &amp; Creed
              </a>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md border-t border-white/5">
            <p className="font-body-sm text-[#B8B3A4] text-center md:text-left">
              © {new Date().getFullYear()} BRAJ TECHNOLOGIES. All rights reserved. Architecting intelligent systems for global enterprise growth.
            </p>
            <div className="flex items-center gap-space-lg">
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#philosophy">Privacy Architecture</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#philosophy">Terms of Engagement</a>
              <a className="font-body-sm text-[#B8B3A4] hover:text-white transition-colors" href="#contact-engagement">Security Protocol</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Premium Enquiry Modal */}
      {enquiryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#05070B]/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEnquiryModalOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-2xl bg-[#0C101A] border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 my-auto overflow-hidden">
            {/* Top ambient gold glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F2CA50]/15 rounded-full blur-[90px] pointer-events-none"></div>

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/5 relative z-10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F2CA50] shadow-[0_0_8px_#F2CA50]"></span>
                  <span className="font-label-caps text-xs text-[#F2CA50] uppercase tracking-widest font-semibold">
                    EXECUTIVE BRIEFING PROTOCOL
                  </span>
                </div>
                <h3 className="font-headline-sm text-2xl text-white font-bold tracking-tight mt-1">
                  Build With Braj Technologies
                </h3>
                <p className="font-body-sm text-[#B8B3A4] text-xs sm:text-sm">
                  Provide your technical requirements below to initiate direct consultation via WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEnquiryModalOpen(false)}
                className="w-9 h-9 rounded-full bg-[#1B2234] border border-white/10 flex items-center justify-center text-[#B8B3A4] hover:text-white hover:border-[#F2CA50]/50 transition-all shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 relative z-10">
              {modalSubmittedUrl ? (
                <div className="py-8 px-4 text-center flex flex-col items-center gap-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#7BD0FF]/10 border border-[#7BD0FF]/30 flex items-center justify-center text-[#7BD0FF]">
                    <span className="material-symbols-outlined text-[36px]">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1.5 max-w-md">
                    <h4 className="text-white font-headline-sm text-xl font-bold">Enquiry Prepared</h4>
                    <p className="text-sm text-[#B8B3A4] leading-relaxed">
                      Your technical brief for <strong>{modalForm.company}</strong> has been structured. WhatsApp is opening. If it didn't launch automatically, click below:
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full justify-center">
                    <a
                      href={modalSubmittedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#F2CA50] via-[#FFE088] to-[#F2CA50] text-[#281E00] font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(242,202,80,0.4)] hover:shadow-[0_0_35px_rgba(242,202,80,0.6)] transition-all cursor-pointer"
                    >
                      <span>OPEN WHATSAPP NOW →</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setModalSubmittedUrl(null);
                        setEnquiryModalOpen(false);
                      }}
                      className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#1B2234] hover:bg-[#242C42] border border-white/10 text-white text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleModalSubmit}>
                  {/* Name and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between text-xs">
                        <span>Name <span className="text-[#F2CA50]">*</span></span>
                      </label>
                      <input
                        className={`w-full bg-[#05070B] border ${modalErrors.name ? 'border-[#FFB4AB]' : 'border-white/10'} px-3.5 py-2.5 rounded-lg font-body-sm text-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] transition-colors`}
                        placeholder="e.g. Vikramaditya Sharma"
                        value={modalForm.name}
                        onChange={(e) => {
                          setModalForm(prev => ({ ...prev, name: e.target.value }));
                          if (modalErrors.name) setModalErrors(prev => ({ ...prev, name: '' }));
                        }}
                        type="text"
                      />
                      {modalErrors.name && <span className="text-xs text-[#FFB4AB] mt-0.5">{modalErrors.name}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between text-xs">
                        <span>Company / Business Name <span className="text-[#F2CA50]">*</span></span>
                      </label>
                      <input
                        className={`w-full bg-[#05070B] border ${modalErrors.company ? 'border-[#FFB4AB]' : 'border-white/10'} px-3.5 py-2.5 rounded-lg font-body-sm text-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] transition-colors`}
                        placeholder="e.g. Acme Corporation"
                        value={modalForm.company}
                        onChange={(e) => {
                          setModalForm(prev => ({ ...prev, company: e.target.value }));
                          if (modalErrors.company) setModalErrors(prev => ({ ...prev, company: '' }));
                        }}
                        type="text"
                      />
                      {modalErrors.company && <span className="text-xs text-[#FFB4AB] mt-0.5">{modalErrors.company}</span>}
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between text-xs">
                        <span>Email <span className="text-[#F2CA50]">*</span></span>
                      </label>
                      <input
                        className={`w-full bg-[#05070B] border ${modalErrors.email ? 'border-[#FFB4AB]' : 'border-white/10'} px-3.5 py-2.5 rounded-lg font-body-sm text-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] transition-colors`}
                        placeholder="name@company.com"
                        value={modalForm.email}
                        onChange={(e) => {
                          setModalForm(prev => ({ ...prev, email: e.target.value }));
                          if (modalErrors.email) setModalErrors(prev => ({ ...prev, email: '' }));
                        }}
                        type="email"
                      />
                      {modalErrors.email && <span className="text-xs text-[#FFB4AB] mt-0.5">{modalErrors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between text-xs">
                        <span>Phone Number <span className="text-[#F2CA50]">*</span></span>
                      </label>
                      <input
                        className={`w-full bg-[#05070B] border ${modalErrors.phone ? 'border-[#FFB4AB]' : 'border-white/10'} px-3.5 py-2.5 rounded-lg font-body-sm text-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] transition-colors`}
                        placeholder="e.g. +91 98765 43210"
                        value={modalForm.phone}
                        onChange={(e) => {
                          setModalForm(prev => ({ ...prev, phone: e.target.value }));
                          if (modalErrors.phone) setModalErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        type="tel"
                      />
                      {modalErrors.phone && <span className="text-xs text-[#FFB4AB] mt-0.5">{modalErrors.phone}</span>}
                    </div>
                  </div>

                  {/* What do you need help with? */}
                  <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-[#857D6D] uppercase text-xs">
                      What do you need help with? <span className="text-[#F2CA50]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((service) => {
                        const isSelected = modalForm.service === service;
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => setModalForm(prev => ({ ...prev, service }))}
                            className={`px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#F2CA50] text-[#281E00] shadow-[0_0_12px_rgba(242,202,80,0.3)]'
                                : 'bg-[#141A29] text-[#F2F4FA] border border-white/5 hover:border-[#F2CA50]/40'
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tell us about your requirement */}
                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between text-xs">
                      <span>Tell us about your requirement <span className="text-[#F2CA50]">*</span></span>
                    </label>
                    <textarea
                      className={`w-full bg-[#05070B] border ${modalErrors.details ? 'border-[#FFB4AB]' : 'border-white/10'} px-3.5 py-2.5 rounded-lg font-body-sm text-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] resize-none transition-colors`}
                      placeholder="Describe your current bottlenecks, target workflow automation, or technical deliverables..."
                      rows={3}
                      value={modalForm.details}
                      onChange={(e) => {
                        setModalForm(prev => ({ ...prev, details: e.target.value }));
                        if (modalErrors.details) setModalErrors(prev => ({ ...prev, details: '' }));
                      }}
                    ></textarea>
                    {modalErrors.details && <span className="text-xs text-[#FFB4AB] mt-0.5">{modalErrors.details}</span>}
                  </div>

                  {/* Budget / Timeline */}
                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps text-[#857D6D] uppercase flex items-center justify-between text-xs">
                      <span>Budget / Timeline <span className="text-xs text-[#857D6D] lowercase font-normal">(optional)</span></span>
                    </label>
                    <input
                      className="w-full bg-[#05070B] border border-white/10 px-3.5 py-2.5 rounded-lg font-body-sm text-sm text-white placeholder:text-[#857D6D] focus:outline-none focus:border-[#F2CA50] transition-colors"
                      placeholder="e.g. $10k - $25k, Launch within 6-8 weeks"
                      value={modalForm.budgetTimeline}
                      onChange={(e) => setModalForm(prev => ({ ...prev, budgetTimeline: e.target.value }))}
                      type="text"
                    />
                  </div>

                  {/* CTA Submit Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-[#857D6D] font-label-caps uppercase text-xs">
                      <span className="material-symbols-outlined text-[#F2CA50] text-[18px]">verified_user</span>
                      <span>Confidential &amp; Bilateral NDA</span>
                    </div>
                    <button
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F2CA50] via-[#FFE088] to-[#F2CA50] text-[#281E00] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(242,202,80,0.45)] transition-all cursor-pointer"
                      type="submit"
                    >
                      <span>SEND ENQUIRY →</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
