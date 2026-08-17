import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BranchProvider, useBranch } from '@/context/BranchContext';
import LoadingScreen from '@/components/LoadingScreen';
import BranchSelection from '@/components/BranchSelection';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import WhatWeOffer from '@/components/WhatWeOffer';
import About from '@/components/About';
import Services from '@/components/Services';
import Branches from '@/components/Branches';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

type Stage = 'loading' | 'branch' | 'ready';

function AppContent() {
  const [stage, setStage] = useState<Stage>('loading');
  const [branchPickerOpen, setBranchPickerOpen] = useState(false);
  const { setSelectedBranch } = useBranch();

  const handleLoadComplete = () => {
    // The live-site flow is: loading screen -> branch selection -> website.
    // Keep this step explicit so a fresh page load always starts with branch selection.
    setStage('branch');
  };

  const handleBranchSelect = (id: string) => {
    setSelectedBranch(id);
    localStorage.setItem('dnc-visited', '1');
    setStage('ready');
    setBranchPickerOpen(false);
  };

  const openBranchPicker = () => {
    setBranchPickerOpen(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <LoadingScreen key="loader" onComplete={handleLoadComplete} />
        )}

        {stage === 'branch' && (
          <BranchSelection key="branch" onSelect={handleBranchSelect} />
        )}
      </AnimatePresence>

      {stage === 'ready' && (
        <div className="relative min-h-screen bg-ink-950">
          <Header onChangeBranch={openBranchPicker} />

          <main>
            <Hero />
            <MenuSection />
            <WhatWeOffer />
            <About />
            <Services />
            <Branches />
            <Contact />
          </main>

          <Footer />

          <AnimatePresence>
            {branchPickerOpen && (
              <BranchSelection
                key="branch-change"
                onSelect={handleBranchSelect}
                onClose={() => setBranchPickerOpen(false)}
                mode="change"
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BranchProvider>
      <AppContent />
    </BranchProvider>
  );
}
