import { api } from './api.js'
// import chalk from 'chalk';

export function mdFiles(path) {
    let mdPaths = [];
    // validate uf the path exists
    if (!api.existPath(path)) {
        return ('This path does not exist.')
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
            if (mdPaths.length == 0) {
                return 'This path does not contain any MD file.'
            } else {
                return mdPaths
            }

        }
        if (api.isMdFile(absolutPath)) {
            mdPaths.push(absolutPath);
            return mdPaths;
        } else {
            return ('This path is not a directory or a MD file.')
        }
    }
}

//console.log(mdFiles('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example-empty'))

export const mdLinks = (path, validate) => {
    return new Promise((resolve, reject) => {
        const resultPaths = mdFiles(path);
        if (typeof (resultPaths) === 'object') {
            const arrPaths = resultPaths;
            const links = arrPaths.map((path) => {
                return api.readMdFile(path) 
                    .then((fileContent) => {
                         const allLinks = api.getLinks(fileContent, path);
                        if (allLinks !== undefined) {
                            if (validate) {
                                api.getLinkStatus(allLinks)
                                    .then((linkStatus) => {
                                        // console.log(linkStatus);
                                        return linkStatus
                                    })
                            } else {
                                return allLinks
                            }
                        }
                    })
            })
            Promise.all(links).then(resolve)
            // resolve(links)
        } else {
            const errorMessage = resultPaths;
            reject(errorMessage);
        }
    })

}


mdLinks('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example-files', true)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

// if option is validate, resolver with link status
//resolve(statusOfLinks)
// const stats = api.calculateStats(statusOfLinks, true)
// console.log(stats, everyPath);