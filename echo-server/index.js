const express = require('express')
const timeout = require('connect-timeout')
const uuid = require('uuid')
const app = express()
app.use(timeout('30s'))
app.use(function(req, res, next) {
    if (!req.timeout) {
        next();
    }
})
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 8080

const version = "1.3"

var guid = uuid.v4();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function logRequest(req) {
    console.log(`Served by: ${guid}`);
    console.log(req.method + " " + req.originalUrl)
    console.log(req.headers);
    console.log(JSON.stringify(req.body))
}

app.get('/', function(req, res) {
    logRequest(req);
    res.send(`Served by: ${guid}`)
})

app.get('/api/weather-services/:zip', function(req, res) {
    logRequest(req)
    var msg = `{ "result": { "zip": ${req.params.zip}, "forecast": "sunny" }}`
    res.set('Content-Type', 'application/json');
    res.send(msg)
})

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

process.on('SIGTERM', function() {
    server.close(function() {
        process.exit(0);
    })
})