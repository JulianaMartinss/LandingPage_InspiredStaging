import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Gallery from '../components/Gallery';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import FAQ from '../components/FAQ';
import ContactFooter from '../components/ContactFooter';
import CallToAction from '../components/CallToAction';

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    // Pegando o section vindo do state ou do hash na URL
    const sectionId =
      (location.state as any)?.scrollTo || location.hash.replace('#', '');

    if (sectionId) {
      // Timeout garante que o DOM já esteja renderizado
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      // Limpa o state/hash para não rolar novamente
      window.history.replaceState({}, '');
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <main>
        <section id="home"><Hero /></section>
        <section id="why-staging-works"><Features /></section>
        <section id="gallery"><Gallery /></section>
        <section id="projects"><Projects /></section>
        <section id="reviews"><Testimonials /></section>
        <section id="about"><About /></section>

        <FAQ />
        <CallToAction />
      </main>
      <ContactFooter />
    </>
  );
};

export default HomePage;






