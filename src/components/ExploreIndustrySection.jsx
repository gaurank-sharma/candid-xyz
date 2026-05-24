import React from 'react';

// Explore the Life Sciences & Health Care industry Section
const ExploreIndustrySection = () => {
  return (
    <section
      id="explore-industry"
      className="py-16 md:py-24 bg-[var(--color-primary)] rounded-lg shadow-lg mx-4 md:mx-auto my-8"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-primary-dark)] mb-10 rounded-md">
          Explore the Life Sciences & Health Care industry
        </h2>
        <div className="max-w-3xl mx-auto bg-[var(--color-primary)] p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-[var(--color-primary-dark)] mb-4 rounded-md">
            Life Sciences
          </h3>
          <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-6 rounded-md">
            In our constantly evolving landscape, life sciences companies often need to address uncertainties,
            while bringing new discoveries and innovative solutions to life. Our customized solutions can help
            clients worldwide uncover their potential and drive progress.
          </p>
          <a
            href="#"
            className="text-[var(--color-accent)] font-semibold hover:underline flex items-center rounded-md"
          >
            Find out more
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExploreIndustrySection;
