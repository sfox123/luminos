'use client';

import { useState } from 'react';
import Nav from './Nav.jsx';
import Hero from './Hero.jsx';
import Marquee from './Marquee.jsx';
import Partners from './Partners.jsx';
import Services from './Services.jsx';
import EnsoFeature from './EnsoFeature.jsx';
import DemoDashboards from './DemoDashboards.jsx';
import Projects from './Projects.jsx';
import BeforeAfter from './BeforeAfter.jsx';
import PipelineRunner from './PipelineRunner.jsx';
import Approach from './Approach.jsx';
import Calculator from './Calculator.jsx';
import Process from './Process.jsx';
import Faq from './Faq.jsx';
// The contact form is hidden for now. To bring it back, render <Contact /> instead of <ContactActions />.
// import Contact from './Contact.jsx';
import ContactActions from './ContactActions.jsx';
import Footer from './Footer.jsx';

export default function Home() {
  const [demo, setDemo] = useState('enso');
  const tryEnso = () => {
    setDemo('enso');
    document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Partners />
        <Services />
        <EnsoFeature onTryIt={tryEnso} />
        <DemoDashboards active={demo} setActive={setDemo} />
        <Projects />
        <BeforeAfter />
        <PipelineRunner />
        <Approach />
        <Calculator />
        <Process />
        <Faq />
        <ContactActions />
      </main>
      <Footer />
    </>
  );
}
