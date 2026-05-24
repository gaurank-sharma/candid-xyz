import React from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "AVINASH CHANDER",
    role: "Director",
    img: "https://lh4.googleusercontent.com/7PMNuxe9lWV26Msf3eQ1Ecl8vHdT4o-mpjiKCpJlzroGYq9MgeJJqIQrQAsWdUjeonwSNGKxTi-z4OZVFJw8LVOwUbxOeAAsFebSyfSQf6_68QlguzAugbHTvqr7k3NeFldx4k3L7fZDRDprNbGeplLpgSjCucxNicKKTroqXfpLEaFbRiKg8g=w1280",
    bio: `Mr. Avinash Chander, is an astute Electronic Patient Record (EPR) Systems Implementation Specialist who has led the digital transformation journeys of numerous healthcare organisations globally. A physiotherapist who brings over 16 years of healthcare experience and expertise in EPR implementations, hospital operations, quality and accreditation processes and digital healthcare consulting gained from a multitude of healthcare projects based in the US, India, the Middle East and the UK. He has successfully delivered EPR projects for leading healthcare institutions using Epic and other platforms, such as Siemens Soarian MedSuite and MDSynergy.`,
  },
  {
    name: "SANDRA SHANTANU",
    role: "Business Support Officer",
    img: "/Sandra.jpeg",
    bio: `Sandra is a dedicated Business Support Officer with a strong background in sales, bringing a wealth of experience to her role. With a proven track record of providing exceptional administrative and operational support, Sandra has worked across various industries, helping streamline processes and improve efficiency. In her previous roles, she effectively managed client communications, processed orders, coordinated schedules, and ensured smooth interactions between sales teams and other departments. Sandra’s experience in sales has given her valuable insight into customer needs, allowing her to tailor support strategies that drive business growth.`,
  },
  {
    name: "ZOEB AKHTAR",
    role: "EPR System Analyst",
    img: "https://lh5.googleusercontent.com/jqp0Tt_AzLXAHPTiHsoEfgDi-AqOE-nHbkZ3Z4cgvDxEr8fo-StLolyarWgsEqBw5RU9qfDf7_mjn1Frb1PwCj9oG4tqONO_BR9zLXnmkQDSTPu4CSi_0frZIj7trvVceWT0otfOqb9T1bDoFPOZOpkg9tG6nSVYvqVN9R9mZjguUGl6LaniSQ=w1280",
    bio: `Zoeb is a Health IT specialist with over 16 years of experience managing EHR systems like Epic and Cerner. He has led digital transformation initiatives across medium and large healthcare organizations, with a focus on improving clinical care, patient management, and process automation. As a Program Manager, Zoeb has overseen EHR upgrades and efficiency efforts across the U.S. He has successfully delivered eCQM reporting projects supporting JCI accreditation and implemented EHR solutions in inpatient settings to enhance clinical outcomes. A certified PMP, Zoeb brings expertise in project management, stakeholder engagement, and operational optimization.`,
  },
  {
    name: "AMIT KUMAR BAJPAI",
    role: "Honorary Advisor",
    img: "https://lh3.googleusercontent.com/nFwzgyvYw0_1nn1S9Y10o6O1kKEaP-i0yzrudJFvGyL8z3tOaBrnbI9UadgR4e8gqiO7a5aQWMt_Nm00056IpDnSa_PTBGhfPM2dr4rc_CZzxC2J_mNL_1-ZpoHJkHXfMADa243qPQc-KmxUA9CJ3reejqDezMNqX9nAmm93SyzKyvz8cX7v4A=w1280",
    bio: `Amit is a pioneering figure in digital health with more than eighteen years of international experience. Amit spearheads innovation in AI, machine learning, and digital transformation in his role as Practice Head for Healthcare at ACCRO. Throughout his career, Amit has held important positions at IBM, Accenture, and Deloitte, where he oversaw significant health IT projects in the USA, UK, and MEA. He made significant contributions to important initiatives including Abu Dhabi's Malaffi (Health Information Exchange) and Dubai's NABIDH. Amit, a specialist in IT business analysis, process automation, and project management, is an Epic-certified professional who ensures the smooth implementation of innovative solutions.`,
  },
];

const OurPeople = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-r from-[#0B9F94] to-[#00F6FF] text-white text-center">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our People
        </motion.h1>
        <motion.p
          className="mt-8 max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          A passionate group of professionals to help you achieve the transformation you have envisioned. We walk with you on your EPR digitisation journey — on your terms.
        </motion.p>
      </section>

      {/* Team Section */}
      <section className="py-20 container mx-auto px-6 space-y-24">
        {team.map((person, index) => (
          <motion.div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-10 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <div className="flex-shrink-0 w-full lg:w-1/4 h-[350px] overflow-hidden rounded-3xl shadow-lg">
              <img
                src={person.img}
                alt={person.name}
                className="w-full h-full object-fit transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B9F94]">{person.name}</h2>
              <p className="text-lg font-medium text-gray-500 mb-6">{person.role}</p>
              <p className="text-lg text-gray-400 leading-relaxed">{person.bio}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default OurPeople;
