/*eslint no-console: 0*/

import path from 'path'
import traverser from './utility/directory-traverser'

var opts = require('yargs')
    .alias('s', 'src')
    .describe('s', 'path to src folder')
    .alias('d', 'dest')
    .describe('d', 'path to destination file')
    .alias('h', 'help')
    .help('h')
    .argv;


const src = path.isAbsolute(opts.src) ? opts.src : path.join(__dirname, opts.src);
const dest = path.isAbsolute(opts.dest) ? opts.dest : path.join(__dirname, opts.dest);



app({
    gitStatus: gitStatus
},
    opts
).then(function (result) {
    process.exit(result ? 0 : 1);
}).catch((function (err) {
    console.log("ERROR: " + err)
    process.exit(1)
}))
