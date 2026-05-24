import { useState, useEffect } from "react";
import { getCase, updateCase, uploadImages } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Image as ImageIcon,
  PlusCircle,
  Loader2,
  Trash2,
  LayoutTemplate,
} from "lucide-react";
import TiptapEditor from "../components/TiptapEditor";
import BackButton from "../components/BackButton";

export default function EditCase() {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [heroFile, setHeroFile] = useState(null);
  const [heroPreview, setHeroPreview] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    getCase(slug)
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setHeroPreview(data.heroImage || "");
        setSections(
          (data.sections || []).map((s) => ({
            text: s.text || "",
            image: s.image || "",
            newFile: null,
            preview: s.image || "",
            layout: s.layout || "image-right",
          }))
        );
      })
      .catch(console.error);
  }, [slug]);

  const handleSectionChange = (idx, field, value) => {
    const updated = [...sections];
    updated[idx][field] = value;
    setSections(updated);
  };

  const handleSectionFile = (idx, file) => {
    const updated = [...sections];
    updated[idx].newFile = file;
    updated[idx].preview = URL.createObjectURL(file);
    setSections(updated);
  };

  const clearSectionImage = (idx) => {
    const updated = [...sections];
    updated[idx].newFile = null;
    updated[idx].preview = "";
    updated[idx].image = "";
    setSections(updated);
  };

  const addSection = () =>
    setSections([
      ...sections,
      { text: "", image: "", newFile: null, preview: "", layout: "image-right" },
    ]);

  const removeSection = (idx) => {
    if (sections.length === 1) return;
    setSections(sections.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let heroUrl = heroPreview;
      if (heroFile) {
        const res = await uploadImages([heroFile]);
        heroUrl = res.urls[0];
      }

      const newFiles = sections.map((s) => s.newFile).filter(Boolean);
      let newUrls = [];
      if (newFiles.length > 0) {
        const res = await uploadImages(newFiles);
        newUrls = res.urls;
      }

      let urlIdx = 0;
      const finalSections = sections.map((sec) => ({
        text: sec.text,
        image: sec.newFile ? newUrls[urlIdx++] : sec.image,
      }));

      await updateCase(post._id, { title, heroImage: heroUrl, sections: finalSections });
      navigate("/admin/cases");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <BackButton />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Case Study</h1>
        <p className="text-gray-400 text-sm mt-1">
          Changes are saved when you click "Save Changes"
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">
            Case Study Title
          </label>
          <input
            type="text"
            className="w-full p-4 text-xl font-semibold border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition placeholder:text-gray-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Hero Image */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-widest">
            Hero Image
          </label>
          {heroPreview ? (
            <div className="relative group">
              <img
                src={heroPreview}
                alt="Hero"
                className="w-full h-64 object-cover rounded-xl shadow-sm"
              />
              <button
                type="button"
                onClick={() => { setHeroFile(null); setHeroPreview(""); }}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition group">
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center mb-3 transition">
                <ImageIcon className="text-gray-400 group-hover:text-blue-500 transition" size={22} />
              </div>
              <span className="text-gray-600 font-medium text-sm">Upload hero image</span>
              <span className="text-gray-400 text-xs mt-1">PNG, JPG, WEBP</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) { setHeroFile(f); setHeroPreview(URL.createObjectURL(f)); }
                }}
              />
            </label>
          )}
        </div>

        {/* Sections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Content Sections
            </h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              {sections.length} section{sections.length !== 1 ? "s" : ""}
            </span>
          </div>

          {sections.map((sec, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/80">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Section {idx + 1}
                </span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      handleSectionChange(
                        idx,
                        "layout",
                        sec.layout === "image-left" ? "image-right" : "image-left"
                      )
                    }
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium transition"
                  >
                    <LayoutTemplate size={13} />
                    {sec.layout === "image-left" ? "Image Left" : "Image Right"}
                  </button>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-medium transition"
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="p-5 flex flex-col md:flex-row gap-5">
                <div className="flex-1 min-w-0">
                  <TiptapEditor
                    value={sec.text}
                    onChange={(val) => handleSectionChange(idx, "text", val)}
                    placeholder="Write content here…"
                  />
                </div>

                <div className="w-full md:w-52 flex-shrink-0">
                  {sec.preview ? (
                    <div className="relative group">
                      <img
                        src={sec.preview}
                        className="w-full h-44 object-cover rounded-xl border border-gray-100 shadow-sm"
                        alt=""
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition"
                        onClick={() => clearSectionImage(idx)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition group">
                      <PlusCircle className="text-gray-400 group-hover:text-blue-500 mb-1.5 transition" size={20} />
                      <span className="text-xs text-gray-500 font-medium">Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleSectionFile(idx, f);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-blue-400 hover:text-blue-600 transition flex justify-center items-center gap-2 font-semibold text-sm"
          >
            <PlusCircle size={17} />
            Add Another Section
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 pb-10">
          <button
            type="button"
            onClick={() => navigate("/admin/cases")}
            className="text-sm text-gray-400 hover:text-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
