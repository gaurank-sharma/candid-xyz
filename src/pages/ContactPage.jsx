import React, { useEffect, useState } from "react";
import { getContacts } from "../utils/api";
import BackButton from "../components/BackButton";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading)
    return (
      <p className="p-4 text-[var(--color-text-secondary)]">Loading contacts...</p>
    );

  return (
    <div className="p-6 text-[var(--color-text-primary)]">
       <BackButton />
      <h2 className="text-3xl font-bold mb-6  bg-clip-text text-black">
        Customer Queries
      </h2>

      {contacts.length === 0 ? (
        <p className="text-[var(--color-text-secondary)]">No contacts found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="w-full border-collapse">
            <thead className="bg-primary-gradient text-white">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Telephone</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.telephone}</td>
                  <td className="px-4 py-3">{c.message}</td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
