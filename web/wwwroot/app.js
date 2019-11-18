'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import passport from 'passport';

var port_number = process.env.PORT || 3001;
var app = (0, _express2.default)();

app.server = _http2.default.createServer(app);
app.use(_bodyParser2.default.json());
app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'client/build')));

// app.use(passport.initialize());

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use((0, _cors2.default)(corsOption));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
});

app.use('/api', _routes2.default);
app.get('/home', function (req, res) {
    var fileName = _path2.default.resolve(__dirname + '../client/build/index.html');
    fileName = _path2.default.join(__dirname, '..', 'client/build/index.html');
    console.log('__dirname: ', __dirname);
    console.log(fileName);
    res.sendFile(fileName);
});

app.listen(port_number, function () {
    console.log('NodeJs API runnning on ' + port_number);
});
//# sourceMappingURL=app.js.map