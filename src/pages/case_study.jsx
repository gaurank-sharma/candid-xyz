
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getCases } from "../utils/api";
// import { Calendar } from "lucide-react"; // Optional: for icons

// export default function Blog() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     getCases()
//       .then(setPosts)
//       .catch(err => console.error("Failed to fetch posts:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   // This function is updated to strip HTML tags before creating the excerpt.
//   const createExcerpt = (sections) => {
//     if (!sections || sections.length === 0 || !sections[0].text) {
//       return "No content available.";
//     }

//     const htmlContent = sections[0].text;

//     // Use the browser's built-in tools to safely convert HTML to plain text
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = htmlContent;
//     const plainText = tempDiv.textContent || tempDiv.innerText || "";

//     // Now, create the excerpt from the clean plain text
//     if (plainText.length > 100) {
//       return plainText.substring(0, 100) + "...";
//     }
//     return plainText;
//   };
 

//   return (
//     <div className="bg-slate-50 min-h-screen">
//        <div
//         className="relative h-[250px] md:h-96 w-full bg-cover bg-center"
//         style={{
//           backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')`,
//         }}
//       >
//        <div className="absolute inset-0 bg-[var(--color-primary-dark)] opacity-60"></div>
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
//           <div className="text-sm md:text-xl font-light mb-2">
//             Real Stories, Real Outcomes 
//           </div>
//           <h1 className="text-4xl md:text-6xl font-serif font-bold px-4">
//            CASE STUDIES
//           </h1>
//         </div>
//       </div>
//       {/* --- Latest Posts Section --- */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
//           Latest Posts
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-600">Loading posts...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {posts.map((post) => (
//               <Link
//                 to={`/case-study/${post.slug}`}
//                 key={post._id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300"
//               >
//                 {/* Post Image */}
//                 <div className="h-40 md:h-56 w-full overflow-hidden">
//                   <img
//                     src={post.heroImage || 'https://via.placeholder.com/400x300'}
//                     alt={post.title}
//                     className="h-full w-full object-fit group-hover:scale-110 transition-transform duration-500"
//                   />
//                 </div>

//                 {/* Post Content */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-800 mb-2 truncate group-hover:text-teal-600">
//                     {post.title}
//                   </h3>
                  
//                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
//                     <Calendar size={14} />
//                     <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                   </div>

//                   <p className="text-gray-600 text-sm leading-relaxed mb-4">
//                     {createExcerpt(post.sections)}
//                   </p>
                  
//                   <span className="font-semibold text-teal-600 group-hover:underline">
//                     Read More →
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}

//         {!loading && posts.length === 0 && (
//           <p className="text-center text-gray-600 mt-8">No posts found.</p>
//         )}
//       </div>
//     </div>
//   );

// }




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCases } from "../utils/api"; // Ensure this imports your case API
import { Calendar, ArrowRight } from "lucide-react";

export default function CaseStudies() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // 1. Fetching Cases instead of Posts
    getCases()
      .then((data) => {
        setCases(data || []);
      })
      .catch((err) => console.error("Failed to fetch cases:", err))
      .finally(() => setLoading(false));
  }, []);

  // Helper to strip HTML tags for the preview text
  const createExcerpt = (sections) => {
    if (!sections || sections.length === 0 || !sections[0].text) {
      return "Explore this transformation story...";
    }

    const htmlContent = sections[0].text;
    
    // Create a temporary element to strip HTML tags
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    if (plainText.length > 120) {
      return plainText.substring(0, 120) + "...";
    }
    return plainText;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* --- Hero Section --- */}
      <div
        className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center"
        style={{
          // Professional/Business oriented background image
          backgroundImage: `url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop')`,
        }}
      >
     <div className="absolute inset-0 bg-[var(--color-primary-dark)] opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <div className="text-sm md:text-xl font-light mb-3 tracking-widest uppercase text-blue-200">
            Proven Success
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">
            CASE STUDIES
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl font-light">
            Deep dives into how we've helped organizations transform their digital infrastructure.
          </p>
        </div>
      </div>

      {/* --- Grid Section --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((item) => (
  <Link
    to={`/case-study/${item.slug}`}
    key={item._id}
    className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden group transition-all duration-300 border border-slate-100 flex flex-col h-full"
  >
    {/* --- IMAGE FIX START --- */}
    {/* Changed background to gray-50 to frame the image nicely */}
    <div className="h-56 w-full overflow-hidden relative bg-gray-50 flex items-center justify-center border-b border-gray-100">
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 duration-500" />
      <img
        src={item.heroImage || 'https://via.placeholder.com/600x400?text=Case+Study'}
        alt={item.title}
        // CHANGED: 'object-cover' -> 'object-contain'
        // ADDED: 'p-4' (padding) so the image doesn't touch the edges
        className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
      />
    </div>
    {/* --- IMAGE FIX END --- */}

    {/* Content Wrapper */}
    <div className="p-8 flex flex-col flex-grow">
      <div className="mb-4">
        <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-teal-100">
          Case Study
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-teal-600 transition-colors">
        {item.title}
      </h3>
      
      <div className="flex items-center gap-2 text-gray-400 text-xs mb-5">
        <Calendar size={14} />
        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
        {createExcerpt(item.sections)}
      </p>
      
      <div className="flex items-center text-teal-600 font-bold text-sm group/link mt-auto">
        Read Full Story 
        <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
))}
          </div>
        )}

        {!loading && cases.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
            <h3 className="text-xl text-gray-500 font-medium">No case studies published yet.</h3>
            <p className="text-gray-400 mt-2">Check back soon for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}



