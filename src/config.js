GLOBAL_CONFIG = {
    stream: {
        camera: {
            fps: 30,
            width: 858,
            height: 480
        },
        transmission: {

        }
    }
}

module.exports = {
    get: function() {
        return GLOBAL_CONFIG
    }
}