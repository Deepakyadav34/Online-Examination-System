import { useEffect, useState } from "react";


const socket = new WebSocket("ws://localhost:3001/ws");

const useSocket = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      setData(jsonData);
    };
  }, []);

  const sendData = (message) => {
    socket.send(JSON.stringify(message));
  };

  return [data, sendData];
};

export default useSocket;
