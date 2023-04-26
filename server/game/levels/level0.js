// TODO: Don't hardcode imgUrl. Build it in game.js

const level0 = {
    "rooms": [
        {
            "id": "0",
            "name": "the start",
            "type": 'room',
            "connectedTo": ["1"],
            "description": "The room is a maddening mono-yellow and the carpet is unplesently moist. It's hard to think over the hum-buzz of the fluorescent lights. \"Look\" around?",
            "look": "It looks to go on forever. I guess just \"move\".",
            "imgUrl": "http://localhost:8000/images/level0_hallway.jpeg",
        },
        {
            "id": "1",
            "name": "endless hallway",
            "type":"room",
            "connectedTo": ["0","2","3"],
            "description": "It's the same room over and over and over...You think you hear something move in a near by room.",
            "look": "The hallway splits off at an impossible angle. \"Where\" could you possibly want to go?",
            "imgUrl": "http://localhost:8000/images/level0_hallway.jpeg",
        },
        {
            "id": "2",
            "name": "an exit sign",
            "type": "monster",
            "connectedTo": ["1"],
            "description": "From the door leading to the exit a huminod figure enters.",
            "look": "You can't look away. It looks at you and your ears start to ring. \"RUN\"!",
            "imgUrl": "http://localhost:8000/images/level0_monster.jpg",
        },
        {
            "id": "3",
            "name" : "something strange",
            "type": "noclip",
            "connectedTo": ["1"],
            "description": "The same room as the last. Something feels off.",
            "look": "The wallpaper pattern is non-euclidean...a place to \"noclip\"?",
            "imgUrl": "http://localhost:8000/images/level0_end.jpg",
        }
    ]
}

module.exports = JSON.stringify(level0);

const map = 
[
    1,
    2,3,
    4
]