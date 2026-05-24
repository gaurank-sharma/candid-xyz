import React from 'react';

const CertificateSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="certifications">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
           OUR CERTIFICATION
          </h2>
          <div className="w-24 h-1 bg-[#E4007C] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Certificate Card */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row relative">
          
          {/* 1. Left Side: The Badge Image 
              (Wider container to fit the horizontal badge) */}
          <div className="w-full lg:w-5/12 bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden">
             {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E4007C] rounded-full opacity-5 blur-3xl"></div>
            
            {/* Badge Image */}
            <img 
              src="/Certificate.png" 
              alt="Citation ISO Certification - Integrated Management System"
              className="relative w-full h-auto object-contain drop-shadow-sm z-10"
            />
          </div>

          {/* 2. Middle: Content */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center border-l border-gray-50">
            
            <div className="mb-2">
               <span className="text-[#E4007C] font-bold tracking-wider text-sm uppercase">Official Certification</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Integrated Management System
            </h3>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We are officially registered with <strong>Citation ISO Certification</strong>. This dual accreditation demonstrates our commitment to quality management and information security excellence.
            </p>

            {/* Standards Grid - Styled to match the badge text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ISO 9001 */}
              <div className="flex flex-col p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-[#E4007C] transition-all duration-300">
                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Quality</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">ISO 9001</span>
                  <span className="text-[#E4007C] font-bold">: 2015</span>
                </div>
              </div>

              {/* ISO 27001 */}
              <div className="flex flex-col p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-[#E4007C] transition-all duration-300">
                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Security</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">ISO 27001</span>
                  <span className="text-[#E4007C] font-bold">: 2022</span>
                </div>
              </div>
            </div>

            {/* Certificate Number */}
             <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400 font-mono">
              Certificate No: 500962025
            </div>
          </div>

          {/* 3. Right Side: The "Registered" Strip 
              (Vertical on Desktop, Bottom on Mobile to match badge style) */}
          <div className="bg-[#E4007C] text-white flex items-center justify-center p-4 lg:w-16 lg:py-0 relative overflow-hidden">
             {/* Desktop Vertical Text */}
             <div className="hidden lg:block transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>
                <span className="font-bold tracking-[0.3em] text-lg whitespace-nowrap">REGISTERED</span>
             </div>
             
             {/* Mobile Horizontal Text */}
             <div className="block lg:hidden w-full text-center">
                <span className="font-bold tracking-[0.2em] text-lg uppercase">REGISTERED</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
