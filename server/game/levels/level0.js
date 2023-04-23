const level0 = {
    "rooms": [
        {
            "id": "0",
            "type": 'room',
            "connectedTo": ["1"],
            "description": "The room is a maddening mono-yellow and the carpet is unplesently moist. It's hard to think over the hum-buzz of the fluorescent lights."
        },
        {
            "id": "1",
            "type":"room",
            "connectedTo": ["2","3"],
        },
        {
            "id": "2",
            "type": "monster",
            "connectedTo": ["1"],
        },
        {
            "id": "3",
            "type": "end",
            "connectedTo": ["1"],
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