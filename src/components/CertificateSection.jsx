import React from 'react';

const CertificateSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="certifications">
      <div className="container mx-auto px-4">
        
        {/* Section Header (Optional) */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
            ACCREDITATIONS
          </h2>
        </div>

        {/* Certificate Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          
          {/* Left Side: The Image (Badge) */}
          <div className="w-full md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex justify-center items-center relative">
            {/* Decorative background circle */}
            <div className="absolute w-48 h-48 bg-white rounded-full opacity-50 blur-2xl"></div>
            
            {/* REPLACE THIS SRC WITH YOUR UPLOADED IMAGE PATH */}
           <img 
           src="/Certificate.jpeg"
           alt="Citation ISO Certification 9001 and 27001"
           className="absolute inset-0 w-full h-full object-cover"
            />


          </div>

          {/* Right Side: The Content */}
          <div className="w-full md:w-2/3 p-8 md:p-14 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 mb-4">
               <span className="w-2 h-2 rounded-full bg-pink-600 animate-pulse"></span>
               <span className="text-sm font-bold text-pink-600 tracking-widest uppercase">Officially Registered</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-6">
              Integrated Management System
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We are proud to hold the <strong>Citation ISO Certification</strong>. This accreditation validates our rigorous standards in delivering quality services and maintaining the highest level of information security for our clients.
            </p>

            {/* Standards List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Item 1 */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-20">
                <div className="mt-1 min-w-[20px] h-5 rounded-full border-2 border-[var(--color-primary-dark)] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[var(--color-primary-dark)] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">ISO 9001:2015</h4>
                  <p className="text-sm text-gray-500 mt-1">Quality Management System</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-20">
                <div className="mt-1 min-w-[20px] h-5 rounded-full border-2 border-[var(--color-primary-dark)] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[var(--color-primary-dark)] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">ISO 27001:2022</h4>
                  <p className="text-sm text-gray-500 mt-1">Information Security Management</p>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-gray-400 text-sm">
              <span>Certificate No: 500962025</span>
              <span>Registered Member</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
