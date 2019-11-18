import fse from 'fs-extra';
import path from 'path';

class GeneratorRepository{
    GenerateApp = (appJson) => {
        var rootPath = process.cwd();
        var templatePath = path.resolve(rootPath, '..', 'templates/core/web');
        var sandboxPath = path.resolve(rootPath, `apps/${appJson.app_name}/sandbox`);
        console.log(`templatePath: ${templatePath}, sandboxPath: ${sandboxPath}`);
        fse.copy(templatePath, sandboxPath);

    }
}

export default new GeneratorRepository();