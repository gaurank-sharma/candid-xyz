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




import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCase, getCases } from "../utils/api";
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

const getReadingTime = (sections) => {
  const div = document.createElement("div");
  div.innerHTML = (sections || []).map((s) => s.text || "").join(" ");
  const words = (div.textContent || "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const FALLBACK =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop";

export default function CaseView() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getCase(slug)
      .then((data) => {
        setPost(data);
        return getCases();
      })
      .then((all) => setOtherPosts(all || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-400 tracking-widest uppercase">
            Loading
          </span>
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-3">
            Case Study Not Found
          </h2>
          <Link
            to="/case_study"
            className="text-blue-600 hover:underline text-sm"
          >
            Back to All Cases
          </Link>
        </div>
      </div>
    );

  const related = otherPosts.filter((p) => p.slug !== post.slug).slice(0, 4);
  const continueReading = otherPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const tocItems = (post.sections || [])
    .map((s, idx) => {
      const match = s.text.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/);
      const heading = match ? match[1].replace(/<[^>]+>/g, "").trim() : null;
      return heading ? { idx, heading } : null;
    })
    .filter(Boolean);

  return (
    <div className="bg-white min-h-screen">
      {/* ── Reading Progress Bar ── */}
      <div
        className="fixed top-0 left-0 z-[999] h-[2px] bg-blue-500 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />

      {/* ── Cinematic Hero ── */}
      <div
        className="relative h-[320px] md:h-[580px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${post.heroImage || FALLBACK})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

        {/* Breadcrumb */}
        <div className="relative z-10 pt-6 px-6 md:px-14">
          <nav className="flex items-center gap-1.5 text-white/45 text-xs uppercase tracking-widest font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={11} />
            <Link
              to="/case_study"
              className="hover:text-white transition-colors"
            >
              Case Studies
            </Link>
            <ChevronRight size={11} />
            <span className="text-white/70 line-clamp-1 max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-10 max-w-5xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 border border-blue-400/40 rounded px-2 py-0.5">
              Case Study
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/50 text-xs mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {formattedDate}
            </span>
            <span className="text-white/25">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {getReadingTime(post.sections)} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-16">
        {/* Main content */}
        <article>
          {/* Report metadata bar */}
          <div className="grid grid-cols-3 gap-px bg-blue-100 rounded-2xl overflow-hidden mb-10 border border-blue-100">
            <div className="bg-white px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-blue-500 mb-1">Author</p>
              <p className="text-sm font-semibold text-gray-900">Candid Team</p>
            </div>
            <div className="bg-white px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-blue-500 mb-1">Published</p>
              <p className="text-sm font-semibold text-gray-900">{formattedDate}</p>
            </div>
            <div className="bg-white px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-blue-500 mb-1">Read Time</p>
              <p className="text-sm font-semibold text-gray-900">{getReadingTime(post.sections)} min</p>
            </div>
          </div>

          {/* Numbered sections */}
          <div>
            {post.sections?.map((section, idx) => {
              const imageLeft = idx % 2 === 0;
              const hasList = section.image && (section.text.includes("<ul") || section.text.includes("<ol") || section.text.includes("<li"));
              return (
                <div key={idx} className="flex gap-6 md:gap-8 pb-10 mb-10 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
                  {/* Step indicator */}
                  <div className="hidden md:flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold select-none flex-shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    {idx < post.sections.length - 1 && (
                      <div className="w-px flex-1 bg-blue-100 mt-3 min-h-[32px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`${hasList ? "" : "[display:flow-root]"} flex-1 min-w-0 pt-0.5`}>
                    {section.image && (
                      hasList ? (
                        <img
                          src={section.image}
                          alt=""
                          className="block w-full h-auto rounded-xl shadow-sm border border-gray-100 mb-6"
                        />
                      ) : (
                        <img
                          src={section.image}
                          alt=""
                          className={`block w-full md:w-64 lg:w-72 h-auto rounded-xl shadow-sm border border-gray-100 mb-4 md:mb-2 ${imageLeft ? "md:float-left md:mr-7" : "md:float-right md:ml-7"}`}
                        />
                      )
                    )}
                    <div
                      className="
                        prose prose-lg max-w-none
                        prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-headings:leading-snug
                        prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-0 prose-h3:mt-0
                        prose-p:text-gray-700 prose-p:leading-[1.85] prose-p:text-[17px]
                        prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-gray-900 prose-strong:font-semibold
                        prose-blockquote:border-l-[3px] prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/40 prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:text-gray-600 prose-blockquote:not-italic
                        prose-code:bg-gray-100 prose-code:text-blue-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-0.5 [&_li]:text-gray-700
                        [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-sm
                        [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_th]:text-gray-800 [&_th]:text-left
                        [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-gray-700
                        [&_tr:nth-child(even)_td]:bg-gray-50/60
                      "
                      dangerouslySetInnerHTML={{ __html: section.text }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              to="/case_study"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Case Studies
            </Link>
            <p className="text-xs text-gray-300">Published by Candid · {formattedDate}</p>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside>
          <div className="sticky top-6 space-y-8">
            {/* Table of contents */}
            {tocItems.length > 0 && (
              <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100/80">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-4">
                  In This Case Study
                </p>
                <div className="space-y-3">
                  {tocItems.map(({ idx, heading }) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="text-[10px] font-bold text-blue-400 tabular-nums flex-shrink-0 mt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] text-gray-600 leading-snug line-clamp-2">
                        {heading}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related case studies */}
            {related.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                  More Case Studies
                </p>
                <div className="space-y-4">
                  {related.map((ob) => (
                    <Link
                      key={ob._id}
                      to={`/case-study/${ob.slug}`}
                      className="group flex gap-3 items-start"
                    >
                      <img
                        src={ob.heroImage || FALLBACK}
                        alt={ob.title}
                        className="w-14 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                          {ob.title}
                        </p>
                        <span className="text-xs text-gray-400 mt-1 flex items-center gap-0.5 group-hover:text-blue-500 transition-colors">
                          Read <ArrowRight size={10} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ── Continue Reading Strip ── */}
      {continueReading.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50/60 py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">
                  Continue Reading
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  More Stories of Impact
                </h2>
              </div>
              <Link
                to="/case_study"
                className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {continueReading.map((p) => (
                <Link
                  key={p._id}
                  to={`/case-study/${p.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                    <img
                      src={p.heroImage || FALLBACK}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-2">
                      <Calendar size={10} />
                      {new Date(p.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
