const fs = require("fs")
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

const config = require("./src/config")

const PORT = 83

//glabal VARS
TIMEOUT = 0
FPS = 0
TELEMETRY = false

setInterval(() => {
    if (TIMEOUT > 0) {
        TIMEOUT -= 1

        console.clear()
        console.log("Connected!")
        console.log("FPS: " + FPS)
        FPS = 0

        let props = Object.keys(TELEMETRY)

        props.forEach(prop => {
            console.log(prop + ": " + TELEMETRY[prop])
        });
    }
    else {
        //console.log("connection timed out!")
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

    app.post("/stream", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const delay = Date.now() - req.body.time
        res.end(JSON.stringify(delay))

        io.emit("frame", req.body.frame)
        FPS += 1
    })

    app.post("/controlsInput", (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        io.emit("controls", req.body)

        res.end("ok")
    })

    app.post("/telemetry", (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        TELEMETRY = req.body
        io.emit("telemetry", req.body)

        res.end()
    })

    app.post("/shell_execute", (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        io.emit("shell_execute", req.body)

        res.end("command dispatched")
    })

    app.post("/shell_stdout", (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        io.emit("shell_stdout", req.body)
        res.end("done")
    })
}

initiate() 
