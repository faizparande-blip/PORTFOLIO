import React, { Component, useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import PortfolioLoader from './components/PortfolioLoader';
import PointerSpotlight from './components/ui/PointerSpotlight';
import TechBackground from './components/background/TechBackground';
import Navbar from './components/navigation/Navbar';
import Hero from './sections/Hero';

// Below-the-fold sections loaded progressively
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Experience = lazy(() => import('./sections/Experience'));
const Education = lazy(() => import('./sections/Education'));
const ResumeCTA = lazy(() => import('./sections/ResumeCTA'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./components/navigation/Footer'));

// Lightweight Section Fallback
const SectionPlaceholder = () => (
  <div className="py-12 flex items-center justify-center text-slate-600 text-xs font-mono">
    <span className="w-2 h-2 rounded-full bg-cyan-500/40 animate-pulse mr-2" />
    Loading module...
  </div>
);

// Error Boundary to prevent full screen blank crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#050B14] text-slate-100 p-6">
          <div className="p-8 rounded-2xl bg-[#0B1726] border border-slate-800 shadow-2xl max-w-md text-center">
            <h2 className="text-xl font-bold text-rose-400 mb-2">Something went wrong</h2>
            <p className="text-xs text-slate-400 mb-6">
              An unexpected error occurred. Please try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-[#050B14] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-hidden">
        {/* Pre-loader with seamless exit transition */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <PortfolioLoader onComplete={handleLoaderComplete} />
          )}
        </AnimatePresence>

        {/* Ambient Pointer Cursor Spotlight (Desktop) */}
        <PointerSpotlight />

        {/* Midnight Blue & Cyan Background Canvas */}
        <TechBackground />

        {/* Sticky Navbar */}
        <Navbar />

        {/* Critical Hero with Staggered Entrance */}
        <main className="relative z-10">
          <Hero isLoaded={!isLoading} />

          {/* Progressive Below-The-Fold Sections */}
          <Suspense fallback={<SectionPlaceholder />}>
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <ResumeCTA />
            <Contact />
          </Suspense>
        </main>

        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
