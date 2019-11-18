const jwt = require("jsonwebtoken");
import { AuthConfig } from '../commons/ServerConfig';

const resources = [
    { 
        resource: '/admin/getAllUsers',
        allowedRoles: [ 'admin' ] 
    },
    { 
        resource: '/admin/user',
        allowedRoles: [ 'admin' ] 
    }
];

module.exports = function(req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    const requestedPath = req.path;
    console.log('requested path: ', requestedPath);
    // console.log('auth middleware check', token);
    if (!token || token === "null") {
        console.log('token missing', token);
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        //if can verify the token, set req.user and pass to next middleware
        // console.log('verifying with token', token);
        const decoded = jwt.verify(token, AuthConfig.myPrivateKey);
        req.user = decoded;
        console.log('user: ', req.user);
        if(req.user && req.user.role) {
            let currentUserRole = req.user.role;
            // console.log('current user role: ', currentUserRole);
            let currentResource = resources.filter((item, index) => {
                // console.log('checking item', item.resource);
                return item.resource === requestedPath;
            });
            if(currentResource && currentResource.length > 0) {
                if(currentResource[0].allowedRoles.includes(currentUserRole)) {
                    console.log("authorized");
                    next();
                } else {
                    console.log('not authorized');
                    res.status(401).send('User is not authorized to perform requested operation');    
                }
            }
            else {
                console.log('not found');
                return res.status(404).send("Not Found");
            }
        }
        else {
            console.log('role missing');
            res.status(401).send('User role is missing');
        }    
    } catch (ex) {
            console.log('exception in authorization', req.user);
            res.status(401).send("Invalid token.");
    }
};
