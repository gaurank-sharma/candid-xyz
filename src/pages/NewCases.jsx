// import React, { useState } from "react";
// // --- MODIFIED: Use createCase ---
// import { createCase, uploadImages } from "../utils/api";
// import { useNavigate } from "react-router-dom";
// import { Upload, Image as ImageIcon, PlusCircle, Loader2 } from "lucide-react";
// import TiptapEditor from "../components/TiptapEditor"; // Import your new Tiptap component

// // --- MODIFIED: Renamed component ---
// export default function NewCase() {
//   const [title, setTitle] = useState("");
//   const [heroImage, setHeroImage] = useState(null);
//   const [heroPreview, setHeroPreview] = useState(null);
//   const [sections, setSections] = useState([{ text: "", image: null, preview: null }]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleSectionChange = (idx, field, value) => {
//     const updated = [...sections];
//     updated[idx][field] = value;
//     setSections(updated);
//   };

//   const handleSectionImage = (idx, file) => {
//     const updated = [...sections];
//     updated[idx].image = file;
//     updated[idx].preview = URL.createObjectURL(file);
//     setSections(updated);
//   };

//   const addSection = () => {
//     setSections([...sections, { text: "", image: null, preview: null }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Logic for uploading images
//       const filesToUpload = [];
//       if (heroImage) filesToUpload.push(heroImage);
//       sections.forEach(sec => {
//         if (sec.image) filesToUpload.push(sec.image);
//       });

//       let uploadedUrls = [];
//       if (filesToUpload.length > 0) {
//         const res = await uploadImages(filesToUpload);
//         uploadedUrls = res.urls;
//       }

//       let urlIndex = 0;
//       let heroUrl = "";
//       if (heroImage) {
//         heroUrl = uploadedUrls[urlIndex++];
//       }

//       const sectionData = sections.map(sec => {
//         let imageUrl = "";
//         if (sec.image) {
//           imageUrl = uploadedUrls[urlIndex++];
//         }
//         // Tiptap might return empty content as "<p></p>", clean it up if empty.
//         const cleanedText = sec.text === '<p></p>' ? '' : sec.text;
//         return { text: cleanedText, image: imageUrl };
//       });

//       const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, '');
//    const postData = { title, slug, heroImage: heroUrl, sections: sectionData };

//       // --- MODIFIED: Use createCase ---
//       const post = await createCase(postData); // Changed from createPost

//       if (post._id) {
//         // --- MODIFIED: Navigate to /admin/cases ---
//         navigate("/"); // Changed from "/"
//       } else {
//         // --- MODIFIED: Update alert message ---
//         alert(post.msg || "Failed to create case study");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred. Check the console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* --- MODIFIED: Title --- */}
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">✍️ Create New Case Study</h1>
//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Title */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter case study title..."
//             className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" // Changed color
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         {/* Hero Image Upload */}
//         <div>
//           <p className="font-semibold mb-2 text-gray-700">Hero Image</p>
//           <label htmlFor="hero-upload" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition">
//             <Upload className="h-10 w-10 text-gray-500 mb-2" />
//             <p className="text-gray-600">Click to upload or drag & drop</p>
//             <input
//               id="hero-upload"
//               type="file"
//           accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//               if (file) {
//                   setHeroImage(file);
//                   setHeroPreview(URL.createObjectURL(file));
//                }
//               }}
//             />
//           </label>
//           {heroPreview && (
//             <div className="mt-4">
//               <img src={heroPreview} alt="Hero Preview" className="w-full max-h-64 object-cover rounded-xl shadow-md"/>
//             </div>
//           )}
//         </div>

//         {/* Sections */}
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Sections</h2>
//           {sections.map((sec, idx) => (
//             <div key={idx} className="p-5 border rounded-xl bg-white shadow-sm space-y-4 mb-6">
//               {/* Replace ReactQuill with the new TiptapEditor component */}
//               <TiptapEditor
//                 value={sec.text}
//                onChange={(content) => handleSectionChange(idx, "text", content)}
//                 placeholder="Write your amazing content here..."
//               />
//               <label htmlFor={`section-upload-${idx}`} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-4 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition">
//                 <ImageIcon className="h-8 w-8 text-gray-500 mb-2" />
//                 <p className="text-gray-600 text-sm">Upload section image</p>
//                 <input
//                   id={`section-upload-${idx}`}
//                  type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                 if (file) handleSectionImage(idx, file);
//                  }}
//                 />
//               </label>
//              {sec.preview && (
//                 <img src={sec.preview} alt="Section Preview" className="w-full max-h-56 object-cover rounded-lg shadow" />
//               )}
//             </div>
//           ))}
//   <button type="button" onClick={addSection} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
//             <PlusCircle className="h-5 w-5 text-blue-600" />
//           Add Section
//           </button>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition disabled:bg-blue-400 disabled:cursor-not-allowed"
//        >
//             {loading ? (
//               <>
//               <Loader2 className="animate-spin mr-2" size={20} />
//                 Publishing...
//               </>
//           ) : (
//             // --- MODIFIED: Button text ---
//               "🚀 Publish Case Study"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }




