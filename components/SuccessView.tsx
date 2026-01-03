import React from 'react';
import { CheckCircle } from 'lucide-react';

export const SuccessView: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden animate-scale-in">
      {/* Header Pattern */}
      <div className="h-32 bg-gradient-to-r from-emerald-400 to-rose-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 p-2 bg-white rounded-full shadow-lg">
          <div className="bg-emerald-50 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-emerald-500 animate-[bounce_1s_infinite]" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <div className="pt-16 pb-12 px-8 sm:px-12 text-center">
        <div className="animate-fade-in-up [animation-delay:200ms]">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-3">
            Account Confirmed!
          </h1>
          <p className="text-lg text-gray-600 max-w-sm mx-auto leading-relaxed">
            Congratulations! Your email has been successfully verified.
          </p>
        </div>
      </div>
    </div>
  );
};