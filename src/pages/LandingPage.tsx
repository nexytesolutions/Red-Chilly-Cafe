import React from 'react';
import Contact from './Contact';
import Experience from './Experience';
import Home from './Home';
import Menu from './Menu';
import OurStory from './OurStory';

const LandingPage: React.FC = () => (
  <>
    <div id="home">
      <Home />
    </div>
    <div id="our-story">
      <OurStory />
    </div>
    <div id="menu">
      <Menu />
    </div>
    <div id="experience">
      <Experience />
    </div>
    <div id="contact">
      <Contact />
    </div>
  </>
);

export default LandingPage;
