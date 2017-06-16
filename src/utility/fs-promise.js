import fs from "fs"
import { promisify } from './helpers'

const readdir = promisify(fs, 'readdir')
const stat = promisify(fs, 'stat')
const path = (root, ...segments) => {
    return fs.path.join(root, segments).replace('\\','/')
}

export { readdir, stat, path }

