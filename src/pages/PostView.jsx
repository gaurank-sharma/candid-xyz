import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost, getPosts } from "../utils/api";

export default function PostView() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);

  useEffect(() => {
    getPost(slug).then(setPost);
    getPosts().then(setOtherPosts);
  }, [slug]);

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div
        className="relative h-[250px] md:h-[600px] w-full bg-cover bg-center "
        style={{ backgroundImage: `url(${post.heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent  flex items-center justify-center p-[14%] md:p-[12%]">
          <h1 className="text-white text-2xl md:text-5xl font-bold">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-10">
          <div className="flex items-center gap-4 text-gray-600 text-sm md:text-xl">
            <span>👤 Candid Team</span>
            <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          {post.sections.map((section, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row gap-6 ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {section.image && (
                  {/* --- OPTION 1: Natural flow (image adjusts to text) --- */}

                  <div className="w-full md:w-[45%] shrink-0">
               
                  <img
                    src={section.image}
                    alt="Section"
                    className="w-full h-auto object-contain rounded-xl shadow-md border border-gray-200"
                  />
                

                  {/* --- OPTION 2: Top aligned (no equal height, text & img top) --- */}
                  {/*
                  <img
                    src={section.image}
                    alt="Section"
                    className="w-full md:w-[350px] object-cover rounded-lg shadow-lg"
                  />
                  */}

                  {/* --- OPTION 3: Equal height card style --- */}
                  {/* <div className="w-full md:w-[350px]  h-[220px] md:h-auto flex-shrink-0">
                    <img
                      src={section.image}
                      alt="Section"
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div> */}
                </>
              )}

             <div
                className="prose prose-lg max-w-none items-center text-justify"
                dangerouslySetInnerHTML={{ __html: section.text }}
              />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-1">
          <h2 className="text-xl font-bold">Read More Articles</h2>
          {otherPosts
            .filter((ob) => ob.slug !== post.slug)
            .map((ob) => (
              <div
                key={ob._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {ob.heroImage && (
                  <img
                    src={ob.heroImage}
                    alt={ob.title}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{ob.title}</h3>
                  <Link
                    to={`/post/${ob.slug}`}
                    className="text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-cyan-400 px-4 py-2 rounded-lg inline-block mt-3"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
        </aside>
      </div>
    </div>
  );
}



