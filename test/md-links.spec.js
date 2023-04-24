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
        expect(api.readDirectory('C:/Users/Laboratoria/Desktop/LABORATORIA/DEV004-md-links')).toEqual(
            [
                '.babelrc',     '.editorconfig',
                '.eslintrc',    '.git',
                '.gitignore',   'api.js',
                'coverage',     'example.md',
                'example2.md',  'index.js',
                'node_modules', 'package-lock.json',
                'package.json', 'README.md',
                'test',         'thumb.png'
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
