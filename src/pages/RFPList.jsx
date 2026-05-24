import React, { useEffect, useState } from "react";
import { getRFPs } from "../utils/api";
import BackButton from "../components/BackButton";

export default function RFPList() {
  const [rfps, setRFPs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRFPs = async () => {
      try {
        const data = await getRFPs();
        setRFPs(data);
      } catch (err) {
        console.error("Error fetching RFPs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRFPs();
  }, []);

  if (loading)
    return <p className="p-4 text-gray-500">Loading RFPs...</p>;

  return (
    <div className="p-6 text-gray-800">
       <BackButton />
      <h2 className="text-3xl font-bold mb-6 text-teal-700">RFP Submissions</h2>

      {rfps.length === 0 ? (
        <p>No RFP submissions found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="w-full border-collapse">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Sector</th>
                <th className="px-4 py-3 text-left">Contact Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Best Time</th>
                <th className="px-4 py-3 text-left">EPR Services</th>
                <th className="px-4 py-3 text-left">App Services</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {rfps.map((r) => (
                <tr key={r._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{r.sector}</td>
                  <td className="px-4 py-3">{r.contactName}</td>
                  <td className="px-4 py-3">{r.contactEmail}</td>
                  <td className="px-4 py-3">{r.contactPhone || "-"}</td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(r.bestTimeToContact).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {r.eprServices.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {r.appServices.join(", ")}
                  </td>
                  <td className="px-4 py-3">{r.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
