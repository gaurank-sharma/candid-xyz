import React from 'react';

// Contact Card Component
const ContactCard = ({ name, title, email, phone, image }) => {
  return (
    <div className="bg-secondary p-6 rounded-lg shadow-md flex items-center space-x-6">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/100x100/F0F8FF/000000?text=User";
        }}
      />
      <div>
        <h3 className="text-xl font-semibold text-primary mb-1 rounded-md">{name}</h3>
        <p className="text-all text-sm mb-2 rounded-md">{title}</p>
        <p className="text-primary text-sm mb-1 rounded-md">
          <a href={`mailto:${email}`} className="hover:underline">{email}</a>
        </p>
        <p className="text-all text-sm rounded-md">
          <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
        </p>
        <a
          href="#"
          className="mt-3 inline-block text-primary hover:text-all transition-colors duration-200 rounded-md"
        >
          {/* LinkedIn Icon */}
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

// Get in Touch Section
const GetInTouchSection = () => {
  const contacts = [
    {
      name: "Vicky Levy",
      title: "Deloitte Global Life Sciences & Health Care Industry Leader",
      email: "vlevy@deloitte.com",
      phone: "+1 617 437 3325",
      image: "https://placehold.co/100x100/F0F8FF/000000?text=VL"
    },
    {
      name: "Sara Siegel",
      title: "Deloitte Global Health & Human Services Sector Leader",
      email: "sarasiege@deloitte.co.uk",
      phone: "+44 (0)20 7007 7908",
      image: "https://placehold.co/100x100/F0F8FF/000000?text=SS"
    }
  ];

  return (
    <section
      id="get-in-touch"
      className="py-16 md:py-24 bg-white rounded-lg shadow-lg mx-4 md:mx-auto my-8"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 rounded-md">
          Get in touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contacts.map((contact, index) => (
            <ContactCard key={index} {...contact} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
