import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./Mcq.css";

function McqQuiz() {
  const [mcqs, setMcqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [attemptedQuestions, setAttemptedQuestions] = useState(new Set());
  const [score, setScore] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [movementWarning, setMovementWarning] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const webcamRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
    fetch("http://localhost:3001/mcqs")
      .then((response) => response.json())
      .then((data) => setMcqs(data))
      .catch((error) => console.error("Failed to fetch MCQs:", error));
      const interval = setInterval(() => {
        sendSnapshot();
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            handleQuizEnd();
            return prevTimeLeft;
          } else if ((300 - prevTimeLeft) % 70 === 0) {
            const nextQuestion = activeIndex + 1;
            if (nextQuestion < mcqs.length) {
              setActiveIndex(nextQuestion);
              setSelectedAnswer(null);
            } else {
              handleQuizEnd();
            }
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    
      return () => clearInterval(interval);
    }, [activeIndex]);
    

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        incrementWarningCount();
        setShowWarningModal(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleQuizEnd();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (warningCount >= 4) {
      alert(`Exam closed due to multiple tab switches.`);
      closeExam();
    }
  }, [warningCount]);

  const closeExam = () => {
    window.location.href = "/sidebar";
  };

  const incrementWarningCount = () => {
    setWarningCount((prevCount) => prevCount + 1);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setAttemptedQuestions(new Set(attemptedQuestions.add(activeIndex)));
  };

  const handleSubmit = () => {
    if (
      mcqs.length > 0 &&
      selectedAnswer === mcqs[activeIndex]?.correctAnswer
    ) {
      setScore(score + 1);
    }

    const nextQuestion = activeIndex + 1;
    if (nextQuestion < mcqs.length) {
      setActiveIndex(nextQuestion);
      setSelectedAnswer(null);
    } else {
      handleQuizEnd();
    }
  };

  const handleQuizEnd = () => {
    const name = prompt("Please enter your name:");
    fetch("http://localhost:3001/submit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score }),
    })
      .then(() => {
        alert(`Quiz finished. Your score: ${score}`);
      })
      .catch((error) => console.error("Failed to submit score:", error));
  };

  const sendSnapshot = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      fetch("http://localhost:3001/snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageSrc }),
      }).catch((error) => {
        console.error("Failed to send snapshot:", error);
      });
    }
  };

  const handleQuestionClick = (index) => {
    setActiveIndex(index);
    setSelectedAnswer(null);
  };

  const handleClearResponse = () => {
    setSelectedAnswer(null);
    setAttemptedQuestions(
      new Set([...attemptedQuestions].filter((index) => index !== activeIndex))
    );
  };

  const handleMarkForReviewAndNext = () => {
    setAttemptedQuestions(new Set(attemptedQuestions.add(activeIndex)));
    setSelectedAnswer(null);
    setActiveIndex(activeIndex + 1);
  };

  const chunkSize = 35;
  const mcqsInChunks = [];
  for (let i = 0; i < mcqs.length; i += chunkSize) {
    mcqsInChunks.push(mcqs.slice(i, i + chunkSize));
  }

  return (
    <div className="container">
      <div className="main-content">
        <div className="webcam-container">
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: "15%", height: "auto" }} />
        </div>
        <h4> ▌║█║▌│║▌│║▌║▌█║MCQ QUIZ ▌│║▌║▌│║║▌█║▌║█</h4>
        <p style={{color:'black'}}>Time Left: {timeLeft} seconds</p>
        <p style={{color:'black'}}>Question {activeIndex + 1}/{mcqs.length}</p>
        {mcqs[activeIndex] && (
          <>
            <h2>{mcqs[activeIndex].question}</h2>
            <ul>
              {mcqs[activeIndex].options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`${attemptedQuestions.has(activeIndex) ? "attempted" : "unattempted"}`}
                  style={{ backgroundColor: selectedAnswer === option ? "lightgray" : "white" }}
                >
                  <input type="radio" name={`question-${activeIndex}`} value={option} readOnly />
                  {option}
                </li>
              ))}
            </ul>
          </>
        )}
        {showWarningModal && (
          <div className="warning-modal">
            <p style={{color:"black"}}>You switched tabs or navigated away from the quiz. This could affect your results.</p>
            <button onClick={() => setShowWarningModal(false)}>Understood</button>
          </div>
        )}
        {movementWarning && (
          <div className="warning-modal">
            <p>Significant movement detected. Please remain in view of the camera.</p>
            <button onClick={() => setMovementWarning(false)}>Understood</button>
          </div>
        )}
        <div className="buttons-container">
          <button onClick={handleSubmit} style={{ width: '150px', height: '40px' }}>Submit</button>
          <button onClick={handleClearResponse} style={{ width: '150px', height: '40px' }}>Clear Response</button>
          <button onClick={handleMarkForReviewAndNext} style={{ width: '200px', height: '40px' }}>Mark for Review & Next</button>
        </div>
      </div>
      <nav className="sidebar">
        {mcqsInChunks.map((chunk, chunkIndex) => (
          <ul key={chunkIndex}>
            {chunk.map((_, index) => {
              const globalIndex = chunkIndex * chunkSize + index;
              return (
                <li
                  key={globalIndex}
                  onClick={() => handleQuestionClick(globalIndex)}
                >
                  <span
                    className={`question-circle ${
                      globalIndex === activeIndex
                        ? "active"
                        : attemptedQuestions.has(globalIndex)
                        ? "attempted"
                        : "unattempted"
                    }`}
                  >
                    {globalIndex + 1}
                  </span>
                </li>
              );
            })}
          </ul>
        ))}
      </nav>
    </div>
  );
}

export default McqQuiz;