// import React, { useState } from "react";
// // --- Keep your existing API util imports
// import { createCase, uploadImages } from "../utils/api";
// import { useNavigate } from "react-router-dom";
// import { Upload, Image as ImageIcon, PlusCircle, Loader2 } from "lucide-react";
// import TiptapEditor from "../components/TiptapEditor";

// export default function NewCase() {
//   const [title, setTitle] = useState("");
//   const [heroImage, setHeroImage] = useState(null);
//   const [heroPreview, setHeroPreview] = useState(null);
//   const [sections, setSections] = useState([{ text: "", image: null, preview: null }]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleSectionChange = (idx, field, value) => {
//     const updated = [...sections];
//     updated[idx][field] = value;
//     setSections(updated);
//   };

//   const handleSectionImage = (idx, file) => {
//     const updated = [...sections];
//     updated[idx].image = file;
//     updated[idx].preview = URL.createObjectURL(file);
//     setSections(updated);
//   };

//   const addSection = () => {
//     setSections([...sections, { text: "", image: null, preview: null }]);
//   };

//   // ---------------------------
//   // Document upload handler
//   // ---------------------------
//   const handleDocUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       // Adjust base URL if needed (proxy or full URL)
//       const res = await fetch("/api/parse-doc", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(`Server error: ${errText}`);
//       }

//       const data = await res.json();
//       // expected data: { title?: string, paragraphs: string[], images?: string[] }

//       if (data.title) setTitle(prev => prev || data.title);

//       // Convert parsed paragraphs + images into sections
//       const parsed = (data.paragraphs || [])
//         .filter(p => p && p.trim().length > 0)
//         .map((p, i) => {
//           return {
//             text: `<p>${p.trim()}</p>`,
//             image: null,
//             preview: data.images?.[i] || null, // if backend returned image base64/data URLs
//           };
//         });

//       // If no paragraphs found, create at least one empty section
//       setSections(parsed.length > 0 ? parsed : [{ text: "", image: null, preview: null }]);
//     } catch (err) {
//       console.error("Document parsing failed:", err);
//       alert("Failed to parse the document. Check console for details.");
//     } finally {
//       setLoading(false);
//       // reset the input value so same-file uploads later will trigger change
//       e.target.value = "";
//     }
//   };

//   // ---------------------------
//   // Submit (create case)
//   // ---------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Collect files to upload (hero + section images)
//       const filesToUpload = [];
//       if (heroImage) filesToUpload.push(heroImage);
//       sections.forEach(sec => {
//         if (sec.image) filesToUpload.push(sec.image);
//       });

//       let uploadedUrls = [];
//       if (filesToUpload.length > 0) {
//         const res = await uploadImages(filesToUpload);
//         uploadedUrls = res.urls || [];
//       }

//       let urlIndex = 0;
//       let heroUrl = "";
//       if (heroImage) {
//         heroUrl = uploadedUrls[urlIndex++] || "";
//       }

//       const sectionData = sections.map(sec => {
//         let imageUrl = "";
//         if (sec.image) {
//           imageUrl = uploadedUrls[urlIndex++] || "";
//         }
//         const cleanedText = sec.text === "<p></p>" ? "" : sec.text;
//         return { text: cleanedText, image: imageUrl };
//       });

//       const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
//       const postData = { title, slug, heroImage: heroUrl, sections: sectionData };

//       const post = await createCase(postData);

