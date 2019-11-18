'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeneratorRepository = function GeneratorRepository() {
    _classCallCheck(this, GeneratorRepository);

    this.GenerateApp = function (appJson) {
        var rootPath = process.cwd();
        var templatePath = _path2.default.resolve(rootPath, '..', 'templates/core/web');
        var sandboxPath = _path2.default.resolve(rootPath, 'apps/' + appJson.app_name + '/sandbox');
        console.log('templatePath: ' + templatePath + ', sandboxPath: ' + sandboxPath);
        _fsExtra2.default.copy(templatePath, sandboxPath);
    };
};

exports.default = new GeneratorRepository();
//# sourceMappingURL=generatorRepository.js.map