import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-6 mt-8">
      <p className="text-gray-500 text-sm">
        Desarrollado con ❤️ por un Ingeniero de React. Inspirado en{' '}
        <a
          href="https://julioalvarezrd.github.io/nominard/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition"
        >
          NóminaRD
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;