//       if (post && post._id) {
//         // navigate where you need (update if you want /admin/cases, etc.)
//         navigate("/");
//       } else {
//         alert(post?.msg || "Failed to create case study");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred. Check the console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">✍️ Create New Case Study</h1>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Title */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter case study title..."
//             className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         {/* -------------------------
//             Document Upload (PDF/DOCX)
//             Paste this ABOVE hero image as requested
//            ------------------------- */}
//         <div>
//           <p className="font-semibold mb-2 text-gray-700">Upload PDF / DOCX to Auto-Generate Case Study</p>

//           <label
//             htmlFor="doc-upload"
//             className="flex flex-col items-center justify-center border-2 border-dashed border-purple-500 rounded-2xl p-6 cursor-pointer hover:bg-purple-50 transition"
//           >
//             <Upload className="h-10 w-10 text-purple-500 mb-2" />
//             <p className="text-gray-600 text-sm">Click to upload a PDF or DOCX file</p>
//           </label>

//           <input
//             id="doc-upload"
//             type="file"
//             accept=".pdf, .docx, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//             className="hidden"
//             onChange={handleDocUpload}
//           />
//         </div>

//         {/* Hero Image Upload */}
//         <div>
//           <p className="font-semibold mb-2 text-gray-700">Hero Image</p>
//           <label
//             htmlFor="hero-upload"
//             className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
//           >
//             <Upload className="h-10 w-10 text-gray-500 mb-2" />
//             <p className="text-gray-600">Click to upload or drag & drop</p>
//             <input
//               id="hero-upload"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   setHeroImage(file);
//                   setHeroPreview(URL.createObjectURL(file));
//                 }
//               }}
//             />
//           </label>

//           {heroPreview && (
//             <div className="mt-4">
//               <img src={heroPreview} alt="Hero Preview" className="w-full max-h-64 object-cover rounded-xl shadow-md" />
//             </div>
//           )}
//         </div>

//         {/* Sections */}
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Sections</h2>

//           {sections.map((sec, idx) => (
//             <div key={idx} className="p-5 border rounded-xl bg-white shadow-sm space-y-4 mb-6">
//               <TiptapEditor
//                 value={sec.text}
//                 onChange={(content) => handleSectionChange(idx, "text", content)}
//                 placeholder="Write your amazing content here..."
//               />

//               <label
//                 htmlFor={`section-upload-${idx}`}
//                 className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-4 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
//               >
//                 <ImageIcon className="h-8 w-8 text-gray-500 mb-2" />
//                 <p className="text-gray-600 text-sm">Upload section image</p>
//                 <input
//                   id={`section-upload-${idx}`}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) handleSectionImage(idx, file);
//                   }}
//                 />
//               </label>

//               {sec.preview && (
//                 <img src={sec.preview} alt="Section Preview" className="w-full max-h-56 object-cover rounded-lg shadow" />
//               )}
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addSection}
//             className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
//           >
//             <PlusCircle className="h-5 w-5 text-blue-600" />
//             Add Section
//           </button>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition disabled:bg-blue-400 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="animate-spin mr-2" size={20} />
//                 Publishing...
//               </>
//             ) : (
//               "🚀 Publish Case Study"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { createCase, uploadImages, parseDocument } from "../utils/api"; 
// import { useNavigate } from "react-router-dom";
// import { Upload, Image as ImageIcon, PlusCircle, Loader2 } from "lucide-react";
// import TiptapEditor from "../components/TiptapEditor";
// import BackButton from "../components/BackButton";

// export default function NewCase() {
//   const [title, setTitle] = useState("");
//   const [heroImage, setHeroImage] = useState(null);
//   const [heroPreview, setHeroPreview] = useState(null);
//   const [sections, setSections] = useState([{ text: "", image: null, preview: null }]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleSectionChange = (idx, field, value) => {
//     const updated = [...sections];
//     updated[idx][field] = value;
//     setSections(updated);
//   };

//   const handleSectionImage = (idx, file) => {
//     const updated = [...sections];
//     updated[idx].image = file;
//     updated[idx].preview = URL.createObjectURL(file);
//     setSections(updated);
//   };

//   const addSection = () => {
//     setSections([...sections, { text: "", image: null, preview: null }]);
//   };

//   // ---------------------------
//   // Document Upload + Parsing
//   // ---------------------------
//   const handleDocUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setLoading(true);

//     try {
//       const data = await parseDocument(file);
//       console.log("Parsed doc:", data);

//       if (data.title) setTitle((prev) => prev || data.title);

