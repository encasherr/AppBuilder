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
        resp.send('get all apps called');
    };

    this.App = function (req, resp) {
        resp.send('get single app called');
    };

    this.Create = function (req, resp) {
        _generatorRepository2.default.GenerateApp(req.body.appJson);
        resp.send('Create app called');
    };

    this.Update = function (req, resp) {
        resp.send('Update app called');
    };
};

exports.default = new AppController();
//# sourceMappingURL=AppController.js.map