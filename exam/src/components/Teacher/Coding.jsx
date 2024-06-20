import React, { useState } from 'react';
import Dashboard from './Dashboard';

const Coding = () => {
  const [codingQuestions, setCodingQuestions] = useState([]);
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionDescription, setNewQuestionDescription] = useState("");
  const [showQuestions, setShowQuestions] = useState(false); 

  const submitQuestion = async (questionData) => {
    try {
      const response = await fetch('http://localhost:3001/coding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit question');
      }
      const result = await response.json();
      console.log('Question submitted successfully:', result);
      setCodingQuestions(prevQuestions => [...prevQuestions, result]);
      return true; 
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Failed to submit question: ' + error.message);
      return false; 
    }
  };

  const handleAddCodingQuestion = () => {
    if (!newQuestionTitle.trim() || !newQuestionDescription.trim()) {
      alert("Please fill out both the title and description for the question.");
      return;
    }

    const newQuestion = {
      title: newQuestionTitle,
      description: newQuestionDescription,
    };

    submitQuestion(newQuestion);

    setNewQuestionTitle("");
    setNewQuestionDescription("");
  };

  const handleSubmitQuestions = () => {
    if (codingQuestions.length === 0) {
      alert("No questions to submit.");
      return;
    }
    setShowQuestions(!showQuestions);
  };

  return (
    <>
    <Dashboard/>
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '5px', 
      padding: '20px', 
      margin: '20px auto', 
      maxWidth: '600px' ,
      backgroundColor:'whitesmoke'
    }}>
      <h2>Create a Coding Question</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Title:</label><br/>
        <input
          type="text"
          value={newQuestionTitle}
          onChange={(e) => setNewQuestionTitle(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Description:</label><br/>
        <textarea
          value={newQuestionDescription}
          onChange={(e) => setNewQuestionDescription(e.target.value)}
        />
      </div>
      <button onClick={handleAddCodingQuestion} >Add Question</button>
      <button onClick={handleSubmitQuestions} style={{marginTop:'30px'}}>Submit Questions</button>

      {showQuestions && (
        <div>
          <h3>Questions Preview:</h3>
          {codingQuestions.map((question, index) => (
            <div key={index} style={{ 
              border: '1px solid #ccc', 
              borderRadius: '5px', 
              padding: '10px', 
              margin: '10px 0' 
            }}>
              <h4>{question.title}</h4>
              <p>{question.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Coding;
