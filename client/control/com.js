const HOST = "/"
const socket = io.connect(HOST)
const display = document.getElementById("display")

FRAME = ""


socket.on("frame", (data) => {
    FRAME = data
    FRAMES += 1

    renderFrame()
})

function renderFrame() {
    display.src = `data:image/jpeg;base64, ${FRAME}`
}

socket.on("telemetry", (data) => {
    updateTelemetry(data)
})