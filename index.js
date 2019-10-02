const express = require('express');
const request = require('request');
const app = express();

app.get('/', (req, res) => {
        if(!req.query.link){
            return res.status(500).send("Invalid");
        }
        const proxy = request(req.query.link)
        .on('response',response => {
            res.set(response.headers)
        })
        .on('error',err => {
            console.log("err:" ,err);
            res.status(500).send(err);
        })
        proxy.pipe(res);
        req.pipe(proxy);
});

app.listen(8080);
