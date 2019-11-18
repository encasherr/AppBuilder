import express  from 'express';
import { UserController } from './Controllers/admin';

import { generateToken, sendToken } from './utils/token.utils';
import passport from 'passport';
import auth from './utils/auth';


let api = express.Router();

/* User endpoints */
api.get('/admin/getAllUsers', auth,  UserController.GetAll);
api.post('/admin/user', auth, UserController.Add);
api.put('/admin/user', auth, UserController.Update);
api.delete('/admin/user', auth, UserController.Delete);


api.get('/admin/auth/google',
    passport.authenticate('google-token', { session: false, scope: ['https://www.googleapis.com/auth/plus.login'] }),
    (req, res, next) => {
        console.log('res next');
        req.auth = req.user;
        if(req.user.status === 'not found') {
            return res.status(403).send('User Not Found');
        }
        next();
    }, generateToken, sendToken);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
api.get('/admin/auth/google/callback', 
  passport.authenticate('google-token', { failureRedirect: '/login' }),
  function(req, res) {
      console.log('res 3');
    res.redirect('/');
  });

/*
api.route('/admin/auth/callback', (req, resp) => {
    console.log('admin api callback called');
})
api.get('/admin/auth/google',
        passport.authenticate('google-token'), 
        (req, res, next) => {
            console.log('res returned');
            if (!req.user) {
                return res.send(401, 'User Not Authenticated');
            }
            req.auth = {
                id: req.user.id
            };
            next();
        }, 
        generateToken, 
        sendToken);*/
export default api;
