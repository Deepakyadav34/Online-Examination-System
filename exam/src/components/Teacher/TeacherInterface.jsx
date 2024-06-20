import React, { useState, useRef, useEffect } from 'react';
import Dashboard from './Dashboard';
import styles from './TeacherInterface.module.css'; // New CSS module for TeacherInterface

const TeacherInterface = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [screenStream, setScreenStream] = useState(null);
  const [webcamStream, setWebcamStream] = useState(null);
  const screenVideoRef = useRef(null);
  const webcamVideoRef = useRef(null);

  // Function to start screen capture
  const startScreenCapture = async () => {
    try {
      const capturedScreenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenStream(capturedScreenStream);
      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = capturedScreenStream;
      }
    } catch (err) {
      console.error("Error capturing the screen: ", err);
    }
  };

  // Function to start webcam capture
  const startWebcamCapture = async () => {
    try {
      const capturedWebcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setWebcamStream(capturedWebcamStream);
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = capturedWebcamStream;
      }
    } catch (err) {
      console.error("Error accessing the webcam: ", err);
    }
  };

  // Function to stop both captures
  const stopCapture = () => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
    }
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
  };

  // Handle monitor button click
  const handleMonitorClick = async () => {
    if (isMonitoring) {
      stopCapture();
    } else {
      await startScreenCapture();
      await startWebcamCapture();
    }
    setIsMonitoring(!isMonitoring);
  };

  // Clean up streams on component unmount
  useEffect(() => {
    return () => {
      stopCapture();
    };
  }, [screenStream, webcamStream]);

  return (
    <div className={styles.container}>
      <Dashboard />
      <div className={styles.content}>
        <h2>Student Monitoring</h2>
        <button onClick={handleMonitorClick}>
          {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
        </button>
        {isMonitoring && (
          <div className={styles.videos}>
            <div>
              <h3>Screen Capture</h3>
              <video ref={screenVideoRef} autoPlay playsInline />
            </div>
            <div>
              <h3>Webcam Capture</h3>
              <videoes ref={webcamVideoRef} autoPlay playsInline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherInterface;
