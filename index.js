const express = require('express');
const request = require('request');
const app = express();

app.get('/', (req, res, next) => {
    try{
        if(!req.query.link){
            return res.status(500).send("Invalid");
        }
        const proxy = request(req.query.link)
        .on('response',res => {
            res.set(res.headers)
        })
        proxy.pipe(res);
        req.pipe(proxy);
    } catch(e){
        res.status(500).send(e);
    }
});

app.listen(8080);
