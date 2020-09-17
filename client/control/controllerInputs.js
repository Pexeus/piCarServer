CONTROLLER = {
    axes: false
}

CONTROLLER_CONNECTED = false

window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected")
    CONTROLLER_CONNECTED = true

    var gamepad = navigator.getGamepads()[0];
    
    updateControllerStatus(gamepad.id)

    //loop starten
    updateControls()
})

window.addEventListener("gamepaddisconnected", function(e) {
    console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);

    CONTROLLER_CONNECTED = false
});

function updateControls() {
    if (CONTROLLER_CONNECTED == true) {
        var gamepad = navigator.getGamepads()[0];

        CONTROLLER.axes = gamepad.axes
        CONTROLLER.paddles = [gamepad.buttons[6].value, gamepad.buttons[7].value]
    }
    else {
        CONTROLLER = {
            axes: false
        }
    }

    sendControls()
}

function sendControls() {
    axios.post("/controlsInput", CONTROLLER).then(resp => {
        setTimeout(() => {
            updateControls()
        }, 10);
    });
}