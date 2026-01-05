
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
// import { getCases } from '../utils/api'; // Ensure path is correct

// const case StudiesOfImpactSection = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // 1. Fetch Data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getCases();
//         // Optional: Filter only posts that have images or specific tags if needed
//         setPosts(data || []);
//       } catch (err) {
//         console.error("Failed to fetch case studies:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // 2. Auto-Play Slider Logic
//   useEffect(() => {
//     if (posts.length <= 1) return;
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 6000); // Change slide every 6 seconds
//     return () => clearInterval(interval);
//   }, [currentIndex, posts.length]);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
//   };

//   // 3. HTML Stripper Helper
//   const getExcerpt = (sections) => {
//     if (!sections || !sections[0] || !sections[0].text) return "Explore our latest case study showing real outcomes and impacts.";
    
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = sections[0].text;
//     const plainText = tempDiv.textContent || tempDiv.innerText || "";
    
//     return plainText.length > 180 ? plainText.substring(0, 180) + "..." : plainText;
//   };

//   if (loading) return <div className="h-96 flex items-center justify-center">Loading Impact case Studies...</div>;
//   if (posts.length === 0) return null; // Don't show section if no data

//   const currentPost = posts[currentIndex];

//   return (
//     <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
//             case Studies of Impact
//           </h2>
//           <p className="text-gray-500 mt-2">Real results transforming healthcare and society</p>
//         </div>

//         {/* Main Carousel Container */}
//         <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 min-h-[500px] md:min-h-[450px] flex items-center">
          
//           {/* Navigation Buttons (Absolute) */}
//           {posts.length > 1 && (
//             <>
//               <button 
//                 onClick={prevSlide}
//                 className="absolute left-2 md:left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-md backdrop-blur-sm transition-all text-[var(--color-primary-dark)]"
//               >
//                 <ChevronLeft size={24} />
//               </button>
//               <button 
//                 onClick={nextSlide}
//                 className="absolute right-2 md:right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-md backdrop-blur-sm transition-all text-[var(--color-primary-dark)]"
//               >
//                 <ChevronRight size={24} />
//               </button>
//             </>
//           )}

//           <div className="w-full h-full">
//             <AnimatePresence mode='wait'>
//               <motion.div
//                 key={currentPost._id}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.5, ease: "easeInOut" }}
//                 className="flex flex-col md:flex-row h-full"
//               >
                
//                 {/* Left: Image Section */}
//                 <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-gray-100">
//                    <img
//                     src={currentPost.heroImage || "https://via.placeholder.com/800x600?text=Case+Study"}
//                     alt={currentPost.title}
//                     className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
//                     onError={(e) => { 
//                       e.target.onerror = null; 
//                       e.target.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=No+Image"; 
//                     }}
//                   />
//                   {/* Overlay Gradient for text readability on mobile if needed */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
//                 </div>

//                 {/* Right: Content Section */}
//                 <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left bg-white relative">
//                   {/* Decorative Tag */}
//                   <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-700 text-xs font-bold tracking-wide uppercase mb-4 w-fit">
//                     Case Study
//                   </span>

//                   <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-4 leading-tight">
//                     {currentPost.title}
//                   </h3>

//                   <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
//                     {getExcerpt(currentPost.sections)}
//                   </p>

//                   {/* Dynamic Link Button */}
//                   <Link 
//                     to={`/case-study/${currentPost.slug}`}
//                     className="inline-flex items-center gap-2 bg-[var(--color-secondary)] text-[var(--color-primary-dark)] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-fit group"
//                   >
//                     Read Full Case Study
//                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                   </Link>
//                 </div>

//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Dot Indicators */}
//         {posts.length > 1 && (
//           <div className="flex justify-center gap-2 mt-8">
//             {posts.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`h-2 rounded-full transition-all duration-300 ${
//                   index === currentIndex 
//                     ? "w-8 bg-[var(--color-primary-dark)]" 
//                     : "w-2 bg-gray-300 hover:bg-gray-400"
//                 }`}
//               />
//             ))}
//           </div>
//         )}
        
//       </div>
//     </section>
//   );
// };

// export default case StudiesOfImpactSection;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getCases } from '../utils/api'; 

const StoriesOfImpactSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCases();
        setPosts(data || []);
      } catch (err) {
        console.error("Failed to fetch case studies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (posts.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, posts.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const getExcerpt = (sections) => {
    if (!sections || !sections[0] || !sections[0].text) return "Explore our latest case study showing real outcomes and impacts.";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = sections[0].text;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    return plainText.length > 180 ? plainText.substring(0, 180) + "..." : plainText;
  };

  if (loading) return <div className="h-96 flex items-center justify-center">Loading Impact Case Studies...</div>;
  if (posts.length === 0) return null; 

  const currentPost = posts[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
           Our Ima
          </h2>
          <p className="text-gray-500 mt-2">Real results transforming healthcare and society</p>
        </div>

        {/* FIXED CONTAINER HEIGHT: 
           Added 'md:h-[500px]' to force a fixed height on desktop.
           This prevents the box from jumping size based on image/text content.
        */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row md:h-[500px]">
          
          {/* Navigation Buttons */}
          {posts.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                // Fixed position over image for mobile (top-32), vertically centered for desktop (top-1/2)
                className="absolute left-2 md:left-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all text-[var(--color-primary-dark)] transform -translate-y-1/2 top-32 md:top-1/2"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 md:right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all text-[var(--color-primary-dark)] transform -translate-y-1/2 top-32 md:top-1/2"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="w-full h-full">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentPost._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row h-full w-full"
              >
                
                {/* FIXED IMAGE SECTION 
                   1. 'md:w-1/2' = Takes exactly half width on desktop.
                   2. 'h-64 md:h-full' = Fixed height on mobile, Full height on desktop.
                   3. 'relative' = Allows the inner image to be absolute.
                */}
                <div className="w-full md:w-1/2 h-64 md:h-full relative bg-gray-200 shrink-0">
                   <img
                    src={currentPost.heroImage || "https://via.placeholder.com/800x600?text=Case+Study"}
                    alt={currentPost.title}
                    // 4. 'absolute inset-0' = Forces image to fill the container exactly.
                    // 5. 'object-cover' = Crops image to fit without stretching.
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=No+Image"; 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left bg-white relative">
                  <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-700 text-xs font-bold tracking-wide uppercase mb-4 w-fit">
                    Case Study
                  </span>

                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-4 leading-tight line-clamp-2">
                    {currentPost.title}
                  </h3>

                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 line-clamp-4">
                    {getExcerpt(currentPost.sections)}
                  </p>

                  <Link 
                    to={`/case-study/${currentPost.slug}`}
                    className="inline-flex items-center gap-2 bg-[var(--color-secondary)] text-[var(--color-primary-dark)] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-fit group"
                  >
                    Read Full Case Study
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot Indicators */}
        {posts.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-[var(--color-primary-dark)]" 
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
};


export default StoriesOfImpactSection;

