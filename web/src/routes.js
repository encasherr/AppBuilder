import express  from 'express';
import { 
    AppController
} from './api/controllers';

let api = express.Router();

api.get('/apps', AppController.Apps);
// api.get('/apps', (req, resp) => {
//     console.log('heheh');
// });
api.get('/apps/:id', AppController.App);
api.post('/apps', AppController.Create);
api.post('/apps/:id', AppController.Update);

api.get('/', (req, resp) => {
    resp.send(`REST API UP & RUNNING`);
})
export default api;

