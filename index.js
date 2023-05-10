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

export const mdLinks = (path, validate) => {
    return new Promise((resolve, reject) => {
        const resultPaths = mdFiles(path);
        // if resultPaths is an objetc, it contains the md files paths
        if (typeof (resultPaths) === 'object') {
            const arrPaths = resultPaths;
            // make promise of each md file
            const links = arrPaths.map((path) => {
                // read the file
                return api.readMdFile(path)
                    .then((fileContent) => {
                        // search for links
                        const allLinks = api.getLinks(fileContent, path);
                        return allLinks
                    })
            })
            // resolve all the promises with the links
            Promise.all(links)
                .then((arrLinks) => {
                    arrLinks.map((contentLinks) => {
                        // validate if the array contains links
                        if (contentLinks.length > 0) {
                            // resolve the promise if validate is true or false
                            if (validate) {
                                api.getLinkStatus(contentLinks)
                                    .then((linkStatus) => {
                                        resolve(linkStatus);
                                    })
                            } else if (!validate){
                                //console.log(contentLinks);
                                resolve(contentLinks);
                            }
                        } else {
                            reject('No links found.')
                        }
                    })
                })
        } else {
            // if resultPaths is a string, then reject the promise
            const errorMessage = resultPaths;
            reject(errorMessage);
        }
    })

}

// mdLinks('./ex.md', false)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))
