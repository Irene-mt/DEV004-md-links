#!/usr/bin/env node
import { mdLinks } from './index.js';
import { argv } from 'node:process';
import chalk from 'chalk';

const path = argv[2];
const validate = argv.includes('--validate');
const stats = argv.includes('--stats');
const help = argv.includes('--help');
if (!path) {
    console.log(
        chalk.white(`Please, enter a path or enter ${chalk.hex('#D61355').bold('"--help"')} to see the instructions.`)
    );
} else if (help) {
    console.log(
        `${chalk.white.bold('YOU CAN USE THE FOLLOWING OPTIONS:')}
${chalk.hex('#A7D2CB').inverse('      only path       ')} ${chalk.hex('#A7D2CB').bold('It will show you the links.')}
${chalk.hex('#F2D388').inverse('     "--validate"     ')} ${chalk.hex('#F2D388').bold('It will show you the links with their status ok or fail.')}
${chalk.hex('#C98474').inverse('      "--stats"       ')} ${chalk.hex('#C98474').bold('It will show you the statistics of total and unique links.')}
${chalk.hex('#874C62').inverse(' "--validate --stats" ')} ${chalk.hex('#874C62').bold('It will show you the statistics of total, unique and broken links..')}`);
}  else if (path && validate && stats) {
    mdLinks(path, true)
        .then((objLinks) => {
            objLinks.map((links) => {
                // total links in md file
                const total = (Object.keys(links)).length;
                // search for duplicate href
                const searchNumLinks = links.reduce((acc, link) => {
                    acc[link.href] = ++acc[link.href] || 0;
                    return acc;
                }, {
                })
                // calculate unique links
                const unique = (Object.entries(searchNumLinks)).length;
                // calculate broken links
                const searchBroken = links.filter(link => link.ok === 'FAIL!');
                const broken = searchBroken.length;
                console.log(
                    `${chalk.white.bold((links[0]).file)}
${chalk.hex('#A7D2CB').inverse('  Total:   ')} ${chalk.hex('#A7D2CB').bold(total)}
${chalk.hex('#F2D388').inverse('  Unique:  ')} ${chalk.hex('#F2D388').bold(unique)}
${chalk.hex('#874C62').inverse('  Broken:  ')} ${chalk.hex('#874C62').bold(broken)}`)
            })

        })
        .catch((err) => {
            console.log(`${chalk.hex('#C21010').inverse(' ERROR ')} ${chalk.white.bold(err, 'Try with a different path.')}`);
        })
} else if (path && stats) {
    mdLinks(path, false)
        .then((objLinks) => {
            objLinks.map((links) => {
                // total links in md file
                const total = (Object.keys(links)).length;
                // search for duplicate href
                const searchNumLinks = links.reduce((acc, link) => {
                    acc[link.href] = ++acc[link.href] || 0;
                    return acc;
                }, {
                })
                // calculate unique links
                const unique = (Object.entries(searchNumLinks)).length;
                console.log(
                    `${chalk.white.bold((links[0]).file)}
${chalk.hex('#A7D2CB').inverse('  Total:   ')} ${chalk.hex('#A7D2CB').bold(total)}
${chalk.hex('#F2D388').inverse('  Unique:  ')} ${chalk.hex('#F2D388').bold(unique)}`);
            });
        })
        .catch((err) => {
            console.log(`${chalk.hex('#C21010').inverse(' ERROR ')} ${chalk.white.bold(err, 'Try with a different path.')}`);
        })
} else if (path && validate) {
    mdLinks(path, true)
        .then((objLinks) => {
            objLinks.map((links) => {
                links.map((eachLink) => {
                    if (eachLink.ok === 'OK!') {
                        console.log(
                            `${chalk.hex('#A7D2CB').inverse('  href  ')} ${chalk.hex('#A7D2CB').bold(eachLink.href)}
${chalk.hex('#F2D388').inverse('  text  ')} ${chalk.hex('#F2D388').bold(eachLink.text)}
${chalk.hex('#C98474').inverse('  file  ')} ${chalk.hex('#C98474').bold(eachLink.file)}
${chalk.hex('#874C62').inverse(' status ')} ${chalk.hex('#874C62').bold(eachLink.status)}
${chalk.hex('#AACB73').inverse('   ok   ')} ${chalk.hex('#AACB73').bold(eachLink.ok)}
    `);
                    } else {
                        console.log(
                            `${chalk.hex('#A7D2CB').inverse('  href  ')} ${chalk.hex('#A7D2CB').bold(eachLink.href)}
${chalk.hex('#F2D388').inverse('  text  ')} ${chalk.hex('#F2D388').bold(eachLink.text)}
${chalk.hex('#C98474').inverse('  file  ')} ${chalk.hex('#C98474').bold(eachLink.file)}
${chalk.hex('#874C62').inverse(' status ')} ${chalk.hex('#874C62').bold(eachLink.status)}
${chalk.hex('#D61355').inverse('   ok   ')} ${chalk.hex('#D61355').bold(eachLink.ok)}
    `);
                    }
                });

            });
        })
        .catch((err) => {
            console.log(`${chalk.hex('#C21010').inverse(' ERROR ')} ${chalk.white.bold(err, 'Try with a different path.')}`);
        })
} else {
    mdLinks(path, false)
        .then((objLinks) => {
            objLinks.map((links) => {
                links.map((eachLink) => {
                    console.log(
                        `${chalk.hex('#A7D2CB').inverse(' href ')} ${chalk.hex('#A7D2CB').bold(eachLink.href)}
${chalk.hex('#F2D388').inverse(' text ')} ${chalk.hex('#F2D388').bold(eachLink.text)}
${chalk.hex('#C98474').inverse(' file ')} ${chalk.hex('#C98474').bold(eachLink.file)}
`);
                });
            });
        })
        .catch((err) => {
            console.log(`${chalk.hex('#C21010').inverse(' ERROR ')} ${chalk.white.bold(err, 'Try with a different path.')}`);
        })
}
