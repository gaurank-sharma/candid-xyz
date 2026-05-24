
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getPosts, getContacts, getCases, getRFPs } from '../utils/api';
// import {
//   LayoutDashboard,
//   FileText,
//   Mail,
//   PlusCircle,
//   ArrowRight,
//   Users,
//   BookCopy, 
//   Clipboard,
// } from 'lucide-react';

// const StatCard = ({ icon, title, value, color }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
//     <div className={`p-3 rounded-full ${color}`}>{icon}</div>
//     <div>
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-2xl font-bold text-gray-800">{value}</p>
//     </div>
//   </div>
// );

// const ActionCard = ({ icon, title, description, to, buttonText }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
//     <div className="flex items-center gap-3 mb-3">
//       {icon}
//       <h3 className="text-xl font-bold text-gray-800">{title}</h3>
//     </div>
//     <p className="text-gray-600 mb-4 flex-grow">{description}</p>
//     <Link
//       to={to}
//       className="mt-auto bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
//     >
//       <span>{buttonText}</span>
//       <ArrowRight size={16} />
//     </Link>
//   </div>
// );

// export default function Dashboard() {
//   const [postCount, setPostCount] = useState(0);
//   // --- ADDED: State for case studies ---
//   const [caseCount, setCaseCount] = useState(0);
//   const [contactCount, setContactCount] = useState(0);
//   const [rfpCount, setRfpCount] = useState(0);
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     getPosts()
//       .then((posts) => setPostCount(posts.length))
//       .catch((err) => console.error('Failed to fetch posts:', err));

//     // --- ADDED: Fetch case studies ---
//     getCases()
//       .then((cases) => setCaseCount(cases.length))
//       .catch((err) => console.error('Failed to fetch cases:', err));

//      getRFPs()
//       .then((rfps) => setRfpCount(rfps.length))
//       .catch((err) => console.error('Failed to fetch RFPs:', err));

//     getContacts()
//       .then((contacts) => setContactCount(contacts.length))
//       .catch((err) => console.error('Failed to fetch contacts:', err));

//     // Get role from localStorage
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);
//   }, []);

//   const today = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//               <LayoutDashboard className="text-teal-600" />
//               Admin Dashboard
//             </h1>
//             <p className="text-gray-500 mt-1">{today}</p>
//           </div>
//           {/* --- MODIFIED: Changed to two buttons --- */}
//           <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
//             <Link
//               to="/admin/new"
//               className="bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
//             >
//               <PlusCircle size={20} />
//               Create New Article
//             </Link>
//             <Link
//               to="/admin/newcase"
//               className="bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
//             >
//               <PlusCircle size={20} />
//               Create New Case Study
//             </Link>
//           </div>
//           {/* --- END MODIFICATION --- */}
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <StatCard
//             icon={<FileText className="text-teal-800" size={24} />}
//             title="Total Articles" // Renamed from "Blogs"
//             value={postCount}
//             color="bg-teal-100"
//           />
//           {/* --- ADDED: Case Study Stat Card --- */}
//           <StatCard
//             icon={<BookCopy className="text-blue-800" size={24} />}
//             title="Total Case Studies"
//             value={caseCount}
//             color="bg-blue-100"
//           />
//           <StatCard
//             icon={<Mail className="text-purple-800" size={24} />}
//             title="Contact Queries"
//             value={contactCount}
//             color="bg-purple-100"
//           />
//         </div>

//         {/* Management Sections */}
//         {/* --- MODIFIED: Grid to allow up to 4 items --- */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <ActionCard
//             icon={<FileText className="text-teal-600" size={24} />}
//             title="Manage Articles" // Renamed from "Blog"
//             description="View, edit, or delete existing articles." // Updated description
//             to="/admin/posts"
//             buttonText="View All Articles" // Renamed from "Blogs"
//           />
//           {/* --- ADDED: Case Study Action Card --- */}
//           <ActionCard
//             icon={<BookCopy className="text-blue-600" size={24} />}
//             title="Manage Case Studies"
//             description="View, edit, or delete existing case studies."
//             // Note: This links to /admin/cases. You will need to create
//             // a new route and component for this page.
//             to="/admin/cases" 
//             buttonText="View Case Studies"
//           />
//           <ActionCard
//             icon={<Mail className="text-purple-600" size={24} />}
//             title="Manage Contacts"
//             description="View all customer queries submitted through the website."
//             to="/admin/contact"
//             buttonText="View Contacts"
//           />


//           {/* --- ADDED: RFP Stat Card --- */}
//           <StatCard
//             icon={<Clipboard className="text-green-800" size={24} />}
//             title="RFP Submissions"
//             value={rfpCount}
//             color="bg-green-100"
//           />
//         </div>

