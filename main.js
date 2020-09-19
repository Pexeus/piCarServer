const fs = require("fs")
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

const config = require("./src/config")

const PORT = 83

//still connected check
TIMEOUT = 10

setInterval(() => {
    if (TIMEOUT > -1) {
        TIMEOUT -= 1
    }
}, 1000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./client"))
app.use(express.json({ limit: "1mb"}))

function initiate() {
    server.listen(process.env.PORT || PORT, () => {
        console.clear()
        console.log("-> Online on Port " + PORT)
    })

    connect(config.get())
    tryConnect()

    app.post("/carPulse", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const delay = Date.now() - req.body.time
        res.end(JSON.stringify(delay))


        TIMEOUT = 5
    })

    app.post("/stream", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const delay = Date.now() - req.body.time
        res.end(JSON.stringify(delay))

        sendFrame(req.body.frame)
        TIMEOUT = 5
    })

    app.post("/controlsInput", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        io.emit("controls", req.body)

        res.end("ok")
    })

    app.post("/telemetry", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        console.log(req.body)

        res.end()
    })
}

function sendFrame(frame) {
    io.emit("frame", frame)
}

function tryConnect() {
    setInterval(() => {
        if (TIMEOUT < 1) {
            console.log("connection timed out, reconnecting...")
            connect(config.get())
        }
    }, 100);
}

function connect(conf) {
    io.emit("serverPulse", conf)
}

initiate()