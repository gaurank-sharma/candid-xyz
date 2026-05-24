import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  const foundationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    if (foundationRef.current) {
      observer.observe(foundationRef.current);
    }

    return () => {
      if (foundationRef.current) {
        observer.unobserve(foundationRef.current);
      }
    };
  }, []);

  const leaders = [
    {
      name: "Avinash Chander",
      role: "Director",
      img: "/Avinash.jpeg",
      description:
        "Mr. Avinash Chander, is an astute Electronic Patient Record (EPR) Systems Implementation Specialist who has led the digital transformation journeys of numerous healthcare organisations globally. A physiotherapist who brings over 16 years of healthcare experience and expertise in EPR implementations, hospital operations, quality and accreditation processes and digital healthcare consulting gained from a multitude of healthcare projects based in the US, India, the Middle East and the UK. He has successfully delivered EPR projects for leading healthcare institutions using Epic and other platforms, such as Siemens Soarian MedSuite and MDSynergy. ",
    },
    {
      name: "Sandra Shantanu",
      role: "Business Support Officer",
      img: "Sandra.jpeg",
      description:
        "Sandra is a dedicated Business Support Officer with a strong background in sales, bringing a wealth of experience to her role. With a proven track record of providing exceptional administrative and operational support, Sandra has worked across various industries, helping streamline processes and improve efficiency. In her previous roles, she effectively managed client communications, processed orders, coordinated schedules, and ensured smooth interactions between sales teams and other departments. Sandra’s experience in sales has given her valuable insight into customer needs, allowing her to tailor support strategies that drive business growth. ",
    },
   
    {
      name: "Amit Kumar Bajpai",
      role: "Honorary Advisor",
      img: "Amit.jpeg",
      description:
        "Amit is a pioneering figure in digital health with more than eighteen years of international experience. Amit spearheads innovation in AI, machine learning, and digital transformation in his role as Practice Head for Healthcare at ACCRO.  Throughout his career, Amit has held important positions at IBM, Accenture, and Deloitte, where he oversaw significant health IT projects in the USA, UK, and MEA. He made significant contributions to important initiatives including Abu Dhabi's Malaffi (Health Information Exchange) and Dubai's NABIDH, two cornerstones of the United Arab Emirates' integrated healthcare system. These technologies improve clinical decision-making and patient outcomes by facilitating safe, real-time data sharing between clinicians.  Amit, a specialist in IT business analysis, process automation, and project management, is an Epic-certified professional who ensures the smooth implementation of innovative solutions.   Fostering cross-border cooperation is another aspect of Amit's leadership.",
    },
    {
      name: "Dwaipayn",
      role: "Healthcare IT consultant",
      img: "/Dwaipayn.jpeg",
      description:
        "Dwaipayn is a seasoned Healthcare IT consultant with 12 years of experience specializing in Healthcare IT Strategy, Stakeholder Engagement, Team Leadership, and System Integration. He has successfully led complex, multi-site EMR implementations and optimization projects across the USA, UAE, and UK, driving digital transformation for leading organizations such as Deloitte, Dubai Health Authority, and Cleveland Clinic London. He excels in end-to-end project management, from requirements gathering and design documentation to system integration testing and ongoing solution enhancement. His expertise in interoperability standards like HL7 v2, XML, and X12, combined with hands-on experience in Rhapsody, Cloverleaf, Ensemble, and Epic Interconnect, positions him as a go-to expert in healthcare data integration and compliance. As an Epic-certified professional (Bridges Interface, Epic Gallery, HIM ROI, Data Courier Administrator, Security), Dwaipayn brings deep technical knowledge and a practical approach to EMR implementation and training. He is passionate about building capable teams, ensuring knowledge transfer, and empowering organizations to navigate the evolving digital healthcare landscape."},

        {
      name: "Poornima",
      role: "Healthcare IT consultant",
      img: "Poornima.jpeg",
      description:
        "Poornima is an accomplished Healthcare IT Consultant with over 11 years of experience driving the implementation, optimization, and delivery of complex healthcare systems. She has successfully managed the full project lifecycle—from initial scoping and workflow analysis to seamless go-live and post-implementation stabilization—ensuring that technology empowers clinical and operational excellence. As an Epic-certified analyst (Inpatient Procedure Orders, Clinical Documentation, and ASAP), Poornima is skilled at translating business requirements into intuitive, efficient, and compliant system configurations. Her expertise lies in bridging the gap between clinical workflows and technical solutions, enabling healthcare organizations to achieve streamlined operations and meet regulatory standards. With proven success across healthcare systems in both the UK and US, she brings a strong mix of business analysis, problem-solving, and leadership skills. Poornima thrives in collaborative, team-oriented environments, while equally confident in stepping into leadership roles to guide projects to success. Passionate about transforming healthcare through digital innovation, she is dedicated to helping organizations optimize performance, enhance patient care, and navigate the ever-evolving landscape of healthcare IT.."
        },
  ];

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
        <section 
        className="relative h-[40vh] md:h-[60vh] bg-cover bg-center" 
        style={{ backgroundImage: 'url(/candid_about.jpeg)' }}
      >
        <div className="absolute inset-0 bg-[var(--color-primary-dark)] opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <div className="text-sm md:text-xl font-light mb-2">
            Health-Care Leadership 
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold px-4">
            WHO WE ARE 
          </h1>
        </div>
      </section>
      <section className="bg-gray-100 py-16 lg:py-24 px-6 md:px-12 rounded-xl mt-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left-side Text Content */}
          <div className="lg:w-1/2">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Together at the Core
            </h3>
            {/* <p className="text-gray-700 leading-relaxed mb-4">
             A passionate group of professionals to help you achieve the transformation you have envisioned. We strive to walk with you on your EPR digitisation journey on your terms. our team at Candid HealthSystems Consultants Ltd is made up of highly skilled consultants  with diverse backgrounds. We work together to provide our clients with tailored solutions that meet their unique needs. Meet our team and learn more about our individual areas of expertise.
            </p> */}
            <p className="text-gray-700 leading-relaxed mb-4">
            At Candid Healthsystems Consultants Ltd., we take a holistic approach to consulting. We work closely with our clients to understand their goals and challenges and develop solutions that are goal-oriented or problem-focused. Our approach is collaborative, transparent, and results-driven. 
            </p>
          </div>

          {/* Right-side Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src="https://s3-us-west-2.amazonaws.com/speedybrandimages/tmp_2334d759-811d-42f2-bda3-90321949cd19.webp"
              alt="A nurse holding a white orchid"
              className="rounded-xl shadow-lg w-full max-w-lg lg:max-w-none"
            />
          </div>
        </div>
      </section>

      {/* Three Circles Section */}
      <section
        ref={foundationRef}
        className="flex flex-col items-center justify-center mt-5 bg-white text-gray-900 px-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-10 text-center">
          Our Approach
        </h2>

        <div className="relative w-96 h-96 flex items-center justify-center mb-10 md:mb-25">
          {/* Left Circle */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="absolute w-48 h-48 md:w-64 md:h-64 bg-red-100 rounded-full flex items-center justify-center top-[13%] left-[8%] md:top-[13%] md:left-[-10%]"

          >
            <span className="text-lg font-bold">Collaborative</span>
          </motion.div>

          {/* Right Circle */}
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="absolute w-48 h-48 md:w-64 md:h-64 bg-blue-100 rounded-full flex items-center justify-center top-[13%] right-[1%] md:top-[13%] md:right-[-10%]"
   
          >
            <span className="text-lg font-bold">Transparent</span>
          </motion.div>

          {/* Bottom Circle */}
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="absolute w-48 h-48 md:w-64 md:h-64 bg-green-100 rounded-full flex items-center justify-center bottom-[5%] left-[27%] md:bottom-[-18%] md:left-[55%] md:transform md:-translate-x-[60%]"
           
          >
            <span className="text-lg font-bold">Results-driven</span>
          </motion.div>
        </div>
      </section>
   <section className="bg-gray-100 py-16 px-6 md:px-12 mt-10 rounded-xl max-w-7xl mx-auto">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
      How We Deliver Impact
    </h2>
    <p className="text-gray-600 max-w-3xl mx-auto text-lg">
      Our methodology is shaped by deep healthcare expertise, operational excellence, and a relentless focus on outcomes.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-[var(--color-primary-dark)]"
    >
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Fully Integrated Delivery Teams
      </h3>
      <p className="text-gray-600 leading-relaxed">
       We bring a fully integrated delivery team, not just individual resources, ensuring faster ramp up, stronger knowledge retention, and smoother execution throughout your programme lifecycle.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-[var(--color-primary-dark)]"
    >
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Global Expertise, Local Understanding
      </h3>
      <p className="text-gray-600 leading-relaxed">
       We blend global best practices with deep healthcare domain knowledge, giving clients the best of both worlds.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-[var(--color-primary-dark)]"
    >
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        NHS-Ready Partnerships
      </h3>
      <p className="text-gray-600 leading-relaxed">
        We’re plug and play for NHS Trusts - compliant, cost effective, and framework ready to accelerate your transformation journey.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-[var(--color-primary-dark)]"
    >
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Rapid Response for High-Stakes Projects
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Engage our rapid response digital health team when timelines shrink and stakes rise - we ensure stability, speed, and success under pressure.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-[var(--color-primary-dark)] md:col-span-2"
    >
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Adoption Beyond Implementation
      </h3>
      <p className="text-gray-600 leading-relaxed">
        We don’t just implement systems, we ensure they’re adopted, optimized, and embraced by clinicians to drive real change in care delivery.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-[var(--color-primary-dark)] md:col-span-2"
    >
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Modular, Flexible Advisory
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Our modular advisory model is built around your needs, from one day strategy sessions to full programme support - we scale as your goals evolve.
      </p>
    </motion.div>
  </div>
</section>
        {/* Leadership Section */}
<section className="py-16 ">

     <div className="md:hidden bg-gray-100 ">
    <div className="container mx-auto px-4 space-y-24">
      {leaders.map((leader) => (
        <div key={leader.name} className="flex flex-col items-left ">
          {/* Mobile: Centered, circular image */}
          <div className="w-48 h-48 rounded-full shadow-lg overflow-hidden z-10 mx-5">
            <img
              src={leader.img}
              alt={leader.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile: Card content below the image */}
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-sm -mt-24 pt-28 p-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              {leader.name}
            </h3>
            <p className="text-indigo-600 font-medium mb-4 text-xl">{leader.role}</p>
            <p className="text-gray-600 leading-relaxed text-md text-justify">
              {leader.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

<div
  className=" hidden md:block bg-gray-50"
  style={{
    transform: "scale(0.9)",      
    transformOrigin: "top center" 
  }}
>
  <div className="space-y-16">
  {leaders.map((leader, index) => (
    <div
      key={index}
      className={`relative flex flex-col md:flex-row items-center md:items-stretch ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Card */}
      <div className="md:relative bg-white rounded-2xl shadow-lg p-10 md:w-2/3 z-10 overflow-visible">
        <h3 className="text-2xl font-semibold text-gray-800">
          {leader.name}
        </h3>
        <p className="text-indigo-600 font-medium mb-4">{leader.role}</p>
        <p className="text-gray-600 leading-relaxed">
          {leader.description}
        </p>

        {/* Image anchored to card */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-64 h-64 rounded-xl shadow-lg overflow-hidden
            ${index % 2 === 0 ? "right-[-15rem]" : "left-[-15rem]"}`}
        >
          <img
            src={leader.img}
            alt={leader.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  ))}
</div>
</div>

</section>

    </div>
  );
}



