import generatorRepository from "../../generatorRepository";

class AppController {
    Apps = (req, resp) => {
        resp.send('get all apps called');
    }

    App = (req, resp) => {
        resp.send('get single app called');
    }

    Create = (req, resp) => {
        generatorRepository.GenerateApp(req.body.appJson);
        resp.send('Create app called');
    }

    Update = (req, resp) => {
        resp.send('Update app called');
    }
}

export default new AppController();