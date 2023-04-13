import fs from 'fs';
import path from 'path';
import fsp from 'fs/promises'
// import axios from 'axios';

export const api = {
    // validate if path exists
    existPath: (userPath) => fs.existsSync(userPath),

    // validate if path is absolute
    isAbsolutePath: (userPath) => path.isAbsolute(userPath),

    // if path is relative, transform to absolute
    convertToAbsolutePath: (userPath) => path.resolve(userPath),

    // validate if it is a directory
    isPathDirectory: (userPath) => fs.lstatSync(userPath).isDirectory(),

    // validate if it is a md file
    isMdFile: (userPath) => path.extname(userPath) === '.md',

    // read the file
    readMdFile: (userPath) => fsp.readFile(userPath, "utf8"),

}
// console.log(api.existPath('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links'))
// console.log(api.existPath('../DEV004-data-lovers'))
// console.log(api.convertToAbsolutePath('../DEV004-data-lovers'))

console.log(api.readMdFile('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/README.md'))
