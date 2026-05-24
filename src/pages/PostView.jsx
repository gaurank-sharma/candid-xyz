import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost, getPosts } from "../utils/api";
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

const getReadingTime = (sections) => {
  const div = document.createElement("div");
  div.innerHTML = (sections || []).map((s) => s.text || "").join(" ");
  const words = (div.textContent || "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const FALLBACK =
  "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&auto=format&fit=crop";

export default function PostView() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPost(slug).then(setPost);
    getPosts().then(setOtherPosts);
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

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-400 tracking-widest uppercase">
            Loading
          </span>
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

  return (
    <div className="bg-white min-h-screen">
      {/* ── Reading Progress Bar ── */}
      <div
        className="fixed top-0 left-0 z-[999] h-[2px] bg-teal-500 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />

      {/* ── Cinematic Hero ── */}
      <div
        className="relative h-[320px] md:h-[580px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${post.heroImage})` }}
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
              to="/articles"
              className="hover:text-white transition-colors"
            >
              Articles
            </Link>
            <ChevronRight size={11} />
            <span className="text-white/70 line-clamp-1 max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Title block pinned to bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-10 max-w-5xl">
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-16">
        {/* Article column */}
        <article>
          {/* Author strip */}
          <div className="flex items-center gap-4 pb-8 mb-10 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              C
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Candid Team
              </p>
              <p className="text-xs text-gray-400">
                {formattedDate}&ensp;·&ensp;
                {getReadingTime(post.sections)} min read
              </p>
            </div>
          </div>

          {/* Content sections */}
          <div className="space-y-0">
            {post.sections.map((section, idx) => {
              const imageLeft = idx % 2 === 0;
              const hasList = section.image && (section.text.includes("<ul") || section.text.includes("<ol") || section.text.includes("<li"));
              return (
                <div key={idx} className={`${hasList ? "" : "[display:flow-root]"} ${idx === 0 ? "pb-12" : "py-12"} ${idx > 0 ? "border-t border-dashed border-gray-200" : ""}`}>
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
                        className={`block w-full md:w-72 lg:w-80 h-auto rounded-xl shadow-sm border border-gray-100 mb-4 md:mb-2 ${imageLeft ? "md:float-left md:mr-8" : "md:float-right md:ml-8"}`}
                      />
                    )
                  )}
                  <div
                    className="
                      prose prose-lg max-w-none
                      prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-headings:leading-snug
                      prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-0 prose-h3:mt-0
                      prose-h2:border-l-[3px] prose-h2:border-teal-500 prose-h2:pl-4
                      prose-p:text-gray-700 prose-p:leading-[1.85] prose-p:text-[17px]
                      prose-a:text-teal-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-blockquote:border-l-[3px] prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/40 prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:text-gray-600 prose-blockquote:not-italic
                      prose-code:bg-gray-100 prose-code:text-teal-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-0.5 [&_li]:text-gray-700
                      [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-sm
                      [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_th]:text-gray-800 [&_th]:text-left
                      [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-gray-700
                      [&_tr:nth-child(even)_td]:bg-gray-50/60
                    "
                    dangerouslySetInnerHTML={{ __html: section.text }}
                  />
                </div>
              );
            })}
          </div>

          {/* Article footer */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Articles
            </Link>
            <p className="text-xs text-gray-300">
              Published by Candid · {formattedDate}
            </p>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside>
          <div className="sticky top-6 space-y-7">
            {/* Related articles */}
            {related.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                  More Articles
                </p>
                <div className="space-y-4">
                  {related.map((ob) => (
                    <Link
                      key={ob._id}
                      to={`/post/${ob.slug}`}
                      className="group flex gap-3 items-start"
                    >
                      <img
                        src={ob.heroImage || FALLBACK}
                        alt={ob.title}
                        className="w-14 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                          {ob.title}
                        </p>
                        <span className="text-xs text-gray-400 mt-1 flex items-center gap-0.5 group-hover:text-teal-500 transition-colors">
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
                <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600 mb-1">
                  Continue Reading
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  More from Candid
                </h2>
              </div>
              <Link
                to="/articles"
                className="text-sm text-teal-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {continueReading.map((p) => (
                <Link
                  key={p._id}
                  to={`/post/${p.slug}`}
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
                    <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
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
