import fse from 'fs-extra';
import path from 'path';

class GeneratorRepository{
    GenerateApp = (appJson, callback) => {
        var rootPath = process.cwd();
        var templatePath = path.resolve(rootPath, '..', 'templates/core/web');
        var sandboxPath = path.resolve(rootPath, `apps/${appJson.app_name}/sandbox`);
        console.log(`rootpath: ${rootPath}`);
        console.log(`templatePath: ${templatePath}, sandboxPath: ${sandboxPath}`);
        fse.copy(templatePath, sandboxPath, {
            filter: (path) => {
                let copied = path.indexOf('node_modules') < 0
                                && path.indexOf('bin') < 0
                                && path.indexOf('obj') < 0
                                && path.indexOf('.vs') < 0;
                console.log(copied ? 'copied' : 'skipped', path);
                return copied;
            }
        })
        .then(() => {
            console.log(`Template successfully copied at ${sandboxPath}`);  
            callback(null, templatePath, sandboxPath);
        })
        .catch((error) => {
            console.error(`error while copying template ${templatePath} to sandbox ${sandboxPath}`)
            callback(error, templatePath, sandboxPath);
        });

    }
}

export default new GeneratorRepository();