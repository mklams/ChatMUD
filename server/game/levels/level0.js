const level0 = {
    "rooms": [
        {
            "id": "0",
            "type": 'room',
            "connectedTo": ["1"],
            "description": "The room is a maddening mono-yellow and the carpet is unplesently moist. It's hard to think over the hum-buzz of the fluorescent lights.",
            "look": "It looks to go on forever. I guess just ~move~."
        },
        {
            "id": "1",
            "type":"room",
            "connectedTo": ["2","3"],
            "description": "It's the same room over and over and over...You think you hear something move in a near by room. ~Look~ around?",
            "look": "A room to the left (~move 2~) and a room to the right (~move 3~)"
        },
        {
            "id": "2",
            "type": "monster",
            "connectedTo": ["1"],
            "description": "On the opposite side a huminod figure enters. It seems chaotic.",
            "look": "You can't comprenhend if it's made of flesh or someting else. ~RUN~!"
        },
        {
            "id": "3",
            "type": "end",
            "connectedTo": ["1"],
            "description": "The same room as the last. Something feels off.",
            "look": "The wallpaper is moist. The pattern is non-euclidean...a place to ~noclip~?"
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