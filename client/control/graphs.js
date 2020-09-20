function updateSpeedDisplay(telemetry) {
    powerPercentage = Math.round(100 * telemetry.esc)

    if (powerPercentage < 0) {
        powerPercentage = powerPercentage * -1
    }

    document.getElementById("speedIndicatorText").innerHTML = powerPercentage + "%"
    speedIndicator.set(powerPercentage);
}

function initiateSpeedDisplay() {
    var opts = {
        angle: 0.2, // The span of the gauge arc
        lineWidth: 0.1, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
          length: 0.6, // // Relative to gauge radius
          strokeWidth: 0.035, // The thickness
          color: '#000000' // Fill color
        },
        limitMax: false,     // If false, max value increases automatically if value > maxValue
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#3498db',   // Colors
        colorStop: '#3498db',    // just experiment with them
        strokeColor: '#FFFFFF',  // to see which ones work best for you
        generateGradient: false,
        highDpiSupport: true,     // High resolution support
    };

    var target = document.getElementById('gaugeSpeed'); // your canvas element
    speedIndicator = new Donut(target).setOptions(opts) // create sexy gauge!
    speedIndicator.maxValue = 100; // set max gauge value
    speedIndicator.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    speedIndicator.animationSpeed = 32; // set animation speed (32 is default value)
}

initiateSpeedDisplay()