import React, {useState, useEffect, ChangeEvent} from 'react';
import {socket} from '../socket';
import styled from 'styled-components'


interface TextInputProps{
  onInput: (input: string) => void;
}

export default function TextInput(props: TextInputProps){
    const [userInput, setUserInput] = useState("");

    const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    }

    const sendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        props.onInput(userInput);
        socket.emit('chat message', userInput);
        setUserInput("");
      }

    return(
      <TextForm onSubmit={sendMessage}>
        <KeyboardInput id="input" value ={userInput} onChange={handleUserInput} autoComplete="off"/>
        <SendBtn>Send</SendBtn>
      </TextForm>  
    )
}

const TextForm = styled.form`
  background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); 
`

const KeyboardInput = styled.input`
  border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem;

  :focus { outline: none; }
`

const SendBtn = styled.button`
  background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; 
`