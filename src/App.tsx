import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import LoadingScreen from './components/LoadingScreen';
import AdvancedCursor from './components/AdvancedCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import FloatingNav from './components/FloatingNav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import EasterEgg from './components/EasterEgg';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(false); // Temporarily disabled for debugging

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onLoadComplete={() => setIsLoading(false)} />

      {/* Main App */}
      {!isLoading && (
        <div className="relative bg-dark-900 text-white">
          {/* Advanced Cursor */}
          <AdvancedCursor />

          {/* Scroll Progress */}
          <ScrollProgress />

          {/* Navigation */}
          <Navbar />
          <FloatingNav />

          {/* Main Content */}
          <main id="main-content">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Achievements />
            <Contact />
          </main>

          {/* Easter Egg */}
          <EasterEgg />

          {/* Toast Notifications */}
          <Toaster />
        </div>
      )}
    </>
  );
}

export default App;
