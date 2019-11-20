'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _generatorRepository = require('../../generatorRepository');

var _generatorRepository2 = _interopRequireDefault(_generatorRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppController = function AppController() {
    _classCallCheck(this, AppController);

    this.Apps = function (req, resp) {
        console.log('this apps is called');
        resp.json({ msg: 'get all apps called 2', msg1: 'val1 got called from lorem', msg2: { it1: 'property it1 has value', it2: 'prop it2 is a child prop' } });
    };

    this.App = function (req, resp) {
        resp.send('get single app called');
    };

    this.Create = function (req, resp) {
        console.log('req.body', req.body);
        var appJson = req.body.payload;
        console.log('payload', appJson);
        console.log('app_name', appJson.app_name);
        _generatorRepository2.default.GenerateApp(appJson, function (error, templatePath, sandboxPath) {
            if (error) {
                console.error('error while copying template ' + templatePath + ' to sandbox ' + sandboxPath);
                resp.json({ msg: 'Error occurred while generating app',
                    error: error });
            } else {
                console.log('Template successfully copied at ' + sandboxPath);
                resp.json({ msg: 'App generated successfully',
                    sandboxPath: sandboxPath,
                    templatePath: templatePath });
            }
        });
    };

    this.Update = function (req, resp) {
        resp.send('Update app called');
    };
};

exports.default = new AppController();
//# sourceMappingURL=AppController.js.map