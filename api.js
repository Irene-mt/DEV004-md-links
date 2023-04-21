import fs from 'fs';
import path from 'path';
import fsp from 'fs/promises';
import axios from 'axios';

export const api = {
    // validate if path exists
    existPath: (userPath) => fs.existsSync(userPath),

    // validate if path is absolute
    isAbsolutePath: (userPath) => path.isAbsolute(userPath),

    // if path is relative, transform to absolute
    convertToAbsolutePath: (userPath) => path.resolve(userPath),

    // validate if it is a directory
    isPathDirectory: (userPath) => fs.lstatSync(userPath).isDirectory(),

    // read directory
    readDirectory: (userPath) => fs.readdirSync(userPath),

    // validate if it is a md file
    isMdFile: (userPath) => path.extname(userPath) === '.md',

    // read the file
    readMdFile: (userPath) => fsp.readFile(userPath, "utf8"),

    //get links
    getLinks: (fileContents, userPath) => {
        let contentToString = JSON.stringify(fileContents);
        const regex = /(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g;
        const httpRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
        const textRegex = /\[[^\s]+(.+?)\]/gi;
        let httpLinks = [];
        //console.log(userPath)
        // search for '(text)[link]'
        let links = contentToString.match(regex);
        // iterate on every link to get href and text
        links.forEach((link) => {
            const href = JSON.stringify(link.match(httpRegex)).slice(2, -2);
            const text = link.match(textRegex).join().slice(1, -1);
            if (href) {
                httpLinks.push({
                    href,
                    text,
                    file: userPath,
                })
            }
        })
        return httpLinks;
    },
    getLinkStatus: (objLinks) => {
        return Promise.all(objLinks.map(async (everyLink) => {
            return await axios
                .get(everyLink.href)
                .then((linkStatus) => {
                    let linkInfo = {
                        href: everyLink.href,
                        text: everyLink.text,
                        file: everyLink.file,
                        status: linkStatus.status,
                        ok: 'OK!',
                    }
                    return linkInfo;
                }
                ).catch((error) => {
                    let linkInfo = {
                        href: everyLink.href,
                        text: everyLink.text,
                        file: everyLink.file,
                        status: error.message,
                        ok: 'FAIL!',
                    }
                    return linkInfo;
                })
        }))

    },

    // calculate duplicated links
    calculateStats: (objStats) => {
        // total links in md file
        const total = (Object.keys(objStats)).length;
        // search for duplicate href
        const searchNumLinks = objStats.reduce((acc, link) => {
            acc[link.href] = ++acc[link.href] || 0;
            return acc;
        }, {
        })
        // calculate unique links
        const unique = (Object.entries(searchNumLinks)).length;
        // calculate broken links
        // const searchBroken = objStats.filter(link => link.ok === 'FAIL!');
        // const broken = searchBroken.length;

        const allStats = {
            Total: total,
            Unique: unique,
            // Broken: broken,
        }
        return allStats
    },
}

/* const duplicatedLinks = objStats.filter((link) => {
            return searchDuplicate[link.href];
        }) */

// regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
// console.log('EXIST', api.existPath('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links'))
//console.log(api.existPath('../DEV004-data-lovers'))
//console.log(api.convertToAbsolutePath('../DEV004-data-lovers'))
// console.log(api.readDirectory('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links'))
// console.log(api.getLinks('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/README.md'))
// console.log([...'http://www.youtube.com/watch?v=Gdma5UiMaEQ&list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMpBuZEGYXA6E&index=6'.match( /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g)])


api.readMdFile('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example.md')
    .then((links) => api.getLinks(links))
    .then((sts) => api.getLinkStatus(sts))
    .then((stsNum) => api.calculateStats(stsNum))
    .then((totUni) => console.log(totUni))
