import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const HeroSection = () => {
  const navigate = useNavigate(); 
  //  3 images here
  const images = [
    "/hero1.png",
    "/hero2.png",
    "/hero3.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative bg-[var(--color-primary-dark)] text-[var(--color-text-primary)] py-20 md:py-32 overflow-hidden shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between z-10 relative">
        {/* Left content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 rounded-md">
            Digital Health
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 rounded-md">
            Amid uncertainty and change, the healthcare sector is looking for new ways to transform the journey of care. Digital Health is where technology and innovation come together to improve well-being. our unique value lies in our holistic, patient-centered approach to healthcare consulting. Let us help you unlock the full potential of your EPR system, streamline operations, and enhance patient outcomes, all while staying compliant and ahead of industry trends.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Primary button */}
            <button
              onClick={() => navigate("/contact")} // Navigate to Contact page
              className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[var(--color-primary-dark)] transition-all duration-300 transform hover:scale-105"
            >
              Contact us
            </button>

            {/* Submit RFP button */}
            <button
              onClick={() => navigate("/rfp")} // Navigate to Submit RFP page
              className="bg-transparent text-white font-semibold py-3 px-8 rounded-full border border-white hover:bg-white hover:text-[var(--color-primary-dark)] transition-all duration-300 transform hover:scale-105"
            >
              Submit RFP
            </button>
          </div>
        </div>

        {/* Right content - Image Carousel */}
        <div className="md:w-1/2 flex justify-center items-center relative">
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-[var(--color-primary-light)] shadow-2xl">
            {/* Gradient background */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at center, var(--color-primary-dark) 0%, var(--color-primary-light) 100%)`,
              }}
            ></div>

            {/* Images */}
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Healthcare ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/400x400/ADD8E6/000000?text=Image+Error";
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


