'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('./api/controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _express2.default.Router();

api.post('/rest', _controllers.RestController.Handle);
api.get('/apps', _controllers.AppController.Apps);
// api.get('/apps', (req, resp) => {
//     console.log('heheh');
// });
api.get('/apps/:id', _controllers.AppController.App);
api.post('/apps', _controllers.AppController.Create);
api.post('/apps/:id', _controllers.AppController.Update);

api.get('/', function (req, resp) {
    resp.send('REST API UP & RUNNING');
});
exports.default = api;
//# sourceMappingURL=routes.js.map