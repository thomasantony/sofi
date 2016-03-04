
var SOCKET_URL = "ws://127.0.0.1:9000"
var socket

function init() {
    socket = new WebSocket(SOCKET_URL)

    socket.onopen = function(event) {
        console.log("Connected to websocket server at " + SOCKET_URL)
        socket.send(JSON.stringify({ "event": "init" }))
    }

    socket.onmessage = function(event) {
        console.log("Received: " + event.data)

        command = JSON.parse(event.data)

        if (command.name == "init") {
            if (command.html)
                d3.select("html").html(command.html)

            load()
        }
    }
}

function load() {
    socket.send(JSON.stringify({ "event": "load" }))
}

window.onload = function(event) {
    init()
}