//       const parsedSections = (data.paragraphs || [])
//         .filter((p) => p?.trim().length > 0)
//         .map((p, i) => ({
//           text: `<p>${p.trim()}</p>`,
//           image: null,
//           preview: data.images?.[i] || null,
//         }));

//       setSections(parsedSections.length > 0 ? parsedSections : [{ text: "", image: null, preview: null }]);
//     } catch (err) {
//       console.error("Document parse error:", err);
//       alert("Failed to parse document");
//     } finally {
//       setLoading(false);
//       e.target.value = "";
//     }
//   };

//   // ---------------------------
//   // Submit
//   // ---------------------------
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const heroFile = heroImage ? [heroImage] : [];
//     const sectionFiles = sections
//       .filter(s => s.image)
//       .map(s => s.image);

//     const allFiles = [...heroFile, ...sectionFiles];
//     const result = allFiles.length ? await uploadImages(allFiles) : { urls: [] };

//     const uploadedUrls = result.urls || [];

//     let index = 0;
//     const heroUrl = heroImage ? uploadedUrls[index++] : "";

//     const sectionData = sections
//       .map(sec => {
//         let url = "";
//         if (sec.image) url = uploadedUrls[index++] || "";

//         const cleanedText =
//           sec.text?.trim() === "<p></p>" ? "" : sec.text?.trim();

//         return { text: cleanedText, image: url };
//       })
//       .filter(s => s.text || s.image); // remove empty sections

//     const payload = {
//       title,
//       heroImage: heroUrl,
//       sections: sectionData,
//     };

//     const post = await createCase(payload);

//     if (post._id) {
//       navigate("/case_study");
//     } else {
//       alert(post.msg || "Failed to create case study");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//        <BackButton />
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">✍️ Create New Case Study</h1>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Title */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter case study title..."
//             className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         {/* Document Upload */}
//         <div>
//           <p className="font-semibold mb-2 text-gray-700">Upload PDF / DOCX to Auto-Generate Case Study</p>

//           <label
//             htmlFor="doc-upload"
//             className="flex flex-col items-center justify-center border-2 border-dashed border-purple-500 rounded-2xl p-6 cursor-pointer hover:bg-purple-50 transition"
//           >
//             <Upload className="h-10 w-10 text-purple-500 mb-2" />
//             <p className="text-gray-600 text-sm">Click to upload a PDF or DOCX file</p>
//           </label>

//           <input
//             id="doc-upload"
//             type="file"
//             accept=".pdf, .docx, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//             className="hidden"
//             onChange={handleDocUpload}
//           />
//         </div>

//         {/* Hero Image Upload */}
//         <div>
//           <p className="font-semibold mb-2 text-gray-700">Hero Image</p>

//           <label
//             htmlFor="hero-upload"
//             className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
//           >
//             <Upload className="h-10 w-10 text-gray-500 mb-2" />
//             <p className="text-gray-600">Click to upload</p>

//             <input
//               id="hero-upload"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   setHeroImage(file);
//                   setHeroPreview(URL.createObjectURL(file));
//                 }
//               }}
//             />
//           </label>

//           {heroPreview && (
//             <div className="mt-4">
//               <img
//                 src={heroPreview}
//                 alt="Hero Preview"
//                 className="w-full max-h-64 object-cover rounded-xl shadow-md"
//               />
//             </div>
//           )}
//         </div>

//         {/* Sections */}
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Sections</h2>

//           {sections.map((sec, idx) => (
//             <div key={idx} className="p-5 border rounded-xl bg-white shadow-sm space-y-4 mb-6">
//               <TiptapEditor
//                 value={sec.text}
//                 onChange={(content) => handleSectionChange(idx, "text", content)}
//                 placeholder="Write your content..."
//               />

//               <label
//                 htmlFor={`section-upload-${idx}`}
//                 className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-4 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
//               >
//                 <ImageIcon className="h-8 w-8 text-gray-500 mb-2" />
//                 <p className="text-gray-600 text-sm">Upload section image</p>

//                 <input
//                   id={`section-upload-${idx}`}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) handleSectionImage(idx, file);
//                   }}
//                 />
//               </label>

//               {sec.preview && (
//                 <img
//                   src={sec.preview}
//                   alt="Section Preview"
//                   className="w-full max-h-56 object-cover rounded-lg shadow"
//                 />
//               )}
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addSection}
//             className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
//           >
//             <PlusCircle className="h-5 w-5 text-blue-600" />
//             Add Section
//           </button>
//         </div>

