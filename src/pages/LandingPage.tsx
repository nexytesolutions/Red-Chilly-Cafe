import React from 'react';
import Contact from './Contact';
import Experience from './Experience';
import Home from './Home';
import Menu from './Menu';
import OurStory from './OurStory';

const LandingPage: React.FC = () => (
  <>
    <div id="home" className="scroll-mt-[89px] md:scroll-mt-[105px]">
      <Home />
    </div>
    <div id="our-story" className="scroll-mt-[89px] md:scroll-mt-[105px]">
      <OurStory />
    </div>
    <div id="menu" className="scroll-mt-[89px] md:scroll-mt-[105px]">
      <Menu />
    </div>
    <div id="experience" className="scroll-mt-[89px] md:scroll-mt-[105px]">
      <Experience />
    </div>
    <div id="contact" className="scroll-mt-[89px] md:scroll-mt-[105px]">
      <Contact />
    </div>
  </>
);

export default LandingPage;
