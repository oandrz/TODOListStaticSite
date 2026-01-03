import React, { useState, useEffect } from 'react';
import { SuccessView } from './components/SuccessView';
import { Confetti } from './components/Confetti';

const App: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stop confetti after 5 seconds to save resources
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-rose-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[40%] bg-lime-100/30 rounded-full blur-3xl" />
      </div>

      {/* Confetti Overlay */}
      <Confetti active={showConfetti} />

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-lg">
        <SuccessView />
      </div>
      
      {/* Footer */}
      <footer className="absolute bottom-6 w-full text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} OinkCorp. All rights reserved.
      </footer>
    </div>
  );
};

export default App;