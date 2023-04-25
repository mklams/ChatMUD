import React, {useEffect} from 'react';
import ChatWindow from './components/ChatWindow';
import {socket} from './socket';
import styled from 'styled-components'
import Display from './components/Display';

export default function App() {

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);  

  return (
    <Game>
      <Display />
      <Controls>
        <ChatWindow />
      </Controls>
    </Game>
  );
}

const Game = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #211c26;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`

const Controls = styled.div`
  flex-grow: 1;
  overflow-y: scroll;

`