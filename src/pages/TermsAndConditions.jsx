import React from "react";
import { motion } from "framer-motion";

function Section({ id, title, children }) {
  return (
    <section id={id} className="mb-10">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-2xl font-semibold mb-3 text-[var(--color-primary-dark)]"
      >
        {title}
      </motion.h2>
      <div className="text-gray-700">{children}</div>
    </section>
  );
}

export default function TermsAndConditions() {
  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[30vh] md:h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(/terms_banner.jpg)' }}
      >
        <div className="absolute inset-0 bg-[var(--color-primary-dark)] opacity-60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Terms & Conditions</h1>
          <p className="mt-2 text-sm md:text-base font-light">
            Candid Healthsystems Consultants Ltd.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-gray-700 mb-6">
            By using our website, you agree to the terms outlined below. Please review carefully before
            continuing to use our services.
          </p>

          <Section id="use" title="1. Use of the Website">
            <p>
              You agree to use this website only for lawful purposes and not in a manner that may cause
              damage or impair availability of the site.
            </p>
          </Section>

          <Section id="intellectual" title="2. Intellectual Property">
            <p>
              All website content including logos, text, and graphics are owned by Candid Healthsystems
              Consultants Ltd. and protected by copyright laws.
            </p>
          </Section>

          <Section id="liability" title="3. Limitation of Liability">
            <p>
              We make reasonable efforts to ensure accuracy but assume no responsibility for errors or
              omissions. Use of our site is at your own risk.
            </p>
          </Section>

          <Section id="thirdparty" title="4. Third-Party Links">
            <p>
              Our website may link to external sites we do not control. We are not responsible for their
              content or privacy practices.
            </p>
          </Section>

          <Section id="governing" title="5. Governing Law">
            <p>
              These Terms are governed by the laws of England and Wales. Any disputes will be handled
              in the courts of England and Wales.
            </p>
          </Section>

          <Section id="contact" title="6. Contact">
            <p>
              For questions regarding these Terms, contact us at contact@candidhsc.co.uk or via
              the details in our Privacy Policy.
            </p>
          </Section>
        </motion.div>
      </div>
    </div>
  );
}
