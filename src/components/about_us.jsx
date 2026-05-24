import React from "react";
import {
  ChevronRight,
  Handshake,
  Rocket,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const Aboutus = () => {
  const services = [
    {
      title: "Digital Strategy",
      description:
        "We craft data-driven strategies to navigate the complexities of digital transformation, ensuring your vision becomes a reality.",
      icon: <Rocket className="h-6 w-6 text-white" />,
    },
    {
      title: "Operational Excellence",
      description:
        "Optimize your business processes for peak performance, leveraging technology to streamline operations and enhance efficiency.",
      icon: <TrendingUp className="h-6 w-6 text-white" />,
    },
    {
      title: "Sustainable Innovation",
      description:
        "Step into a sustainable future built for people, planet, and prosperity. We help you innovate with purpose and measurable impact.",
      icon: <Lightbulb className="h-6 w-6 text-white" />,
    },
  ];

  const articles = [
    "PLANNING AND IMPLEMENTING AN ELECTRONIC PATIENT RECORD (EPR) SYSTEM",
    "ASSESSING CURRENT HEALTHCARE WORKFLOWS FOR EPR IMPLEMENTATION",
  ];

  const caseStudies = [
    "SEPSIS MANAGEMENT",
    "ORDER SET UPDATES",
    "BEST PRACTICE ALERTS",
  ];

  return (
    <div style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ backgroundColor: "#0B9F94" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full opacity-10 blur-3xl animate-pulse delay-500"
          style={{ backgroundColor: "#00F6FF" }}
        ></div>

        <div className="max-w-4xl text-center z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight tracking-tighter">
            Together is what makes the impossible{" "}
            <span style={{ color: "#0B9F94" }}>achievable.</span>
          </h1>
          <p
            className="mt-8 text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "#4B4B4B" }}
          >
            We bring together diverse disciplines, technologies, and
            perspectives. When you lean on others with purpose, you combine
            relevant experiences and capabilities to help your business
            advance.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Our services are driven by collaboration
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#4B4B4B" }}>
            Our service offerings deliver the power of together to help create
            measurable results and lasting impact across industries, sectors,
            and technologies.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl flex flex-col items-start shadow-xl transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "#0B9F94" }}
            >
              <div
                className="flex-shrink-0 mb-4 p-3 rounded-full"
                style={{ backgroundColor: "#00F6FF" }}
              >
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">
                {service.title}
              </h3>
              <p className="mb-6 text-white">{service.description}</p>
              <a
                href="#"
                className="mt-auto flex items-center transition-colors duration-300"
                style={{ color: "#00F6FF" }}
              >
                <span className="font-semibold mr-1">Find out more</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies & Articles */}
      <section>
        <div
          className="w-full py-16 text-center relative bg-cover bg-center"
          style={{
            backgroundImage: `url('https://placehold.co/1920x400/0B9F94/FFFFFF?text=Case+Studies+%26+Articles')`,
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}></div>
          {/* <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold text-white">
            Case Studies & Articles
          </h2> */}
        </div>
        <div className="container mx-auto px-4 py-16">
          <p
            className="text-center max-w-4xl mx-auto mb-12"
            style={{ color: "#4B4B4B" }}
          >
            We take great pride in our work and are delighted to share our case
            studies with you. Collaborating closely with our clients, we drive
            meaningful, positive change—no matter the size of the organisation
            or the cultural challenges encountered. At the core of our approach
            lies a set of values that deeply connect with our clients, guiding
            and inspiring our team in every project we deliver.
          </p>
          <div className="max-w-2xl mx-auto divide-y" style={{ borderColor: "#4B4B4B" }}>
            <div className="py-8">
              <h3 className="text-2xl font-bold mb-4 text-center">ARTICLES</h3>
              <ul className="space-y-4 text-center">
                {articles.map((article, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="transition-colors duration-300"
                      style={{ color: "#0B9F94" }}
                    >
                      {article}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-8">
              <h3 className="text-2xl font-bold mb-4 text-center">
                CASE STUDIES
              </h3>
              <ul className="space-y-4 text-center">
                {caseStudies.map((caseStudy, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="transition-colors duration-300"
                      style={{ color: "#0B9F94" }}
                    >
                      {caseStudy}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystems & Alliances */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div
            className="flex flex-col lg:flex-row items-center rounded-3xl overflow-hidden shadow-xl"
            style={{ backgroundColor: "#0B9F94" }}
          >
            <div className="w-full lg:w-1/2 p-8 lg:p-16 text-white">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Ecosystems and alliances
              </h2>
              <p className="mb-8 text-lg max-w-xl">
                We collaborate with leading tech innovators, helping people
                solve some of the most complex challenges and fuel competitive
                advantage.
              </p>
              <div className="flex items-center mb-6">
                <Handshake
                  className="h-6 w-6 mr-3"
                  style={{ color: "#00F6FF" }}
                />
                <p
                  className="text-xl font-medium"
                  style={{ color: "#00F6FF" }}
                >
                  Trusted relationships. Exponential progress.
                </p>
              </div>
              <button
                className="font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300"
                style={{
                  backgroundColor: "#00F6FF",
                  color: "#000000",
                }}
              >
                Learn more
              </button>
            </div>
            <div className="w-full lg:w-1/2 h-96 lg:h-auto">
              <img
                src="https://placehold.co/800x600/0B9F94/FFFFFF?text=Collaboration"
                alt="Collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