//         {/* Submit */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition disabled:bg-blue-400 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="animate-spin mr-2" size={20} />
//                 Publishing...
//               </>
//             ) : (
//               "🚀 Publish Case Study"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { createCase, uploadImages, parseDocument } from "../utils/api"; 
// import { useNavigate } from "react-router-dom";
// import { Upload, Image as ImageIcon, PlusCircle, Loader2 } from "lucide-react";
// import TiptapEditor from "../components/TiptapEditor";
// import BackButton from "../components/BackButton";

// // --- HELPER: Converts Base64 Data URL to a JS File Object ---
// const dataURLtoFile = (dataurl, filename) => {
//   if (!dataurl || !dataurl.startsWith('data:')) return null;

//   try {
//     const arr = dataurl.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
    
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
    
//     return new File([u8arr], filename, { type: mime });
//   } catch (err) {
//     console.error("Error converting base64 to file:", err);
//     return null;
//   }
// };

// export default function NewCase() {
//   const [title, setTitle] = useState("");
//   const [heroImage, setHeroImage] = useState(null);
//   const [heroPreview, setHeroPreview] = useState(null);
//   const [sections, setSections] = useState([{ text: "", image: null, preview: null }]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   // --- Manual Section Updates ---
//   const handleSectionChange = (idx, field, value) => {
//     const updated = [...sections];
//     updated[idx][field] = value;
//     setSections(updated);
//   };

//   const handleSectionImage = (idx, file) => {
//     const updated = [...sections];
//     updated[idx].image = file;
//     updated[idx].preview = URL.createObjectURL(file);
//     setSections(updated);
//   };

//   const addSection = () => {
//     setSections([...sections, { text: "", image: null, preview: null }]);
//   };

//   // --- Document Upload + Parsing (With Fix) ---
//   const handleDocUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setLoading(true);

//     try {
//       const data = await parseDocument(file);
//       console.log("Parsed doc:", data);

//       if (data.title) setTitle((prev) => prev || data.title);

//       const parsedSections = (data.paragraphs || [])
//         .filter((p) => p?.trim().length > 0)
//         .map((p, i) => {
//           const imageSrc = data.images?.[i] || null;
          
//           // FIX: Convert Base64 string to a real File object
//           let imageFile = null;
//           if (imageSrc) {
//             const fileName = `parsed_img_${Date.now()}_${i}.png`; // Unique name
//             imageFile = dataURLtoFile(imageSrc, fileName);
//           }

//           return {
//             text: `<p>${p.trim()}</p>`,
//             image: imageFile, // Now this is a valid File object for the uploader!
//             preview: imageSrc, // Keep the Base64 string for immediate preview
//           };
//         });

//       setSections(parsedSections.length > 0 ? parsedSections : [{ text: "", image: null, preview: null }]);
//     } catch (err) {
//       console.error("Document parse error:", err);
//       alert("Failed to parse document");
//     } finally {
//       setLoading(false);
//       e.target.value = ""; // Reset input
//     }
//   };

//   // --- Submit (Uploads Images then Creates Post) ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 1. Gather all files (Hero + Section images)
//       const heroFile = heroImage ? [heroImage] : [];
//       const sectionFiles = sections
//         .filter(s => s.image) // This now works for parsed docs too!
//         .map(s => s.image);

//       const allFiles = [...heroFile, ...sectionFiles];
      
//       // 2. Upload images to cloud/server
//       const result = allFiles.length ? await uploadImages(allFiles) : { urls: [] };
//       const uploadedUrls = result.urls || [];

//       // 3. Map URLs back to their slots
//       let index = 0;
//       const heroUrl = heroImage ? uploadedUrls[index++] : "";

//       const sectionData = sections
//         .map(sec => {
//           let url = "";
//           // If there was a file waiting, grab the next URL from the uploaded batch
//           if (sec.image) {
//             url = uploadedUrls[index++] || "";
//           }

//           const cleanedText = sec.text?.trim() === "<p></p>" ? "" : sec.text?.trim();

//           // If we didn't upload a new image, but there was a preview (rare edge case), 
//           // we might want to keep it, but usually we only save the URL.
//           return { text: cleanedText, image: url };
//         })
//         .filter(s => s.text || s.image); // Remove empty sections

//       const payload = {
//         title,
//         heroImage: heroUrl,
//         sections: sectionData,
//       };

//       // 4. Create the Case Study
//       const post = await createCase(payload);

