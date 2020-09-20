var speedIndicator = ""
var distanceIndicator = ""

function updateTelemetry(telemetry) {
    //updateSpeedDisplay(telemetry)

    updateStatus(telemetry)
}

function updateStatus(telemetry) {
    const root = vie.get(".smallStatus")
    let properties = Object.keys(telemetry)

    properties.forEach(property => {
        if (vie.get("#status_" + property).length != 0) {
            vie.get("#status_" + property).innerHTML = property + ": " + telemetry[property]
        }
        else {
            let row = vie.new("p", "#status_" + property, property + ": " + telemetry[property])
            root.appendChild(row)
        }
    });
}