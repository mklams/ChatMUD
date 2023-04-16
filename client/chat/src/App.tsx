import React, {useState, useEffect, ChangeEvent} from 'react';
import './App.css';
import {socket} from './socket';

function App() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    

    socket.on('chat message', onGetChatMessage);

    socket.connect();

    return () => {
      socket.off('chat message', onGetChatMessage);
      socket.disconnect();
    };
  }, []);

  const onGetChatMessage = (msg: string) => {
    setMessages(oldMessages => [
      ...oldMessages,
      msg
    ])
   
  } 

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  }

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    socket.emit('chat message', userInput);
    setUserInput("");
  }

  const showMessages = () =>{
    return messages.map((message) => {
      return <li>{message}</li>
    })
  }

  return (
  <div>
    <ul id="messages">{showMessages()}</ul>
    <form id="form" onSubmit={sendMessage}>
      <input id="input" value ={userInput} onChange={handleUserInput} autoComplete="off"/>
      <button>Send</button>
    </form>
  </div>
  );
}

export default App;
