import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserCards from "./components/Login/UserCards";
import Login from "./components/Login/Login";
import Dashboard from "./components/Teacher/Dashboard";
import CodingQuestion from "./components/Student/CodingQuestion";
import McqQuiz from "./components/Student/McqQuiz";
import ExamScheduler from "./components/Teacher/ExamSchedule";
import Sidebar from "./components/Student/Sidebar";
import Register from "./components/Login/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import TeacherDetails from "./components/Admin/TeacherDetails";
import HelpPage from "./components/Login/HelpPage";
import ContactPage from "./components/Login/ContactPage";
import PrivacyPage from "./components/Login/PrivacyPage";
import ForgotPassword from './components/Login/ForgetPassword';
import TeacherInterface from './components/Teacher/TeacherInterface'; 
import Coding from './components/Teacher/Coding';
import Notice from './components/Teacher/Notice'; 
import McqCreator from "./components/Teacher/McqCreator";
import Approvals from "./components/Admin/Approval";
import HomePage from "./components/Teacher/HomePage";
import AdminHome from './components/Admin/AdminHome'
import RegisterDetails from "./components/Teacher/RegisterDetails";
import StudentDetails from './components/Admin/StudentDetails';
import MCQScores from "./components/Teacher/Result";
import ExamDetails from "./components/Admin/ExamDetails";
import ResultAnalysis from "./components/Admin/ResultAnalysis";
import AddResults from "./components/Teacher/AddResult";
import ResultsPage from "./components/Student/ResultPage";


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<UserCards />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher-details" element={<TeacherDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coding" element={<CodingQuestion />} />
        <Route path="/quiz" element={<McqQuiz />} />
        <Route path="/exam" element={<ExamScheduler />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher-interface" element={<TeacherInterface />} />
        <Route path="/exam-scheduler" element={<ExamScheduler />} />
        <Route path="/manage-notices" element={<Notice />} />
        <Route path="/create-mcq" element={<McqCreator />} />
        <Route path="/create-coding" element={<Coding />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/admins" element={<Approvals />} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/adminHome" element={<AdminHome/>}/>
        <Route path="/registerDetails" element={<RegisterDetails/>}/>
        <Route path='/studentDetails' element={<StudentDetails/>}/>
        <Route path='/mcqScore' element={<MCQScores/>}/>
        <Route path="/examDetails" element={<ExamDetails/>}/>
        <Route path="/resultAnalysis" element={<ResultAnalysis/>}/>
        <Route path="/add" element={<AddResults/>}/>
        <Route path="/result" element={<ResultsPage/>}/>

      </Routes>
    </Router>
    
  );
}

export default App;
