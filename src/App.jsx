import React, { useState } from 'react';
import './App.css';

import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CharactersSection from './components/CharactersSection';
import TriviaSection from './components/TriviaSection';
import Footer from './components/Footer';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen bg-[#030303] text-[#f5f5f5] overflow-x-hidden">
      {!introComplete && (
        <IntroScreen onEnter={() => setIntroComplete(true)} />
      )}
      {introComplete && (
        <>
          <Navbar />
          <main>
            <Home />
            <CharactersSection />
            <TriviaSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
