import React from 'react';
import SectionHeading from '../components/SectionHeading';
import LeafDecoration from '../components/LeafDecoration';

const OurStory: React.FC = () => (
  <section className="relative bg-cream px-6 md:px-16 py-16 md:py-24 overflow-hidden">
    <LeafDecoration className="absolute left-2 bottom-2 h-32 w-28 opacity-70" />

    <div className="relative mx-auto max-w-[1536px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
      <div className="rounded-2xl overflow-hidden shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
          alt="Red Chilly Cafe outdoor seating area, lit with warm lanterns"
          className="w-full h-[420px] md:h-[560px] object-cover"
        />
      </div>

      <div>
        <SectionHeading eyebrow="OUR STORY" />
        <h2 className="font-serif-display font-bold text-4xl md:text-5xl text-ink mt-4 leading-[1.08]">
          Where Good Food
          <br />
          Meets Good Mood
        </h2>
        <p className="font-sans text-ink/75 leading-relaxed mt-6 max-w-md">
          Nestled in the heart of Auroville, Red Chilly Cafe brings together Italian, Continental
          and fusion flavours in a relaxed and welcoming setting.
        </p>
        <p className="font-sans text-ink/75 leading-relaxed mt-4 max-w-md">
          From handcrafted pizzas and homemade pasta to fresh seafood and comforting desserts,
          every dish is created with quality ingredients and a passion for good food.
        </p>

        <div className="h-px w-10 bg-terracotta/70 my-6" />

        <p className="font-serif-display italic text-ink/80">
          Authentic flavours &nbsp;•&nbsp; Fresh ingredients &nbsp;•&nbsp; Auroville spirit
        </p>
      </div>
    </div>
  </section>
);

export default OurStory;