//       if (post._id) {
//         navigate("/case_study"); // Or wherever you want to redirect
//       } else {
//         alert(post.msg || "Failed to create case study");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <BackButton />
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">✍️ Create New Case Study</h1>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Title */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter case study title..."
//             className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         {/* Document Upload */}
//         <div>
//           <p className="font-semibold mb-2 text-gray-700">Upload PDF / DOCX to Auto-Generate Case Study</p>

//           <label
//             htmlFor="doc-upload"
//             className="flex flex-col items-center justify-center border-2 border-dashed border-purple-500 rounded-2xl p-6 cursor-pointer hover:bg-purple-50 transition"
//           >
//             <Upload className="h-10 w-10 text-purple-500 mb-2" />
//             <p className="text-gray-600 text-sm">Click to upload a PDF or DOCX file</p>
//           </label>

//           <input
//             id="doc-upload"
//             type="file"
//             accept=".pdf, .docx, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//             className="hidden"
//             onChange={handleDocUpload}
//           />
//         </div>

//         {/* Hero Image Upload */}
//         <div>
//           <p className="font-semibold mb-2 text-gray-700">Hero Image</p>

//           <label
//             htmlFor="hero-upload"
//             className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
//           >
//             <Upload className="h-10 w-10 text-gray-500 mb-2" />
//             <p className="text-gray-600">Click to upload</p>

//             <input
//               id="hero-upload"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   setHeroImage(file);
//                   setHeroPreview(URL.createObjectURL(file));
//                 }
//               }}
//             />
//           </label>

//           {heroPreview && (
//             <div className="mt-4">
//               <img
//                 src={heroPreview}
//                 alt="Hero Preview"
//                 className="w-full max-h-64 object-cover rounded-xl shadow-md"
//               />
//             </div>
//           )}
//         </div>

//         {/* Sections */}
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Sections</h2>

//           {sections.map((sec, idx) => (
//             <div key={idx} className="p-5 border rounded-xl bg-white shadow-sm space-y-4 mb-6">
//               <TiptapEditor
//                 value={sec.text}
//                 onChange={(content) => handleSectionChange(idx, "text", content)}
//                 placeholder="Write your content..."
//               />

//               <label
//                 htmlFor={`section-upload-${idx}`}
//                 className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-4 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
//               >
//                 <ImageIcon className="h-8 w-8 text-gray-500 mb-2" />
//                 <p className="text-gray-600 text-sm">Upload section image</p>

//                 <input
//                   id={`section-upload-${idx}`}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) handleSectionImage(idx, file);
//                   }}
//                 />
//               </label>

//               {sec.preview && (
//                 <img
//                   src={sec.preview}
//                   alt="Section Preview"
//                   className="w-full max-h-56 object-cover rounded-lg shadow"
//                 />
//               )}
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addSection}
//             className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
//           >
//             <PlusCircle className="h-5 w-5 text-blue-600" />
//             Add Section
//           </button>
//         </div>

//         {/* Submit */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition disabled:bg-blue-400 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="animate-spin mr-2" size={20} />
//                 Publishing...
//               </>
//             ) : (
//               "🚀 Publish Case Study"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }






import React, { useState } from "react";
import { createCase, uploadImages, parseDocument } from "../utils/api"; 
import { useNavigate } from "react-router-dom";
import { Upload, Image as ImageIcon, PlusCircle, Loader2, LayoutTemplate } from "lucide-react";
import TiptapEditor from "../components/TiptapEditor";
import BackButton from "../components/BackButton";

// --- HELPER: Converts Base64 to File ---
const dataURLtoFile = (dataurl, filename) => {
  if (!dataurl || !dataurl.startsWith('data:')) return null;
  try {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) { u8arr[n] = bstr.charCodeAt(n); }
    return new File([u8arr], filename, { type: mime });
  } catch (err) {
    console.error("Error converting file:", err);
    return null;
  }
};

