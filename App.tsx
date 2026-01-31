
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Favourites from './components/Favourites';
import Location from './components/Location';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="menu">
          <Favourites />
        </section>
        <section id="location">
          <Location />
        </section>
        <section id="about">
          <SocialProof />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
