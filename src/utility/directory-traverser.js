import { fs, path } from './fs-promise'
import iter from 'iter8'

function traverse(root, cb) {
    return fs.readDir(root).then((files)=>files.map((name)=> {
        return fs.stat(path.join(root, name)).then((stats)=>{
            return {
                path: root,
                name,
                isDirectory: stats.isDirectory(),
            }
        })
    })).then((stats)=> {

        iter(stats)
            .orderBy(e=>e.isDirectory ? 0 : 1)
            .thenBy('name')
            .forEach((e)=> {
                if (e.isDirectory) {
                    
                    traverse(path.join(root, e.name), cb)
                }
            })
    })
}  

export default traverse;