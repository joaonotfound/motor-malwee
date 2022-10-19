import * as fs from 'fs'
import * as path from 'path'
import { Controller } from '../../presentation/models/controller-model'

export default (): Array<Controller>  => {
    const response: any = []
    const files = fs.readdirSync(path.join(__dirname, '..', '..', 'presentation', 'controllers'))
    files.forEach(file => {    
        if(path.extname(file) == '.js'){
            const module = require(path.join(__dirname, '..', '..', 'presentation', 'controllers', file))
            if(module.default != undefined){
                response.push(module.default)
        }}        
    })
    return response
}