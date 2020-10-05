const HOST = "/"
const socket = io.connect(HOST)

function init() {
    console.log("Initiating....")
    document.getElementById("shellInput").value = ""

    axios.post("/shell_execute", {command: "cd", timestamp: Date.now()}).then(response => {
        console.log(response.data)
    })
}

document.body.addEventListener ("keypress", function (event) {
	if (event.key == "Enter") {
        command = document.getElementById("shellInput").value

        if (command != "") {
            console.log("sending command: " + command)
            document.getElementById("shellInput").value = ""

            axios.post("/shell_execute", {command: command, timestamp: Date.now()}).then(response => {
                console.log(response.data)
            })
        }
    }
});

socket.on("shell_stdout", (data) => {
    let output = document.getElementById("shellOutput")
    console.log(data)

    if (data.output != false) {
        output.innerHTML += data.output.stdout

        if (data.output.error != "") {
            output.innerHTML += "[ERROR] -> " + data.output.error
        }

        if (data.output.stderr != "") {
            output.innerHTML += "[STDERR] -> " + data.output.stderr
        }

        auto_grow(output)
    }

    if (data.location != false) {
        locationMarker = document.getElementById("location")
        locationMarker.innerHTML = data.location + " > "
    }

    window.scrollTo(0,document.body.scrollHeight);
})

init()