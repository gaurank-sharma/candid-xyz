
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer';
import Home from './pages/Home'
import Aboutus from './components/about_us';
import Header from './components/Header';
import Contact from './pages/contact';
import ServicesPage from './pages/services';
import CaseStudiesPage from './pages/case_study';
import OurPeople from './components/our_people';
import AboutUs from './pages/about';
import Blog from "./pages/Blog";
import PostView from "./pages/PostView";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import ManagePosts from './pages/ManagePosts'; // Import the new page
import EditPost from './pages/EditPost';     
import ContactPage from "./pages/ContactPage"; 
import UsersPage from './pages/UsersPage';
import NewCase from './pages/NewCases';
import EditCase from './pages/EditCase';
import ManageCases from './pages/ManageCases';
import CaseView from './pages/CaseView';
import RFPForm from './pages/RFPForm';
import RFPList from './pages/RFPList';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
// import { PrivacyPolicy, TermsAndConditions } from "./pages/policies";
import PrivateRoute from "./components/PrivateRoute";


export default function App() {
  return (
    <Router>
      <div className=" min-h-screen flex flex-col">
       
      <Header/>
        {/* Main content area that will change based on route */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs/>} />
             <Route path="/contact" element={<Contact/>} />
             <Route path="/services" element={<ServicesPage/>}/>
              <Route path="/case_study" element={<CaseStudiesPage/>}/>
              <Route path="/our_people" element={<OurPeople/>}/>
                  <Route path="/articles" element={<Blog />} />
                  <Route path="/post/:slug" element={<PostView />} />
                  <Route path="/admin/login" element={<Login />} />
             <Route path="/case-study/:slug" element={<CaseView />} />
             <Route path="/rfp" element={<RFPForm />} />

                  <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/admin/new" element={<PrivateRoute><NewPost /></PrivateRoute>} />
            <Route path="/admin/cases" element={<PrivateRoute><ManageCases /></PrivateRoute>} />
            <Route path="/admin/edit-case/:slug" element={<PrivateRoute><EditCase /></PrivateRoute>} />
            <Route path="/admin/newcase" element={<PrivateRoute><NewCase /></PrivateRoute>} />
           <Route path="/admin/posts" element={<PrivateRoute><ManagePosts /></PrivateRoute>} />
        <Route path="/admin/edit/:slug" element={<PrivateRoute><EditPost /></PrivateRoute>} />
        <Route path="/admin/contact" element={<PrivateRoute><ContactPage /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
        <Route path="/admin/rfp" element={<PrivateRoute><RFPList /></PrivateRoute>} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} /> */}

          
    </Routes>
   </div>
        
  <Footer />
   </div>
   </Router>
  );
}

