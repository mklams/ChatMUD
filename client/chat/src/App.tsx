import React, {useEffect} from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import {socket} from './socket';

export default function App() {

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);  

  return (
    <ChatWindow />
  );
}
