// components/LoadingModal.tsx
import React from 'react';

const LoadingModal: React.FC = () => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-title"
    >
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#657656] border-t-transparent mb-4"></div>
        <h2
          id="loading-title"
          className="text-[#11372A] text-lg font-semibold"
        >
          Cargando...
        </h2>
      </div>
    </div>
  );
};

export default LoadingModal;