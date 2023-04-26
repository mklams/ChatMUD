// TODO: Don't hardcode imgUrl. Build it in game.js

const level0 = {
    "rooms": [
        {
            "id": "0",
            "name": "the start",
            "type": 'room',
            "connectedTo": ["1"],
            "description": "The room is a maddening mono-yellow and the carpet is unplesently moist. It's hard to think over the hum-buzz of the fluorescent lights.",
            "look": "It looks to go on forever. I guess just \"move\".",
            "imgUrl": "http://localhost:8000/images/level0_hallway.jpeg",
        },
        {
            "id": "1",
            "name": "endless hallway",
            "type":"room",
            "connectedTo": ["0","2","3"],
            "description": "It's the same room over and over and over...You think you hear something move in a near by room. \"Look\" around?",
            "look": "\"Where\" could you possibly want to go?",
            "imgUrl": "http://localhost:8000/images/level0_hallway.jpeg",
        },
        {
            "id": "2",
            "name": "an exit sign",
            "type": "monster",
            "connectedTo": ["1"],
            "description": "On the opposite side a huminod figure enters. It seems chaotic.",
            "look": "You can't comprenhend if it's made of flesh or someting else. \"RUN\"!",
            "imgUrl": "http://localhost:8000/images/level0_monster.jpg",
        },
        {
            "id": "3",
            "name" : "something strange",
            "type": "noclip",
            "connectedTo": ["1"],
            "description": "The same room as the last. Something feels off.",
            "look": "The wallpaper is moist. The pattern is non-euclidean...a place to \"noclip\"?",
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