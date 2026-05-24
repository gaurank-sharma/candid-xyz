import React from "react";
import { motion } from "framer-motion";

function Section({ id, title, children }) {
  return (
    <section id={id} className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-2xl font-semibold mb-4 text-[var(--color-primary-dark)]"
      >
        {title}
      </motion.h2>
      <div className="prose max-w-none text-gray-700">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[32vh] md:h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(/privacy_banner.jpg)' }}
      >
        <div className="absolute inset-0 bg-[var(--color-primary-dark)] opacity-60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Privacy Policy</h1>
          <p className="mt-2 text-sm md:text-base font-light">
            Candid Healthsystems Consultants Ltd.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* Side Navigation */}
        <nav className="sticky top-24 hidden lg:block self-start">
          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="text-sm font-semibold mb-3 text-gray-700">On this page</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#intro" className="hover:text-[var(--color-primary-dark)]">Introduction</a></li>
              <li><a href="#how-we-use" className="hover:text-[var(--color-primary-dark)]">How we use your data</a></li>
              <li><a href="#providing" className="hover:text-[var(--color-primary-dark)]">Providing data to others</a></li>
              <li><a href="#international" className="hover:text-[var(--color-primary-dark)]">International transfers</a></li>
              <li><a href="#retention" className="hover:text-[var(--color-primary-dark)]">Retention & deletion</a></li>
              <li><a href="#rights" className="hover:text-[var(--color-primary-dark)]">Your rights</a></li>
              <li><a href="#security" className="hover:text-[var(--color-primary-dark)]">Data security</a></li>
              <li><a href="#cookies" className="hover:text-[var(--color-primary-dark)]">Cookies</a></li>
              <li><a href="#amendments" className="hover:text-[var(--color-primary-dark)]">Amendments</a></li>
              <li><a href="#details" className="hover:text-[var(--color-primary-dark)]">Our details</a></li>
            </ul>
          </div>
        </nav>

        {/* Content */}
        <main>
          <Section id="intro" title="1. Introduction">
            <p>
              We are committed to safeguarding the privacy of our website visitors and service users.
              This policy explains how we handle your personal data.
            </p>
          </Section>

          <Section id="how-we-use" title="2. How we use your personal data">
            <p>
              We process your personal data for legitimate purposes such as website analytics,
              communication, and service improvement.
            </p>
          </Section>

          <Section id="providing" title="3. Providing your personal data to others">
            <p>
              We may share your data with insurers, advisers, or trusted partners only when necessary
              and always under secure agreements.
            </p>
          </Section>

          <Section id="international" title="4. International transfers">
            <p>
              If data is transferred outside the UK or EEA, we ensure appropriate safeguards are applied
              such as Standard Contractual Clauses.
            </p>
          </Section>

          <Section id="retention" title="5. Retaining and deleting personal data">
            <p>
              We retain data only for as long as required to fulfil the purposes outlined in this policy.
              When no longer necessary, data will be securely deleted.
            </p>
          </Section>

          <Section id="rights" title="6. Your rights">
            <p>
              You have the right to access, rectify, erase, restrict, or object to processing of your data.
              You may also file a complaint with the UK ICO.
            </p>
          </Section>

          <Section id="security" title="7. Data security">
            <p>
              We implement strong technical and organisational measures to prevent unauthorised
              access or misuse of your personal information.
            </p>
          </Section>

          <Section id="cookies" title="8. Cookies">
            <p>
              Our site uses cookies to improve experience and performance. You can manage your cookie
              preferences through your browser settings.
            </p>
          </Section>

          <Section id="amendments" title="9. Amendments">
            <p>
              We may update this Privacy Policy periodically. The latest version will always be available
              on this page.
            </p>
          </Section>

          <Section id="details" title="10. Our details">
            <p>
              Candid Healthsystems Consultants Ltd.<br />
              Registered Office: Flat 18, Chiltern Court, 1 Marri Street, Watford, WD24 5FZ<br />
              Email: contact@candidhsc.co.uk
            </p>
          </Section>
        </main>
      </div>
    </div>
  );
}
