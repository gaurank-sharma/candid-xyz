import { useState } from "react";
import { createPost, uploadImages, parseDocument } from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  Image as ImageIcon,
  PlusCircle,
  Loader2,
  Trash2,
  LayoutTemplate,
  FileText,
} from "lucide-react";
import TiptapEditor from "../components/TiptapEditor";
import BackButton from "../components/BackButton";

const dataURLtoFile = (dataurl, filename) => {
  if (!dataurl || !dataurl.startsWith("data:")) return null;
  try {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  } catch {
    return null;
  }
};

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [heroImage, setHeroImage] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);
  const [sections, setSections] = useState([
    { text: "", image: null, preview: null, layout: "image-right" },
  ]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const navigate = useNavigate();

  const handleDocUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const data = await parseDocument(file);

      setTitle(data.title || "Untitled");

      if (data.heroImage) {
        const heroFile = dataURLtoFile(data.heroImage, "hero.png");
        setHeroImage(heroFile);
        setHeroPreview(data.heroImage);
      }

      const newSections = (data.sections || [])
        .filter((s) => s.text?.trim().length > 0)
        .map((s, i) => ({
          text: s.text,
          image: s.image ? dataURLtoFile(s.image, `img_${i}.png`) : null,
          preview: s.image || null,
          layout: i % 2 === 0 ? "image-right" : "image-left",
        }));

      setSections(
        newSections.length > 0
          ? newSections
          : [{ text: "", image: null, preview: null, layout: "image-right" }]
      );
    } catch (err) {
      console.error(err);
      alert("Failed to parse document. Please try a DOCX or PDF file.");
    } finally {
      setImporting(false);
      e.target.value = "";
    }
  };

  const handleSectionChange = (idx, field, value) => {
    const updated = [...sections];
    updated[idx][field] = value;
    setSections(updated);
  };

  const handleSectionImage = (idx, file) => {
    const updated = [...sections];
    updated[idx].image = file;
    updated[idx].preview = URL.createObjectURL(file);
    setSections(updated);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { text: "", image: null, preview: null, layout: "image-right" },
    ]);
  };

  const removeSection = (idx) => {
    if (sections.length === 1) return;
    setSections(sections.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const heroFile = heroImage ? [heroImage] : [];
      const sectionFiles = sections.filter((s) => s.image).map((s) => s.image);
      const allFiles = [...heroFile, ...sectionFiles];
      const result = allFiles.length
        ? await uploadImages(allFiles)
        : { urls: [] };
      const uploadedUrls = result.urls || [];

      let index = 0;
      const heroUrl = heroImage ? uploadedUrls[index++] : "";

      const sectionData = sections
        .map((sec) => {
          let url = "";
          if (sec.image) url = uploadedUrls[index++] || "";
          const cleanedText =
            sec.text?.trim() === "<p></p>" ? "" : sec.text?.trim();
          return { text: cleanedText, image: url };
        })
        .filter((s) => s.text || s.image);

      const slug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

      const post = await createPost({
        title,
        slug,
        heroImage: heroUrl,
        sections: sectionData,
      });

      if (post._id) {
        navigate("/admin/posts");
      } else {
        alert(post.msg || "Failed to create post");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <BackButton />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Article
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Write manually or import from a document
          </p>
        </div>

        <div>
          <input
            id="doc-import"
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleDocUpload}
          />
          <label
            htmlFor="doc-import"
            className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2.5 rounded-xl cursor-pointer hover:bg-violet-700 transition shadow-md font-medium text-sm"
          >
            {importing ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <FileText size={16} />
            )}
            {importing ? "Importing..." : "Import from PDF / DOCX"}
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">
            Article Title
          </label>
          <input
            type="text"
            className="w-full p-4 text-xl font-semibold border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none transition placeholder:text-gray-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a compelling title..."
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
                onClick={() => {
                  setHeroImage(null);
                  setHeroPreview(null);
                }}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-teal-400 hover:bg-teal-50/40 transition group">
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-teal-100 rounded-full flex items-center justify-center mb-3 transition">
                <ImageIcon className="text-gray-400 group-hover:text-teal-500 transition" size={22} />
              </div>
              <span className="text-gray-600 font-medium text-sm">
                Click to upload hero image
              </span>
              <span className="text-gray-400 text-xs mt-1">
                PNG, JPG, WEBP up to 10MB
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setHeroImage(f);
                    setHeroPreview(URL.createObjectURL(f));
                  }
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
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Section header */}
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

              {/* Section body */}
              <div className="p-5 flex flex-col md:flex-row gap-5">
                <div className="flex-1 min-w-0">
                  <TiptapEditor
                    value={sec.text}
                    onChange={(val) => handleSectionChange(idx, "text", val)}
                    placeholder="Write your content here..."
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
                        onClick={() => {
                          handleSectionChange(idx, "image", null);
                          handleSectionChange(idx, "preview", null);
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-teal-400 hover:bg-teal-50/40 transition group">
                      <PlusCircle
                        className="text-gray-400 group-hover:text-teal-500 mb-1.5 transition"
                        size={20}
                      />
                      <span className="text-xs text-gray-500 font-medium">
                        Add Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleSectionImage(idx, f);
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
            className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-teal-400 hover:text-teal-600 transition flex justify-center items-center gap-2 font-semibold text-sm"
          >
            <PlusCircle size={17} />
            Add Another Section
          </button>
        </div>

        <div className="flex justify-end pt-2 pb-10">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Publishing..." : "Publish Article"}
          </button>
        </div>
      </form>
    </div>
  );
}
