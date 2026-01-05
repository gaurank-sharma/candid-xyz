import React from 'react';

const CertificateSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="certifications">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            ACCREDITATIONS
          </h2>
          <div className="w-24 h-1 bg-[#CF0072] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Certificate Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row relative">
          
          {/* Left Side: The Image */}
          <div className="w-full md:w-1/3 h-[400px] md:h-auto bg-gray-100 relative flex items-center justify-center p-6">
            {/* Decorative background blur */}
            <div className="absolute w-40 h-40 bg-[#CF0072] rounded-full opacity-10 blur-3xl"></div>
            
            {/* Certificate Image */}
            <img 
              src="/Certificate.png"
              alt="Citation ISO Certification 9001 and 27001"
              className="relative w-full h-full object-contain z-10 drop-shadow-md"
            />
          </div>

          {/* Right Side: The Content */}
          <div className="w-full md:w-2/3 flex flex-col">
            
            <div className="p-8 md:p-12 flex-grow">
              {/* Header Text */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Integrated Management System
              </h3>
              <p className="text-gray-500 font-medium mb-6 uppercase tracking-wide text-sm">
                Citation ISO Certification
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We are proud to hold the <strong>Citation ISO Certification</strong>. This accreditation validates our rigorous standards in delivering quality services and maintaining the highest level of information security for our clients.
              </p>

              {/* Standards List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* ISO 9001 */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#CF0072] transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#CF0072] bg-opacity-10 flex items-center justify-center text-[#CF0072] font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">ISO 9001</h4>
                    <span className="text-[#CF0072] font-bold text-sm">2015</span>
                    <p className="text-xs text-gray-500 mt-1">Quality Management</p>
                  </div>
                </div>

                {/* ISO 27001 */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#CF0072] transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#CF0072] bg-opacity-10 flex items-center justify-center text-[#CF0072] font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">ISO 27001</h4>
                    <span className="text-[#CF0072] font-bold text-sm">2022</span>
                    <p className="text-xs text-gray-500 mt-1">Info Security</p>
                  </div>
                </div>

              </div>
            </div>

            {/* "Registered" Footer Bar (Matches the badge style) */}
            <div className="bg-[#CF0072] text-white p-4 px-8 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span className="font-bold tracking-[0.2em] text-lg uppercase">Registered</span>
              <span className="text-white/90 text-sm font-mono bg-white/20 px-3 py-1 rounded">
                Certificate No: 500962025
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
