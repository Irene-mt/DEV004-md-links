import { api } from './api.js'
// import chalk from 'chalk';

export function mdFiles(path, options) {
    let mdPaths = [];
    let mdPath;
    return new Promise((resolve, reject) => {
        // validate uf the path exists
        if (!api.existPath(path)) {
            reject(new Error('This path does not exist.'))
        } else {
            const pathExist = path;
            let absolutPath;
            if (!api.isAbsolutePath(pathExist)) {
                absolutPath = api.convertToAbsolutePath(pathExist);
            } else {
                absolutPath = pathExist;
            }
            if (api.isPathDirectory(absolutPath)) {
                // read al the files in the directory
                const allFiles = api.readDirectory(absolutPath);
                // create a new path for every file
                allFiles.forEach((eachFile) => {
                    const newPath = `${absolutPath}/${eachFile}`;
                    // validate if the directory contains md files
                    if (api.isMdFile(newPath)) {
                        mdPaths.push(newPath);
                        resolve(mdPaths);
                    } else if (!api.isMdFile(newPath)) {
                        reject(new Error(('This directory does not contain any MD file. Try with a different path.')));
                    }
                })
            }
            if (api.isMdFile(absolutPath)) {
                mdPath = absolutPath;
                resolve(mdPath);
            } else {
                reject(new Error('This path is not a directory or a MD file.'))
            }
        }
    })
}

console.log(mdFiles('../DEV004-md-links/thumb.png'))

/* return new Promise((resolve, reject) => {
        // validate uf the path exists
        if (api.existPath(path)) {
            const pathExist = path;
            let absolutPath;
            // validate if the path is absolute
            if (api.isAbsolutePath(pathExist)) {
                absolutPath = pathExist;
                // console.log('abs', absolutPath)
                // if it is not, convert to absolute
            } else {
                absolutPath = api.convertToAbsolutePath(pathExist);
                // console.log('rel', absolutPath)
            }
            // validate if the path is a directory
            if (api.isPathDirectory(absolutPath)) {
                // read al the files in the directory
                let allFiles = api.readDirectory(absolutPath);
                // create a new path for every file
                allFiles.forEach((eachFile) => {
                    const newPath = `${absolutPath}/${eachFile}`;
                    // validate if the directory contains md files
                    if (api.isMdFile(newPath)) {
                        return mdPaths.push(newPath);
                    } else if(!api.isMdFile(newPath)) {
                        reject(new Error(('This directory does not contain any MD file. Try with a different path.')))
                    }
                    // console.log(newPath)
                })
                // validate if the path us a md file
            } else if (api.isMdFile(absolutPath)) {
                resolve(absolutPath)
            } else {
                reject(new Error(chalk.bgRed.white('This path is not a MD file. Try with a different path.')))
            }
        }
        else {
            reject(new Error(chalk.bgRed.white('This path does not exist! Try with a different path.')))
        }
        resolve(mdPaths);
    })*/