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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./client"))
app.use(express.json({ limit: "1mb"}))

setInterval(() => {
    if (TIMEOUT > 0) {
        TIMEOUT -= 1
    }
    if (TIMEOUT == 0) {
        connect()
    }
}, 1000);

function connect() {
    console.log("attempting to connect...")
    io.emit("carConnect", config.get())
}

function initiate() {
    server.listen(process.env.PORT || PORT, () => {
        console.clear()
        console.log("-> Online on Port " + PORT)
        connect()
    })

    app.post("/pulse", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const delay = Date.now() - req.body.time
        res.end(JSON.stringify(delay))

        if (TIMEOUT == 0) {
            console.clear()
            console.log("connectedtion established!")
        }

        TIMEOUT = 5
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
        console.log(req.body)

        res.end()
    })
}

initiate()
//display()