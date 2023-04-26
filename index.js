import { api } from './api.js'
// import chalk from 'chalk';

export function mdFiles(path) {
    let mdPaths = [];

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
                const newPath = `${absolutPath}\\${eachFile}`;
                if (api.isPathDirectory(newPath)) {
                    mdFiles(newPath).forEach((path) =>
                        mdPaths.push(path))
                }
                // validate if the directory contains md files
                if (api.isMdFile(newPath)) {
                    mdPaths.push(newPath);
                }
            })
            return mdPaths
        }
        if (api.isMdFile(absolutPath)) {
            mdPaths.push(absolutPath);
            resolve(mdPaths);
        } else {
            reject(new Error('This path is not a directory or a MD file.'))
        }
    }
}

console.log(mdFiles('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links'))
