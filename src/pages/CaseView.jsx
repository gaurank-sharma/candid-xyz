// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// // --- MODIFIED: Use getCase and getCases ---
// import { getCase, getCases } from "../utils/api";

// // --- MODIFIED: Renamed component ---
// export default function CaseView() {
//   const { slug } = useParams();
//   const [post, setPost] = useState(null); // 'post' variable is fine, or rename to 'caseItem'
//   const [otherPosts, setOtherPosts] = useState([]); // 'otherPosts' is fine, or rename to 'otherCases'

//   useEffect(() => {
//     // --- MODIFIED: Use getCase and getCases ---
//     getCase(slug).then(setPost);
//     getCases().then(setOtherPosts);
//   }, [slug]);

//   if (!post) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Hero */}
//       <div
//         className="relative h-[250px] md:h-[600px] w-full bg-cover bg-center "
//         style={{ backgroundImage: `url(${post.heroImage})` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to from-black/70 to-transparent  flex items-center justify-center p-[14%] md:p-[12%]">
//           <h1 className="text-white text-2xl md:text-5xl font-bold">
//             {post.title}
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Main Content */}
//         <div className="lg:col-span-3 space-y-10">
//           <div className="flex items-center gap-4 text-gray-600 text-sm md:text-xl">
//             {/* You can update this logic if you store author name */}
//             <span>👤 Candid Team</span>
//             <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
//           </div>

//           {post.sections.map((section, idx) => (
//             <div
//               key={idx}
//               className={`flex flex-col md:flex-row gap-6 ${
//                 idx % 2 === 1 ? "md:flex-row-reverse" : ""
//               }`}
//             >
//               {section.image && (
//                 <>
//                   <img
//                     src={section.image}
//                     alt="Section"
//                     className="w-full md:w-[350px] h-[210px] md:h-[290px] object-fit rounded-lg shadow-lg"
//                   />
//                 </>
//               )}

//              <div
//                 className="prose prose-lg max-w-none items-center text-justify"
//                 dangerouslySetInnerHTML={{ __html: section.text }}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Sidebar */}
//         <aside className="space-y-6 lg:col-span-1">
//           {/* --- MODIFIED: Title --- */}
//           <h2 className="text-xl font-bold">Read More Case Studies</h2>
//           {otherPosts
//             .filter((ob) => ob.slug !== post.slug)
//             .map((ob) => (
//               <div
//               key={ob._id}
//             className="bg-white rounded-xl shadow-md overflow-hidden"
//               >
//                 {ob.heroImage && (
//                   <img
//                     src={ob.heroImage}
//                     alt={ob.title}
//                     className="h-40 w-full object-fit"
//               />
//                 )}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-lg">{ob.title}</h3>
//                     {/* --- MODIFIED: Link to /case-study/slug --- */}
//                   <Link
//                     to={`/case-study/${ob.slug}`}
//                     className="text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 rounded-lg inline-block mt-3"
//                   >
//                     Read More →
//                   </Link>
//            </div>
//               </div>
//             ))}
//         </aside>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCase, getCases } from "../utils/api"; // Imports now work with the file above
import { Calendar, User, ArrowLeft } from "lucide-react";

export default function CaseView() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch current case
    getCase(slug)
      .then((data) => {
        setPost(data);
        // Fetch others for the sidebar
        return getCases();
      })
      .then((allCases) => {
        setOtherPosts(allCases || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Case Study Not Found</h2>
        <Link to="/case_study" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to All Cases
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero */}
      <div
        className="relative h-[300px] md:h-[500px] w-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${post.heroImage || 'https://via.placeholder.com/1200x600'})` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent flex items-center justify-center p-6 text-center">
          <div className="max-w-4xl">
             <Link to="/case_study" className="text-white/80 hover:text-white text-sm font-bold uppercase tracking-wider mb-4 inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Stories
             </Link>
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12 pb-20">
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm md:text-base border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-600" />
              <span className="font-medium text-gray-700">Candid Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-blue-600" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Sections */}
          {post.sections?.map((section, idx) => {
             // Zig-zag logic: Image right on even index, left on odd
             const isImageRight = section.layout 
               ? section.layout === "image-right" 
               : idx % 2 === 0;

             return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row gap-8 md:gap-12 items-start ${
                  !isImageRight ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Column */}
           {/* Image Column */}
{section.image && (
  <div className="w-full md:w-[45%] shrink-0">
    <img
      src={section.image}
      alt={`Section ${idx + 1}`}
      // FIX 1: Removed 'md:h-[300px]' so the image can grow naturally
      // FIX 2: Changed 'object-cover' to 'object-contain'
      // FIX 3: Added 'border' to frame white screenshots against the white page
      className="w-full h-auto object-contain rounded-xl shadow-md border border-gray-200"
    />
  </div>
)}

                {/* Text Column */}
                <div className={`flex-1 w-full ${!section.image ? 'md:w-full' : ''}`}>
                  <div
                    // --- BULLET FIXES APPLIED HERE ---
                    className="prose prose-lg max-w-none text-gray-700 text-justify [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-5 [&_ul]:pl-5 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: section.text }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
              More Case Studies
            </h2>
            
            <div className="space-y-6">
              {otherPosts
                .filter((ob) => ob.slug !== post.slug)
                .slice(0, 3) // Limit to 3 items
                .map((ob) => (
                  <div key={ob._id} className="group">
                    <div className="rounded-xl overflow-hidden mb-3 h-32 w-full">
                      <img
                        src={ob.heroImage || "https://via.placeholder.com/300x200"}
                        alt={ob.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                      {ob.title}
                    </h3>
                    <Link
                      to={`/case-study/${ob.slug}`}
                      className="text-sm font-bold text-blue-600 hover:underline inline-flex items-center"
                    >
                      Read Story &rarr;
                    </Link>
                  </div>
                ))}
                
                {otherPosts.filter(ob => ob.slug !== post.slug).length === 0 && (
                  <p className="text-gray-500 text-sm italic">No other stories available yet.</p>
                )}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
