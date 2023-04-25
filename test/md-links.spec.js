import { api } from '../api.js'

describe('existPath', () => {
    it('should return true if the path exist', () => {
        expect(api.existPath('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links')).toBe(true)
    });
    it('should return false if the path does not exist', () => {
        expect(api.existPath('C:/Users/Laboratoria/Desktop/LABO/DEV004')).toBe(false)
    });
});

describe('isAbsolutePath', () => {
    it('should return true if the path is absolute', () => {
        expect(api.isAbsolutePath('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links')).toBe(true)
    });
    it('should return false if the path is no absolute', () => {
        expect(api.isAbsolutePath('../DEV004-data-lovers')).toBe(false)
    });
});

describe('convertToAbsolutePath', () => {
    it('should return the path converted to absolute', () => {
        expect(api.convertToAbsolutePath('../DEV004-data-lovers')).toEqual('C:\\Users\\Laboratoria\\Desktop\\LABORATORIA\\DEV004-data-lovers')
    });
});

describe('isPathDirectory', () => {
    it('should return true if the path is a directory', () => {
        expect(api.isPathDirectory('../DEV004-data-lovers')).toBe(true)
    });
    it('should return false if the path is not a directory', () => {
        expect(api.isPathDirectory('../DEV004-data-lovers/README.md')).toBe(false)
    });
});

describe('readDirecory', () => {
    it('should return true if the path is a directory', () => {
        expect(api.readDirectory('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example-empty')).toEqual(
          [
            'example2.md',
            'example3.md',
            'example4.md',
            'icon (1).png',
            'icon (2).png',
            'icon (3).png',
            'icon (4).png'
          ])
    });
});

describe('isMdfile', () => {
    it('should return true if the file ext is ".md"', () => {
        expect(api.isMdFile('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-social-network/README.md')).toBe(true)
    });
    it('should return false if the the file ext is not ".md"', () => {
        expect(api.isMdFile('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-social-network/img-readme/test.png')).toBe(false)
    });
});

describe('readMdFile', () => {
    it('should return a string', () => {
        expect(api.readMdFile('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-social-network/README.md')).toEqual(expect.anything())
    });
});

 describe('getLinks', () => {
   const result = [
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: undefined
        },
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: undefined
        },
        { href: 'https://nodejs.org/es/', text: 'Node.js', file: undefined },
        { href: 'https://nodejs.org/es/', text: 'Node.js', file: undefined },
        { href: 'https://nodejs.org/es/', text: 'Node.js', file: undefined },
        { href: 'https://nodejs.org/es/', text: 'Node.js', file: undefined },
        {
          href: 'https://developers.google.com/v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: undefined
        },
        {
          href: 'https://developers.google.com/v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: undefined
        },
        {
          href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
          text: 'Arreglos',
          file: undefined
        },
        {
          href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
          text: 'Arreglos',
          file: undefined
        },
        {
          href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
          text: 'Funciones — bloques de código reutilizables - MDN',
          file: undefined
        },
        {
          href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
          text: 'Funciones — bloques de código reutilizables - MDN',
          file: undefined
        },
        {
          href: 'https://docs.npmjs.com/files/package.json',
          text: 'package.json - Documentación oficial (en inglés)',
          file: undefined
        },
        {
          href: 'https://nodejs.org/api/process.html',
          text: 'Process - Documentación oficial (en inglés)',
          file: undefined
        },
        {
          href: 'https://nodejs.org/api/fs.html',
          text: 'File system - Documentación oficial (en inglés)',
          file: undefined
        },
        {
          href: 'https://nodejs.org/api/path.html',
          text: 'Path - Documentación oficial (en inglés)',
          file: undefined
        }
      ];
    it('should return an object with all the links ', () => {
        expect(
            api.readMdFile('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example.md')
                .then((cont) => api.getLinks(JSON.stringify(cont))) // api.getLinks
                .then((links) => {return links})
        ).toEqual(expect.objectContaining(result))
    });
});