//           {/* --- ADDED: RFP Management Card --- */}
//           <ActionCard
//             icon={<Clipboard className="text-green-600" size={24} />}
//             title="Manage RFP Submissions"
//             description="View all submitted Requests for Proposals (RFPs)."
//             to="/admin/rfp"
//             buttonText="View RFPs"
//           />
//           {/* Only for Super Admin */}
//           {role === "superadmin" && (
//             <ActionCard
//               icon={<Users className="text-red-600" size={24} />}
//             title="Manage Users"
//               description="Add, update, or remove admins and users from the system."
//               to="/admin/users"
//               buttonText="Manage Users"
//             />
//           )}
//         </div>
//       </div>
//   </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, getContacts, getCases, getRFPs } from '../utils/api';
import {
  LayoutDashboard,
  FileText,
  Mail,
  PlusCircle,
  ArrowRight,
  Users,
  BookCopy,
  Clipboard,
} from 'lucide-react';

// ---------- Small UI Components ----------
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ActionCard = ({ icon, title, description, to, buttonText }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4 flex-grow">{description}</p>
    <Link
      to={to}
      className="mt-auto bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
    >
      <span>{buttonText}</span>
      <ArrowRight size={16} />
    </Link>
  </div>
);

// ---------- Main Component ----------
export default function Dashboard() {
  const [postCount, setPostCount] = useState(0);
  const [caseCount, setCaseCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [rfpCount, setRfpCount] = useState(0);
  const [role, setRole] = useState('');

  useEffect(() => {
    // Fetch all data
    getPosts()
      .then((posts) => setPostCount(posts.length))
      .catch((err) => console.error('Failed to fetch posts:', err));

    getCases()
      .then((cases) => setCaseCount(cases.length))
      .catch((err) => console.error('Failed to fetch cases:', err));

    getRFPs()
      .then((rfps) => setRfpCount(rfps.length))
      .catch((err) => console.error('Failed to fetch RFPs:', err));

    getContacts()
      .then((contacts) => setContactCount(contacts.length))
      .catch((err) => console.error('Failed to fetch contacts:', err));

    const storedRole = localStorage.getItem('role');
    if (storedRole) setRole(storedRole);
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* -------- Header -------- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <LayoutDashboard className="text-teal-600" />
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">{today}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
            <Link
              to="/admin/new"
              className="bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <PlusCircle size={20} />
              Create New Article
            </Link>
            <Link
              to="/admin/newcase"
              className="bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <PlusCircle size={20} />
              Create New Case Study
            </Link>
          </div>
        </div>

        {/* -------- Stats Section -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FileText className="text-teal-800" size={24} />}
            title="Total Articles"
            value={postCount}
            color="bg-teal-100"
          />
          <StatCard
            icon={<BookCopy className="text-blue-800" size={24} />}
            title="Total Case Studies"
            value={caseCount}
            color="bg-blue-100"
          />
          <StatCard
            icon={<Mail className="text-purple-800" size={24} />}
            title="Contact Queries"
            value={contactCount}
            color="bg-purple-100"
          />
          <StatCard
            icon={<Clipboard className="text-green-800" size={24} />}
            title="RFP Submissions"
            value={rfpCount}
            color="bg-green-100"
          />
        </div>

        {/* -------- Management Cards -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ActionCard
            icon={<FileText className="text-teal-600" size={24} />}
            title="Manage Articles"
            description="View, edit, or delete existing articles."
            to="/admin/posts"
            buttonText="View All Articles"
          />

          <ActionCard
            icon={<BookCopy className="text-blue-600" size={24} />}
            title="Manage Case Studies"
            description="View, edit, or delete existing case studies."
            to="/admin/cases"
            buttonText="View Case Studies"
          />

          <ActionCard
            icon={<Mail className="text-purple-600" size={24} />}
            title="Manage Contacts"
            description="View all customer queries submitted through the website."
            to="/admin/contact"
            buttonText="View Contacts"
          />

          <ActionCard
            icon={<Clipboard className="text-green-600" size={24} />}
            title="Manage RFP Submissions"
            description="View all submitted Requests for Proposals (RFPs)."
            to="/admin/rfp"
            buttonText="View RFPs"
          />

          {role === 'superadmin' && (
            <ActionCard
              icon={<Users className="text-red-600" size={24} />}
              title="Manage Users"
              description="Add, update, or remove admins and users from the system."
              to="/admin/users"
              buttonText="Manage Users"
            />
          )}
        </div>
      </div>
    </div>
  );
}






