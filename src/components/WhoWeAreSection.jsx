import React from 'react';

// Who We Are Section
const WhoWeAreSection = () => {
  return (
    <section 
      id="who-we-are" 
      className="py-16 md:py-24 bg-[var(--color-primary)] rounded-lg shadow-lg mx-4 md:mx-auto my-8"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-primary-dark)] mb-10 rounded-md">
          WHO WE ARE!
        </h2>
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/hero4.png"
              alt="Team Collaboration"
              className="rounded-lg shadow-xl w-full h-[350px] md:h-[500px] object-cover"
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = "https://placehold.co/600x400/E0F2F7/000000?text=Image+Error"; 
              }}
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-6 rounded-md">
              Candid HealthSystems Consultants Ltd. (Candid HSC) is engaged in providing healthcare EPR resourcing,
              consulting, and technology solutions with a special focus on the digital transformation of healthcare
              organisations.
            </p>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] rounded-md">
              We are committed to helping healthcare institutions achieve their vision of a digitally enabled health and
              social care system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
