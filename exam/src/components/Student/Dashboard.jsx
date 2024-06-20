
import { Routes, Route, Link } from 'react-router-dom';
import McqQuiz from './McqQuiz';
import CodingQuestion from './CodingQuestion';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="McqQuiz">Mcq Quiz</Link>
        <Link to="CodingQuestion">Another Component</Link>
      </nav>
      <Routes>
        <Route path="/quiz" element={<McqQuiz />} />
        <Route path="coding" element={<CodingQuestion />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
