import generatorRepository from "../../generatorRepository";

class AppController {
    Apps = (req, resp) => {
        console.log('this apps is called');
        resp.json({msg: 'get all apps called 2', msg1: 'val1 got called from lorem', msg2: { it1: 'property it1 has value', it2: 'prop it2 is a child prop'    }        });
    }

    App = (req, resp) => {
        resp.send('get single app called');
    }

    Create = (req, resp) => {
        console.log('req.body', req.body);
        let appJson = req.body.payload;
        console.log('payload', appJson);
        console.log('app_name', appJson.app_name);
        generatorRepository.GenerateApp(appJson, (error, templatePath, sandboxPath) => {
            if(error) {
                console.error(`error while copying template ${templatePath} to sandbox ${sandboxPath}`)
                resp.json({ msg: 'Error occurred while generating app',
                            error: error});
            }
            else{
                console.log(`Template successfully copied at ${sandboxPath}`);  
                resp.json({ msg: 'App generated successfully',
                            sandboxPath: sandboxPath,
                            templatePath: templatePath });

            }
        });
    }

    Update = (req, resp) => {
        resp.send('Update app called');
    }
}

export default new AppController();