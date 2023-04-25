import React, {useState, useEffect, useRef} from 'react';
import {socket} from '../socket';
import styled from 'styled-components'

export default function Display(){

    const [roomImgUrl, setRoomImgUrl] = useState("http://localhost:8000/images/level0_hallway.jpeg")

    useEffect(() => {
        socket.on('new room', onNewRoom);
    
        return () => {
          socket.off('new room', onNewRoom);
        };
      }, []);

    const onNewRoom = (newRoomImgUrl: string) => {
        setRoomImgUrl(newRoomImgUrl);
    }
    
    return(
      <Room>
        <LocationImg src={roomImgUrl}/>
      </Room>
    );
}

interface NewRoomEvent{
    imgUrl: string;
}

const Room = styled.div`
    align-self: center; 
`

const LocationImg = styled.img`
    height: 600px;
`