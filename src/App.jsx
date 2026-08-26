import React, { Component, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import PortfolioLoader from './components/PortfolioLoader';
import TechBackground from './components/background/TechBackground';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import ResumeCTA from './sections/ResumeCTA';
import Contact from './sections/Contact';

// Error Boundary
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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 p-6">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xl max-w-md text-center">
            <h2 className="text-xl font-bold text-rose-600 mb-2">Something went wrong</h2>
            <p className="text-xs text-slate-500 mb-6">
              An unexpected error occurred. Please try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
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
      <div className="relative min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
        {/* Technical System Loader */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <PortfolioLoader onComplete={handleLoaderComplete} />
          )}
        </AnimatePresence>

        {/* Subtle modern background */}
        <TechBackground />

        {/* Sticky SaaS Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero isLoaded={!isLoading} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <ResumeCTA />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
