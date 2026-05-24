import React, { useState } from "react";
import { createRFP } from "../utils/api";

export default function RFPForm() {
  const [formData, setFormData] = useState({
    sector: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    bestTimeToContact: "",
    eprServices: [],
    appServices: [],
    description: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updated = checked
        ? [...prev[field], value]
        : prev[field].filter((v) => v !== value);
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await createRFP(formData);
      setMsg(" Request submitted successfully!");
      setFormData({
        sector: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        bestTimeToContact: "",
        eprServices: [],
        appServices: [],
        description: "",
        consent: false,
      });
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-teal-700">
          Request for Proposal (RFP)
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sector */}
          <div>
            <label className="block font-semibold mb-1">
              Sector - Public / Private (Company Name) <span className="text-red-500">*</span>
            </label>
            <input
              name="sector"
              type="text"
              value={formData.sector}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">
                Main Contact Name & Title <span className="text-red-500">*</span>
              </label>
              <input
                name="contactName"
                type="text"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Main Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Main Contact Phone</label>
              <input
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Best time to Contact <span className="text-red-500">*</span>
              </label>
              <input
                name="bestTimeToContact"
                type="datetime-local"
                value={formData.bestTimeToContact}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>

          {/* EPR Implementation */}
          <div>
            <h2 className="font-bold text-lg text-teal-700 mb-2">
              EPR Implementation Services <span className="text-red-500">*</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "EPR Implementation Strategy",
                "Projects & Resource Planning",
                "Testing",
                "Training",
                "Go Live/Activation",
                "Data Strategy & Migration",
                "Command Center Support",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.eprServices.includes(option)}
                    onChange={(e) => handleArrayChange(e, "eprServices")}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Application Management */}
          <div>
            <h2 className="font-bold text-lg text-teal-700 mb-2">
              Application Management Services <span className="text-red-500">*</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "System Upgrades",
                "System Enhancements",
                "Service Improvement / Re-engineering",
                "Targeted Projects",
                "Staff Augmentation",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.appServices.includes(option)}
                    onChange={(e) => handleArrayChange(e, "appServices")}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">
              Description of Services requested <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border rounded-lg p-2"
              placeholder="EPR preference like Epic, Cerner, Allscripts, certifications, consultant experience..."
            />
          </div>

          {/* Consent */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <span>
              I agree to the{" "}
              <a href="/privacy" className="text-teal-600 underline">
                privacy policy
              </a>
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors w-full"
          >
            {loading ? "Submitting..." : "Submit RFP"}
          </button>

          {msg && (
            <p
              className={`text-center font-medium ${
                msg.startsWith("") ? "text-green-600" : "text-red-600"
              }`}
            >
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
