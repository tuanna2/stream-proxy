const express = require('express');
const request = require('request');
const app = express();

app.get('/', (req, res, next) => {
    try{
        if(!req.query.link){
            return next();
        }
        const proxy = request(req.query.link);
        proxy.pipe(res);
        req.pipe(proxy);
    } catch(e){
        next();
    }
},(req, res)=> {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    return res.end('Not Found');
});

app.listen(8080);