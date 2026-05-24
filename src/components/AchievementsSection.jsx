import React, { useEffect, useRef, useState } from 'react';

// Achievement Card Component
const AchievementCard = ({ value, label, suffix = '' }) => {
  return (
    <div className="bg-[var(--color-primary-dark)] text-[var(--color-primary)] p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center opacity-80">
      <div className="text-5xl font-extrabold mb-3 rounded-md text-white">{value}{suffix}</div>
      <div className="text-lg font-medium text-center  rounded-md text-gray-200">{label}</div>
    </div>
  );
};

// Achievements Section with animated counters
const AchievementsSection = () => {
  const [clients, setClients] = useState(0);
  const [epic, setEpic] = useState(0);
  const [cerner, setCerner] = useState(0);
  const [hours, setHours] = useState(0);
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Function to animate the counter
  const animateCounter = (setter, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const interval = setInterval(() => {
      start += increment;
      if (start < target) {
        setter(Math.ceil(start));
      } else {
        setter(target);
        clearInterval(interval);
      }
    }, 16);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounter(setClients, 20);
          animateCounter(setEpic, 20);
          animateCounter(setCerner, 5);
          animateCounter(setHours, 50000);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-16 md:py-24 bg-[var(--color-primary)] rounded-lg shadow-lg mx-4 md:mx-auto my-8"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-10 rounded-md">
          OUR ACHIEVEMENTS
        </h2>
        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] mb-12 max-w-3xl mx-auto rounded-md">
          Today, we boast of having helped domestic and international clients realize their digital transformation vision.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AchievementCard value={clients} label="Domestic & International Clients" />
          <AchievementCard value={epic} label="EPIC Implementations" />
          <AchievementCard value={cerner} label="Cerner Implementations" />
          <AchievementCard value={hours} label="Hours of Experience" suffix="+" />
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
