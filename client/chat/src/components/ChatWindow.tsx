import React, {useState, useEffect, ChangeEvent} from 'react';
import {socket} from '../socket';
import TextInput from './TextInput';

export default function ChatWindow(){
    const [messages, setMessages] = useState<string[]>([]);
    
    useEffect(() => {
        socket.on('chat message', onGetChatMessage);
    
        return () => {
          socket.off('chat message', onGetChatMessage);
        };
      }, []);

    const onGetChatMessage = (msg: string) => {
        setMessages(oldMessages => [
          ...oldMessages,
          msg
        ])
       
      } 

      const showMessages = () =>{
        return messages.map((message) => {
          return <li>{message}</li>
        })
      }

    return (
        <div>
          <ul id="messages">{showMessages()}</ul>
            <TextInput />
        </div>
        );
}