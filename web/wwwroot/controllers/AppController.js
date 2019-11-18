'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
        resp.send('Create app called');
    };

    this.Update = function (req, resp) {
        resp.send('Update app called');
    };
};

exports.default = new AppController();
//# sourceMappingURL=AppController.js.map