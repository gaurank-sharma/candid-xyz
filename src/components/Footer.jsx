// import React from 'react';

// // Footer Component
// const Footer = () => {
//   return (
//     <footer className="bg-black text-white py-12 mt-12">
//       <div className="container mx-auto px-4">
//         {/* Main footer content grid */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
//           {/* Column 1: Company Branding */}
//           <div className="md:col-span-1">
//             <h3 className="text-xl font-bold text-white mb-4">Candid HSC</h3>
//             <p className="text-gray-400 text-sm">
//               Empowering healthcare employees with meaningful implementation of digital technology to benefit patient care.
//             </p>
//           </div>

//           {/* Column 2: Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-300 mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li><a href="/" className="hover:text-white transition-colors duration-200 text-gray-400">Home</a></li>
//               <li><a href="/aboutus" className="hover:text-white transition-colors duration-200 text-gray-400">About Us</a></li>
//               <li><a href="/services" className="hover:text-white transition-colors duration-200 text-gray-400">Our Services</a></li>
//               <li><a href="/contact" className="hover:text-white transition-colors duration-200 text-gray-400">Contact</a></li>
//             </ul>
//           </div>

//           {/* Column 3: Resources */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-300 mb-4">Resources</h3>
//             <ul className="space-y-2">
//               <li><a href="case_study" className="hover:text-white transition-colors duration-200 text-gray-400">Case Study s</a></li>
     
//             </ul>
//           </div>

//           {/* Column 4: Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-300 mb-4">Get in Touch</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li>contact@candidhsc.co.uk</li>
//               <li>+44 7448652321</li>
//             </ul>
//           </div>
//         </div>
                
// {/* Bottom bar with copyright and social icons */}
// <div className="border-t border-gray-700 pt-8 flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-col text-center">
//   <div className="text-sm md:text-lg text-gray-400 font-semibold">
//     &copy; {new Date().getFullYear()} Candid HealthSystems Consultants Ltd. All rights reserved.
//   </div>

//   {/* LinkedIn Icon */}
//   <div className="flex justify-center mt-4">
//     <a 
//       href="http://linkedin.com/company/candid-healthsystems-consultants-limited/" 
//       target="_blank" 
//       rel="noopener noreferrer"
//       aria-label="LinkedIn"
//       className="text-gray-400 hover:text-white transition-colors duration-200"
//     >
//       <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
//         <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 
//         5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 
//         5-5v-14c0-2.761-2.238-5-5-5zm-11 
//         19h-3v-11h3v11zm-1.5-12.268c-.966 
//         0-1.75-.79-1.75-1.764s.784-1.764 
//         1.75-1.764 1.75.79 1.75 
//         1.764-.783 1.764-1.75 
//         1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 
//         0v5.604h-3v-11h3v1.765c1.396-2.586 
//         7-2.777 7 2.476v6.759z" clipRule="evenodd" />
//       </svg>
//     </a>
//   </div>

//   {/* Powered by */}
//   <div className="text-sm md:text-lg font-semibold text-white mt-4">
//     Powered by{' '}
//     <a
//       href="https://yuktic.com"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-blue-400 hover:text-blue-300 hover:underline transition duration-200"
//     >
//       yuktic.com
//     </a>
//   </div>
// </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from 'react';

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        {/* Main footer content grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Company Branding */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Candid HSC</h3>
            <p className="text-gray-400 text-sm">
              Empowering healthcare employees with meaningful implementation of digital technology to benefit patient care.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition-colors duration-200 text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/aboutus" className="hover:text-white transition-colors duration-200 text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors duration-200 text-gray-400">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors duration-200 text-gray-400">
                  Contact
                </a>
              </li>

              {/* ✅ New Links Added Below */}
              <li>
                <a href="/privacy" className="hover:text-white transition-colors duration-200 text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors duration-200 text-gray-400">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/case_study" className="hover:text-white transition-colors duration-200 text-gray-400">
                  Case Study
                </a>
              </li>

              <li>
                <a href="/articles" className="hover:text-white transition-colors duration-200 text-gray-400">
                  Articles
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-gray-400">
              <li>contact@candidhsc.co.uk</li>
              <li>+44 7448652321</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-col text-center">
          <div className="text-sm md:text-lg text-gray-400 font-semibold">
            &copy; {new Date().getFullYear()} Candid HealthSystems Consultants Ltd. All rights reserved.
          </div>

          {/* LinkedIn Icon */}
          <div className="flex justify-center mt-4">
            <a
              href="http://linkedin.com/company/candid-healthsystems-consultants-limited/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 
                  5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 
                  5-5v-14c0-2.761-2.238-5-5-5zm-11 
                  19h-3v-11h3v11zm-1.5-12.268c-.966 
                  0-1.75-.79-1.75-1.764s.784-1.764 
                  1.75-1.764 1.75.79 1.75 
                  1.764-.783 1.764-1.75 
                  1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 
                  0v5.604h-3v-11h3v1.765c1.396-2.586 
                  7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Powered by */}
          <div className="text-sm md:text-lg font-semibold text-white mt-4">
            Powered by{' '}
            <a
              href="https://yuktic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline transition duration-200"
            >
              yuktic.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;









