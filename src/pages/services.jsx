import React from "react";
import { motion } from "framer-motion";

// Card Component
const ServiceCard = ({ logo, title, description, tags }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow relative"
  >
    {/* Logo Letter */}
    <div className="absolute top-6 left-6 text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary-light)] opacity-40">
      {logo}
    </div>

    {/* Content */}
    <h3 className="text-xl font-semibold mb-3 relative z-10 mt-12 pt-12">{title}</h3>
    <div className="flex flex-wrap gap-2 mb-4 relative z-10">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600"
        >
          {tag}
        </span>
      ))}
    </div>
    <p className="text-gray-600 relative z-10">{description}</p>
  </motion.div>
);

// Data
const eprServices = [
  {
    logo: "E",
    title: "EPR Implementation Strategy",
    tags: ["planning", "roadmap", "execution"],
    description:
      "We define a step-by-step EPR implementation roadmap tailored to your business. From requirement gathering to deployment, we ensure alignment with company goals, risk reduction, and measurable success. This strategy helps organizations transform their operations smoothly and efficiently."
  },
  {
    logo: "T",
    title: "Testing",
    tags: ["unit tests", "integration", "validation"],
    description:
      "EPR testing covers all modules, integrations, and performance checks. We simulate real-world workflows, validate data accuracy, and guarantee that your EPR system runs smoothly before going live, reducing costly downtime and risks post-deployment."
  },
  {
    logo: "A",
    title: "Application Staff Augmentation",
    tags: ["skilled experts", "on-demand", "scalable"],
    description:
      "We provide experienced EPR specialists to strengthen your in-house teams. Whether short-term or long-term, our experts bring deep functional and technical knowledge, accelerating project delivery while reducing hiring costs."
  },
  {
    logo: "C",
    title: "Command Center Support",
    tags: ["24/7 monitoring", "incident response", "stability"],
    description:
      "Our EPR command center ensures round-the-clock monitoring, incident management, and issue resolution. This proactive approach minimizes disruptions, ensures business continuity, and improves user satisfaction with system stability."
  },
  {
    logo: "P",
    title: "Projects & Resource Planning",
    tags: ["resource allocation", "efficiency", "scheduling"],
    description:
      "We manage EPR projects with precise resource planning, timelines, and budgets. By leveraging advanced tools, we ensure efficient allocation, reduced bottlenecks, and seamless collaboration across teams for faster delivery."
  },
  {
    logo: "T",
    title: "Training",
    tags: ["end-user", "administration", "adoption"],
    description:
      "Our tailored EPR training programs equip both end-users and administrators with essential skills. This ensures maximum adoption, reduces errors, and empowers employees to use EPR tools effectively in daily workflows."
  },
  {
    logo: "G",
    title: "Go Live / Activation",
    tags: ["transition", "support", "risk-free"],
    description:
      "We provide end-to-end support during EPR activation. Our experts ensure a seamless transition from testing to live usage, minimizing disruptions, and offering hyper-care support during the critical first weeks of launch."
  },
  {
    logo: "D",
    title: "Data Strategy & Migration",
    tags: ["secure transfer", "accuracy", "compliance"],
    description:
      "We design data migration strategies that ensure secure, accurate, and compliant transfer to EPR systems. Our methodology reduces errors, maintains integrity, and prepares your data for analytics and decision-making."
  }
];

const appServices = [
  {
    logo: "S",
    title: "System Upgrades",
    tags: ["latest features", "security", "performance"],
    description:
      "Our upgrade services ensure your applications stay current with the latest EPR versions, feature updates, and compliance requirements. This prevents security risks, improves performance, and allows your business to leverage new functionalities seamlessly."
  },
  {
    logo: "S",
    title: "System Enhancements",
    tags: ["custom features", "improvements", "scalability"],
    description:
      "We enhance applications by adding custom features, improving existing modules, and scaling performance. These enhancements are designed to address evolving business needs and ensure long-term system value."
  },
  {
    logo: "S",
    title: "Service Improvement / Re-engineering",
    tags: ["optimization", "cost reduction", "workflow"],
    description:
      "Re-engineer applications to optimize business processes. We remove inefficiencies, integrate automation, and restructure workflows to reduce costs, enhance productivity, and create sustainable value for your organization."
  },
  {
    logo: "T",
    title: "Targeted Projects",
    tags: ["short-term", "custom", "focused"],
    description:
      "Our teams deliver targeted EPR and application projects that address specific challenges. These short-term, high-impact projects help organizations gain quick wins, accelerate transformations, and resolve bottlenecks efficiently."
  },
  {
    logo: "S",
    title: "Staff Augmentation",
    tags: ["expertise", "on-demand", "scalable teams"],
    description:
      "We supply skilled EPR and application experts on-demand. Whether filling a temporary gap or scaling teams for large projects, our augmentation services ensure flexibility, expertise, and faster project outcomes."
  }
];

// Main Component
export default function ServicesPage() {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
    <section
  className="py-20 text-center bg-[url('/Future_Health.jpeg')] bg-cover bg-center relative"
>
  {/* Overlay for better text visibility */}
  <div className="absolute inset-0 bg-[var(--color-primary-dark)] opacity-50"></div>

  <div className="relative z-10">
    <h2 className="text-[var(--color-primary-light)] uppercase tracking-wide font-semibold">
      Supporting health-care teams
    </h2>
    <h1 className="text-4xl font-bold mt-3 text-white">Our Services</h1>
  </div>
</section>


      {/* EPR Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">
          EPR Implementation Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eprServices.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>
      </section>

      {/* Application Services Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Application Management Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appServices.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
  
    <section className="relative bg-[var(--color-primary-dark)] overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto px-6">
        {/* Grid layout for two columns on desktop, stacking on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 items-center">
          
          {/* Column 1: Text Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Let’s Connect!
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Let Candid transform your organization with tools designed to help health-care professionals. Contact us today to learn more about our tailored training and support.
            </p>
            <div className="mt-10">
              <a
                href="/contact"
                className="inline-block rounded-md bg-black px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-transform duration-300 ease-in-out hover:scale-105"
              >
                Contact Us →
              </a>
            </div>
          </div>

          {/* Column 2: Image */}
          <div className="flex justify-center">
            <img
              src="https://callcentertech.net/wp-content/uploads/healthcare-call-center.jpg"
              alt="Healthcare professionals collaborating"
              className="w-full max-w-md rounded-2xl shadow-xl"
            />
          </div>

        </div>
      </div>
    
    </section>
    </div>
  );

}
