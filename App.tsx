import React from 'react';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
      <main className="w-full max-w-6xl">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 pb-2">
            Calculadora de Nómina
          </h1>
          <p className="text-gray-400 text-lg">República Dominicana</p>
        </header>
        <Calculator />
      </main>
      <Footer />
    </div>
  );
};

export default App;