import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import Webcam from "react-webcam";
import axios from "axios";
import "./Coding.css";

const CodingQuestion = () => {
  const [code, setCode] = useState("console.log('hello world!');");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const webcamRef = useRef(null);
  const editorRef = useRef(null);

  const languageOptions = {
    javascript: javascript(),
    python: python(),
    java: java(),
    cpp: cpp(),
  };

  const { setContainer } = useCodeMirror({
    container: editorRef.current,
    extensions: [languageOptions[language]],
    value: code,
    onChange: (value, viewUpdate) => {
      setCode(value);
    },
  });

  useEffect(() => {
    setContainer(editorRef.current);
  }, [setContainer, language]);

  const submitCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: language,
        source: code,
      });

      if (response.data.run.code !== 0) {
        setOutput("");
      } else {
        setOutput(response.data.run.stdout);
      }
    } catch (err) {
      console.error("Error executing code:", err);
      setOutput("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containers" style={{ width: "800px", margin: "auto" }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="20%"
        style={{ marginBottom: "20px" }}
      />
      <h2>Create a function to add two numbers:</h2>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>
      <div ref={editorRef} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }} />

      <button onClick={submitCode} className="submitCode" style={{ marginRight: "10px" }}>
        {loading ? "Running..." : "Run Code"}
      </button>

      {output && (
        <div className="output" style={{ marginTop: "20px" }}>
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
      <Link to="/another-page">
        <button style={{ marginTop: "20px" }}>Next</button>
      </Link>
    </div>
  );
};

export default CodingQuestion;
