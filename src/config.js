GLOBAL_CONFIG = {
    stream: {
        camera: {
            fps: 30,
            width: 640,
            height: 360,
            rate: 3000000
        },
    }
}

module.exports = {
    get: function() {
        return GLOBAL_CONFIG
    }
}
