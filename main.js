const fs = require("fs")
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

const config = require("./src/config")

const PORT = 80

//still connected check
TIMEOUT = 0

setInterval(() => {
    if (TIMEOUT > 0) {
        TIMEOUT -= 1
    }
    else {
        console.log("connection timed out!")
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

    app.post("/pulse", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end("ok")

        TIMEOUT = 3
    })

    app.post("/initConnection", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(config.get()))

        console.clear()
        console.log("connectedtion established!")
    })

    app.post("/stream", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const delay = Date.now() - req.body.time
        res.end(JSON.stringify(delay))

        io.emit("frame", req.body.frame)
    })

    app.post("/controlsInput", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        io.emit("controls", req.body)

        res.end("ok")
    })

    app.post("/telemetry", (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        io.emit("telemetry", req.body)

        res.end()
    })
}

initiate() 