var FRAMES = 0
var SECONDS = 0
var FPS = 0;

function updateControllerStatus(name) {
    document.getElementById("controllerStatus").innerHTML = "Controller: " + name
}


function updateFPS() {
    output = document.getElementById("fps")

    output.innerHTML = "FPS: " + Math.round(FPS)
}

setInterval(() => {
    SECONDS += 1

    FPS = FRAMES / SECONDS

    updateFPS()

    if (SECONDS > 3) {
        SECONDS = 0
        FRAMES = 0
    }
}, 1000);