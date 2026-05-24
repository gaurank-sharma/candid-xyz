import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../utils/api";
import { Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react";

const getReadingTime = (sections) => {
  const div = document.createElement("div");
  div.innerHTML = (sections || []).map((s) => s.text || "").join(" ");
  const words = (div.textContent || "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const getExcerpt = (sections, len = 150) => {
  if (!sections?.length || !sections[0]?.text) return "";
  const div = document.createElement("div");
  div.innerHTML = sections[0].text;
  const plain = (div.textContent || div.innerText || "").trim();
  return plain.length > len ? plain.slice(0, len) + "…" : plain;
};

const FALLBACK =
  "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&auto=format&fit=crop";

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="aspect-[16/9] bg-gray-200" />
      <div className="p-5 space-y-2.5">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded w-4/5" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-20 mt-1" />
      </div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featured = !loading && posts.length > 0 ? posts[0] : null;
  const rest = posts.slice(1);

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero Banner ── */}
      <div
        className="relative h-[260px] md:h-[400px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/85" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <nav className="flex items-center gap-1.5 text-white/50 text-xs uppercase tracking-widest font-medium mb-5">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={11} />
            <span className="text-white/80">Articles</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">
            Insights &amp; Articles
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/60 max-w-md leading-relaxed">
            Research, perspectives, and expertise from the Candid team
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {loading ? (
          <>
            <div className="animate-pulse mb-14 rounded-2xl overflow-hidden border border-gray-100 h-72 bg-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        ) : posts.length === 0 ? (
          <div className="text-center py-28">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No articles yet
            </h3>
            <p className="text-gray-500">Check back soon for new content.</p>
          </div>
        ) : (
          <>
            {/* ── Featured Article ── */}
            {featured && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-7">
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
                    Featured
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <Link
                  to={`/post/${featured.slug}`}
                  className="group grid md:grid-cols-2 overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-100">
                    <img
                      src={featured.heroImage || FALLBACK}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 md:p-10 lg:p-14 flex flex-col justify-center bg-white">
                    <div className="flex items-center gap-3 text-gray-400 text-xs mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} />
                        {new Date(featured.createdAt).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </span>
                      <span className="text-gray-200">·</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} />
                        {getReadingTime(featured.sections)} min read
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4 group-hover:text-teal-600 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-sm mb-8 line-clamp-3">
                      {getExcerpt(featured.sections, 200)}
                    </p>
                    <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </section>
            )}

            {/* ── Article Grid ── */}
            {rest.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    More Articles
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-300">
                    {rest.length} article{rest.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post) => (
                    <Link
                      to={`/post/${post.slug}`}
                      key={post._id}
                      className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        <img
                          src={post.heroImage || FALLBACK}
                          alt={post.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-2.5">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span className="text-gray-200">·</span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {getReadingTime(post.sections)} min
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                          {getExcerpt(post.sections, 100)}
                        </p>
                        <span className="inline-flex items-center gap-1 text-teal-600 font-semibold text-xs group-hover:gap-2 transition-all duration-200">
                          Read Article <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
