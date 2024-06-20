import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExamResults = ({ studentId }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/exam-results/${studentId}`);
        setResults(response.data);
      } catch (error) {
        console.error('Failed to fetch exam results:', error);
      }
    };

    fetchResults();
  }, [studentId]);

  if (!results) {
    return <div>Loading results...</div>;
  }

  return (
    <div>
      <h2>Exam Results</h2>
      <p>Score: {results.score}%</p>
      <p>Total Questions: {results.totalQuestions}</p>
      <p>Correct Answers: {results.correctAnswers}</p>
      <p>Wrong Answers: {results.wrongAnswers}</p>
      <div>
        <h3>Detailed Results:</h3>
        {results.detailedResults.map((item, index) => (
          <div key={index}>
            <p><strong>Question:</strong> {item.question}</p>
            <p><strong>Your Answer:</strong> {item.selectedAnswer}</p>
            <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
            <p><strong>Result:</strong> {item.isCorrect ? 'Correct' : 'Incorrect'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamResults;
