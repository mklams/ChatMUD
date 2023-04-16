import React, {useState, useEffect, ChangeEvent} from 'react';
import {socket} from '../socket';

export default function TextInput(){
    const [userInput, setUserInput] = useState("");

    const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    }

    const sendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        socket.emit('chat message', userInput);
        setUserInput("");
      }

    return(
        <form id="form" onSubmit={sendMessage}>
        <input id="input" value ={userInput} onChange={handleUserInput} autoComplete="off"/>
        <button>Send</button>
      </form>  
    )
}