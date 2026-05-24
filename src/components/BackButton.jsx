// // components/BackButton.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';

// const BackButton = ({ to = "/admin", label = "Back to Dashboard" }) => {
//   return (
//     <Link 
//       to={to} 
//       className="inline-flex items-center text-gray-600 hover:text-teal-600 transition-colors mb-6"
//     >
//       <ArrowLeft size={20} className="mr-2" />
//       <span className="font-medium">{label}</span>
//     </Link>
//   );
// };

// export default BackButton;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // -1 tells the browser to go back one step in history
    // It effectively "clears" the current route from the top of the stack
    navigate(-1); 
  };

  return (
    <button 
      onClick={handleGoBack} 
      className="flex items-center text-gray-600 hover:text-teal-600 transition-colors mb-6 font-medium"
    >
      <ArrowLeft size={20} className="mr-2" />
      Back
    </button>
  );
};

export default BackButton;