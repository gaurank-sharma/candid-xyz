import React from 'react';

// Thought Card Component
const ThoughtCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-[var(--color-text-primary)] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2 rounded-md">{title}</h3>
        <p className="text-gray-500 text-sm rounded-md">{description}</p>
      </div>
      <div className="relative h-48 w-full bg-[var(--color-primary-light)] flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/300x200/FFFFFF/000000?text=Image+Error"; 
          }}
        />
        <a 
          href={link} 
          className="absolute top-2 right-2 text-[var(--color-primary-dark)] hover:text-[var(--color-primary-light)]"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

// Our Thinking Section
const OurThinkingSection = () => {
  const thoughts = [
    {
      title: "2025 Global Health Care Outlook",
      description: "This report highlights exponential technology, enhancing efficiency, productivity, and patient engagement as the key priorities of health system leaders in 2025.",
      image: "https://placehold.co/300x200/F0F8FF/000000?text=Outlook",
      link: "#"
    },
    {
      title: "From pilots to practice: Scaling AI use in federal health",
      description: "Federal health agencies can harness AI to improve the efficiency of both health services and government operations",
      image: "https://placehold.co/300x200/F0F8FF/000000?text=AI+Health",
      link: "#"
    },
    {
      title: "Life Sciences and Healthcare Predictions 2030",
      description: "Life Sciences and Healthcare Predictions 2030",
      image: "https://placehold.co/300x200/F0F8FF/000000?text=Predictions",
      link: "#"
    },
    {
      title: "Future of Health Series",
      description: "The Future of Health Series is a dynamic collection of webcast designed to spark conversations and drive meaningful change across the healthcare landscape.",
      image: "https://placehold.co/300x200/F0F8FF/000000?text=Future+Health",
      link: "#"
    }
  ];

  return (
    <section 
      id="our-thinking" 
      className="py-16 md:py-24 bg-[var(--color-primary-light)]/10 rounded-lg shadow-lg mx-4 md:mx-auto my-8"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-primary-dark)] mb-10 rounded-md">
          Our thinking
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {thoughts.map((thought, index) => (
            <ThoughtCard key={index} {...thought} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="text-[var(--color-primary-dark)] font-semibold hover:text-[var(--color-primary-light)] rounded-md"
          >
            Explore our thinking &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurThinkingSection;