export default function NewCase() {
  const [title, setTitle] = useState("");
  const [heroImage, setHeroImage] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);
  
  // We added a 'layout' property to control Left/Right alignment
  const [sections, setSections] = useState([{ text: "", image: null, preview: null, layout: "image-right" }]);
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDocUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const data = await parseDocument(file);

      setTitle(data.title || "Untitled Case Study");

      if (data.heroImage) {
        const heroFile = dataURLtoFile(data.heroImage, "hero_image.png");
        setHeroImage(heroFile);
        setHeroPreview(data.heroImage);
      }

      const newSections = (data.sections || [])
        .filter((s) => s.text?.trim().length > 0)
        .map((s, i) => ({
          text: s.text,
          image: s.image ? dataURLtoFile(s.image, `section_img_${i}.png`) : null,
          preview: s.image || null,
          layout: i % 2 === 0 ? "image-right" : "image-left",
        }));

      setSections(
        newSections.length > 0
          ? newSections
          : [{ text: "", image: null, preview: null, layout: "image-right" }]
      );
    } catch (err) {
      console.error("Parse Error:", err);
      alert("Could not parse document structure.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  // --- Standard Handlers ---
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
    setSections([...sections, { text: "", image: null, preview: null, layout: "image-right" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Gather all files
      const heroFile = heroImage ? [heroImage] : [];
      const sectionFiles = sections.filter(s => s.image).map(s => s.image);
      const allFiles = [...heroFile, ...sectionFiles];
      
      const result = allFiles.length ? await uploadImages(allFiles) : { urls: [] };
      const uploadedUrls = result.urls || [];

      let index = 0;
      const heroUrl = heroImage ? uploadedUrls[index++] : "";

      const sectionData = sections.map(sec => {
        let url = "";
        if (sec.image) url = uploadedUrls[index++] || "";
        
        return { 
          text: sec.text, 
          image: url,
          layout: sec.layout // Save the layout preference to DB
        };
      });

      await createCase({ title, heroImage: heroUrl, sections: sectionData });
      navigate("/case_study");
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <BackButton />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">✍️ Create Case Study</h1>
        
        {/* Document Upload Button */}
        <div className="relative">
          <input
            id="doc-upload"
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleDocUpload}
          />
          <label
            htmlFor="doc-upload"
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition shadow-md"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
            <span>Import from DOCX/PDF</span>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. TITLE INPUT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Case Study Title</label>
          <input
            type="text"
            className="w-full p-4 text-xl font-bold border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
          />
        </div>

        {/* 2. HERO IMAGE AREA */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hero Section</h3>
          
          {heroPreview ? (
            <div className="relative group">
              <img src={heroPreview} alt="Hero" className="w-full h-64 object-cover rounded-xl" />
              <button 
                type="button"
                onClick={() => { setHeroImage(null); setHeroPreview(null); }}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ) : (
             <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
               <ImageIcon className="text-gray-400 mb-2" size={32} />
               <span className="text-gray-500">Upload Hero Image</span>
               <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                 const f = e.target.files?.[0];
                 if(f) { setHeroImage(f); setHeroPreview(URL.createObjectURL(f)); }
               }} />
             </label>
          )}
        </div>

        {/* 3. DYNAMIC SECTIONS */}
        <div className="space-y-6">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
              
              {/* Layout Toggle Header */}
              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-semibold text-gray-500">Section {idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleSectionChange(idx, "layout", sec.layout === "image-left" ? "image-right" : "image-left")}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <LayoutTemplate size={16} />
                  {sec.layout === "image-left" ? "Image Left / Text Right" : "Text Left / Image Right"}
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Text Editor */}
                <div className="flex-1">
                  <TiptapEditor
                    value={sec.text}
                    onChange={(val) => handleSectionChange(idx, "text", val)}
                  />
                </div>

                {/* Image Uploader for Section */}
                <div className="w-full md:w-1/3">
                  {sec.preview ? (
                    <div className="relative">
                      <img src={sec.preview} className="w-full h-40 object-cover rounded-lg border" alt="" />
                      <button 
                        type="button"
                        className="absolute top-2 right-2 bg-white/90 p-1 rounded-full text-red-600 shadow-sm"
                        onClick={() => handleSectionChange(idx, "image", null)} // Clear image
                      >✕</button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                      <PlusCircle className="text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500">Add Image</span>
                      <input type="file" className="hidden" onChange={(e) => {
                         const f = e.target.files?.[0];
                         if(f) handleSectionImage(idx, f);
                      }} />
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={addSection} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-500 transition flex justify-center gap-2 font-semibold">
            <PlusCircle /> Add Another Section
          </button>
        </div>

        <div className="flex justify-end pt-6">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center gap-2">
             {loading && <Loader2 className="animate-spin" />}
             Publish Case Study
          </button>
        </div>

      </form>
    </div>
  );
}