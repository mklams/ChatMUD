const level0 = {
    "rooms": [
        {
            Id: "1",
            Type: 'start',
            ConnectedTo: ["2"],
            Description: "The room is a maddening mono-yellow and the carpet is unplesently moist. It's hard to think over the hum-buzz of the fluorescent lights."
        },
        {
            Id: "2",
            Type:"room",
            ConnectedTo: ["3","4"],
        },
        {
            Id: "3",
            Type: "monster",
            ConnectedTo: ["2"],
        },
        {
            Id: "4",
            Type: "end",
            ConnectedTo: ["2"],
        }
    ]
}

const map = 
[
    1,
    2,3,
    4
]
