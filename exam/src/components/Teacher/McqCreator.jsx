import React, { useState } from "react";
import Dashboard from "./Dashboard";

function McqCreator() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newCorrectOption, setNewCorrectOption] = useState("");

  const handleNewOptionChange = (e, index) => {
    const updatedOptions = newOptions.map((option, i) =>
      i === index ? e.target.value : option
    );
    setNewOptions(updatedOptions);
  };

  const submitQuestion = async (questionData) => {
    try {
      const response = await fetch(' http://localhost:3001/mcqs', {
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
      setQuestions([...questions, result]);
      return true; // Indicate success
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Failed to submit question: ' + error.message);
      return false; // Indicate failure
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newQuestion || !newOptions.every(option => option) || !newCorrectOption) {
      alert("Please fill out all fields.");
      return;
    }
    if (newOptions.indexOf(newCorrectOption) === -1) {
      alert("Correct answer must match one of the options exactly.");
      return;
    }

    const question = {
      question: newQuestion,
      options: newOptions,
      correctAnswer: newCorrectOption,
    };

    const success = await submitQuestion(question);
    if (success) {
      setQuestions([...questions, question]);

      // Reset form only on successful submission
      setNewQuestion("");
      setNewOptions(["", "", "", ""]);
      setNewCorrectOption("");
    }
  };

  return (
    <>
    <Dashboard/>
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '5px', 
      padding: '20px', 
      margin: '20px auto', 
      maxWidth: '600px', 
      backgroundColor:'whitesmoke'
    }}>
      <h2>Create New MCQ Question</h2>
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Question:</label><br/>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        </div>
        {newOptions.map((option, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <label>Option {index + 1}:</label><br/>
            <input
              type="text"
              value={option}
              onChange={(e) => handleNewOptionChange(e, index)}
            />
          </div>
        ))}
        <div style={{ marginBottom: '10px' }}>
          <label>Correct Answer:</label><br/>
          <input
            type="text"
            value={newCorrectOption}
            onChange={(e) => setNewCorrectOption(e.target.value)}
          />
        </div>
        <button type="submit">Add Question</button>
      </form>

      {questions.length > 0 && (
        <>
          <h3>Questions</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={index} style={{ 
                border: '1px solid #ccc', 
                borderRadius: '5px', 
                padding: '10px', 
                margin: '10px 0', 
                listStyle: 'none' 
              }}>
                <p>{q.question}</p>
                <ul>
                  {q.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
                <p>Correct Answer: {q.correctAnswer}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
    </>
  );
}

export default McqCreator;
