import _ from 'lodash';

const eol = require('os').EOL;
const spawn = require("child_process").spawn

let id = 0;
const colors = {
    yellow: '\x1B[33m',
    clear: '\x1B[0m'
};


function createChildProcess(command, args, detached, stdio, cwd) {
    var child = spawn(command, args, {
        detached: detached,
        stdio: stdio,
        cwd: cwd
    });

    if (detached) {
        child.unref();
    }
    return child;
}

function normalizeEndings(text) {  
  text = text.replace(/\r\n/g, '\n');
  text = text.replace(/[\n]{2,}/g, '\n');
  text = text.replace(/[\b]/g, '');
  text = text.replace(/\n/g, eol);

  return text;
}



export default class Process {
    
    /**
     * Creates an instance of Process.
     * 
     * @param {function} log A method to receive log messages
     * @param {string} cmd The command
     * @param {Array<string>} args Arguments to pass to the command
     * @param {string} cwd Path to the current working directory to use for the process
     */
    constructor(log, cmd, args, cwd) {
        this._process = {
            cmd: cmd,
            args: args || [],
            cwd: cwd || process.cwd(),
            id: id++
        };

        this.log = log;
        this.first = true;

        this.events = [];

        this._logOutputDebounced = _.throttle(this._logOutput.bind(this), 500, {
            //leading: true,
            trailing: true
        });
    }

    start() {


        if (this.first) { 
            this.log(`Starting "${this.name()}"" with args "${this._process.args.join(" ")}" ...`)
            this.first = false;
        }

        this.childProcess = createChildProcess(this._process.cmd, 
            this._process.args, 
            false, 
            ["pipe", "pipe", "pipe"],
            this._process.cwd);

        this._bindEvents();
    }


    exit(code) {
        if (!this.childProcess) {
            throw new Error("Can't exit: process not running");
        }

        if (!this.restarting) {
            this.log(`Stopping '${this.name()}'...`)
        }

        if (code === 1) {
            this.childProcess.kill('SIGINT');
        } else {
            this.childProcess.kill('SIGINT');
        }
    }

    name() {
        return `${this._process.cmd}(${this._process.id})`;
    }

    restart() {
        if (this.restarting) {
            return;
        }
        this.log(`Restarting '${this.name()}'...`)
        this.restarting = true;

        if (this.childProcess) {
            this.exit(1);
        } else {
            this.start();
        }

    }
    state() {
        return this.childProcess ? "started" : "stopped";
    }
    on(name, cb) {
        this.events.push({
            name: name,
            cb: cb
        });

        // if (this.childProcess) {
        //     this.childProcess.on(name, cb);
        // }
    }

    emit(name, value) {
        this.events.forEach((evt) => {
            if (evt.name === name) {
                evt.cb.call(this, value);
            }
        })
    }

    _bindEvents() {
        // this.events.forEach((obj) => {
        //     this.childProcess.on(obj.name, obj.cb);
        // });

        this.childProcess.once('exit', this._killed.bind(this));

        this._buffer={};

        this.childProcess.stdout.on('data', (chunk)=> {
            this._logOutputFiltered('out', chunk.toString())
        });
        this.childProcess.stderr.on('data', (chunk) => {
            this._logOutputFiltered('err', chunk.toString())
        });
    }

    _logOutputFiltered(name, text) {
        

        if (/[\b]/.test(text) || !/[\n]/.test(text)) {
            return this._logOutputDebounced(name, text);
        } else {
            this._logOutput(name, text);
        }

        
    }

    _logOutput(name, chunk) {
        if (!chunk.length) {
            return;
        }
        let text = normalizeEndings(chunk);

        let lines = text.split(eol)
            .map(e => e.trim())
            .filter(e => e.length>0);

        // let buffer = this._buffer[name] || '';

        // if (buffer !== '') {
        //     lines[0] = buffer + lines[0];
        // }

        let totalLines = lines.length;

        // if (!text.endsWith(eol)) {
        //     this._buffer[name] = lines[lines.length-1];
        //     totalLines--;
        // }


        for (let i=0; i<totalLines; i++) {
            const text = name === 'err' ? `${colors.yellow}${lines[i]}${colors.clear}` : lines[i];
            this.log(`${this.name()}: ${text}`);
        }
    }

    _killed() {
        this.childProcess = null;

        if (this.restarting) {
            this.restarting = false;
            this.start();
        } else {
            this.emit('quit');
        }
    }
}
