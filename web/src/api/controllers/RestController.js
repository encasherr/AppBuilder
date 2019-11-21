import request from 'request';

class RestController{
    Handle = (req, resp) => {
        var payload = req.body.payload;
        console.log('payload', payload);
        if(payload.method === "get"){
            this.HandleGet(payload, resp);
        }
        else {
            this.HandlePost(payload, resp);
        }
    }

    HandleGet = (payload, resp) => {
        const options = {
            url: payload.apiUrl,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        console.log(`making get call to ${payload.apiUrl}`);
        request(options,
        (error, response, body) => {
            if(!error){
                resp.json(body);
            }
            else {
                resp.json({
                    apiUrl: payload.apiUrl,
                    method: 'GET',
                    error
                });
            }
        });
    }

    
    HandlePost = (payload, resp) => {
        const options = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: payload.apiUrl,
            body: JSON.stringify(payload.data)
        };
        console.log(`making post call to ${payload.apiUrl}`);
        console.log('options', options);
        request.post(options, function(error, response, body) {
            if(!error){
                console.log('success', body);
                resp.json(body);
            }
            else {
                console.log('error', error);
                resp.json({
                    apiUrl: payload.apiUrl,
                    method: 'POST',
                    error
                });
            }
        });
    }
}
export default new RestController();