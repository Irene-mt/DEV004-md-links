import { api } from '../api.js'
import { mdFiles } from '../index.js'

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
  it('should return an array with all the files in the directory', () => {
    expect(api.readDirectory('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example-empty')).toEqual(
      [])
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
    return api.readMdFile('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example-files/example5.md').then(data => {
      expect(data).toBe('Hola mundo!')
    })
  });
});

describe('getLinks', () => {
  const entry = `[Markdown](https://es.wikipedia.org/wiki/Markdown)
  [Markdown](https://es.wikipedia.org/wiki/Markdown)
  
  [Node.js](https://nodejs.org/es/)
  [Node.js](https://nodejs.org/es/)
  [Node.js](https://nodejs.org/es/)
  [Node.js](https://nodejs.org/es/)
  
  [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/)
  [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/)
  
  [Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)
  [Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)
  
  [Funciones — bloques de código reutilizables - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions)
  [Funciones — bloques de código reutilizables - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions)
  
  [package.json - Documentación oficial (en inglés)](https://docs.npmjs.com/files/package.json)
  [Process - Documentación oficial (en inglés)](https://nodejs.org/api/process.html)
  [File system - Documentación oficial (en inglés)](https://nodejs.org/api/fs.html)
  [Path - Documentación oficial (en inglés)](https://nodejs.org/api/path.html)`
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
    expect(api.getLinks(entry)).toEqual(result)
  });
});

describe('calculateStats', () => {
  const entry = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://developers.google.com/v8/',
      text: 'motor de JavaScript V8 de Chrome',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://developers.google.com/v8/',
      text: 'motor de JavaScript V8 de Chrome',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
      file: undefined,
      status: 'Request failed with status code 404',
      ok: 'FAIL!'
    },
    {
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
      file: undefined,
      status: 'Request failed with status code 404',
      ok: 'FAIL!'
    },
    {
      href: 'https://docs.npmjs.com/files/package.json',
      text: 'package.json - Documentación oficial (en inglés)',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://nodejs.org/api/process.html',
      text: 'Process - Documentación oficial (en inglés)',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      text: 'File system - Documentación oficial (en inglés)',
      file: undefined,
      status: 200,
      ok: 'OK!'
    },
    {
      href: 'https://nodejs.org/api/path.html',
      text: 'Path - Documentación oficial (en inglés)',
      file: undefined,
      status: 200,
      ok: 'OK!'
    }
  ]
  const resultTrue = { Total: 16, Unique: 9 , Broken: 2 };
  const resultFalse = { Total: 16, Unique: 9 };
  it('should return total, unique and broken ', () => {
    expect(api.calculateStats(entry, true)).toEqual(resultTrue)
  });
  it('should return total and unique', () => {
    expect(api.calculateStats(entry, false)).toEqual(resultFalse)
  });

});

describe('mdFiles', () => {
  
  it('should return "the path does not exist"', () => {
    expect(mdFiles('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV04-md-links')).toBe(console.log('This path does not exist.'))
  });
  it('should return "this path is not a directory or md file"', () => {
    expect(mdFiles('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/api.js')).toBe(console.log('This path is not a directory or a MD file.'))
  });
  it('should return an array with one path', () => {
    expect(mdFiles('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/exaple-files/ex')).toEqual(
      [
        'C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example-files/ex\\example2.md'
      ]
    )
  });
  it('should return an array with multiple paths', () => {
    expect(mdFiles('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/exaple-files')).toEqual(
      [
        'C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example-files\\ex\\example2.md',
        'C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example-files\\example3.md',
        'C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example-files\\example4.md',
        'C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links/example-files\\example5.md'
      ]
    )
  });

});