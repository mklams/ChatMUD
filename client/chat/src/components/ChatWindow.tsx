import React, {useState, useEffect, useRef} from 'react';
import {socket} from '../socket';
import TextInput from './TextInput';

export default function ChatWindow(){
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<string[]>([]);
    
    useEffect(() => {
        socket.on('chat message', onGetChatMessage);
    
        return () => {
          socket.off('chat message', onGetChatMessage);
        };
      }, []);

    useEffect(() => {
        // scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages]);

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
            <div>
                <ul id="messages">{showMessages()}</ul>
                <div ref={bottomRef} />
            </div>
            <TextInput />
        </div>
    );
}