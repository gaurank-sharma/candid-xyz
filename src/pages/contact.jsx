import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("https://candid-backend.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(" Message sent successfully!");
        setFormData({ name: "", email: "", telephone: "", message: "" });
      } else {
        setStatus(`❌ ${data.msg || "Something went wrong"}`);
      }
    } catch (err) {
      setStatus("❌ Server error. Try again later.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[40vh] md:h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url(/aboutus_candid.jpg)" }}
      >
        <div className="absolute inset-0 bg-[var(--color-primary-dark)] opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <div className="text-sm md:text-base font-light mb-2">
            CONNECT WITH US
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold px-4">
            Candid HealthCare
          </h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel */}
            <div className="bg-[var(--color-primary-dark)] text-white p-8 rounded-lg lg:w-1/3 flex flex-col justify-center">
              <h2 className="text-3xl font-serif font-bold mb-4">
                We're looking forward to your visit!
              </h2>
              <div className="space-y-4">
                <p>
                  Office 120.3 Regus, Cardinal Point, Park Road, Rickmansworth,
                  WD3 1RE
                </p>
              </div>
            </div>

            {/* Right Panel - Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md lg:w-2/3">
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">
                Contact Our Team Today!
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#62377a]"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#62377a]"
                    required
                  />
                </div>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#62377a]"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#62377a]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[var(--color-primary-dark)] text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                >
                  Send
                </button>
              </form>

              {status && (
                <p className="mt-4 text-center text-sm text-gray-700">
                  {status}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
    <section className="w-full h-[50vh]">
  <iframe
    title="Our Office Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2474.65178192738!2d-0.4769!3d51.6382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766d79d47eab3d%3A0xf2e42b64e55c1ed!2sRegus%20-%20Rickmansworth%2C%20Cardinal%20Point!5e0!3m2!1sen!2suk!4v1695483112345!5m2!1sen!2suk"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</section>
    </>
  );
};

export default ContactPage;


