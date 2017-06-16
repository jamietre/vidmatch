
function manageWindowsSigint(process) {
    if (process.platform === 'win32') {
        var rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('SIGINT', function () {
            process.emit('SIGINT');
        });
    }
}


export default class SigIntHandler {
    constructor(_process) {
        this.process = _process;
        manageWindowsSigint(_process);
        
        this.process.on('SIGINT', this.interrupt.bind(this));

    }

    onInterrupt(cb) {
        this.cb = cb;
    }

    interrupt() {
        this.cb(this);
    }
    exit(code) {
        this.process.exit(code);
    }
}


