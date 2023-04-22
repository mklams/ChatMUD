import React, {useState, useEffect, useRef} from 'react';
import {socket} from '../socket';
import TextInput from './TextInput';
import styled from 'styled-components'

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
        <Chat>
            <Terminal>
                <ul id="messages">{showMessages()}</ul>
                <div ref={bottomRef} />
            </Terminal>
            <KeyboardInput>
              <TextInput />
            </KeyboardInput>
        </Chat>
    );
}

const Terminal = styled.div`
  color: white;
  ul { list-style-type: none; }
  margin: 0; padding: 0;
  li { padding: 0.5rem 0rem; }
`
const KeyboardInput = styled.div`
  height: 30px;
`

const Chat = styled.div`
  //#messages > li:nth-child(odd) { background: #efefef; }
  //padding-bottom: 3rem;
  //margin-bottom: 0em;
`

