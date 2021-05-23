function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}
const http = require('http');
const filesystem = require('fs');
const data = filesystem.readFileSync("testa.html");
const URL = require("url");
const randp = parseInt(Math.random() * 1000);
console.log(randp);
http.createServer(function (request, response) {
    let args = URL.parse(request.url, true).query;
    let pathname = URL.parse(request.url).pathname;
    if (args.token && (args.token === randp.toString())){
        response.writeHead(200, {'Content-Type': 'text/html'});
        console.log(getClientIp(request) + "using HTTP" + request.httpVersion + ", successfully got");
        response.end(data.toString());

    }
    else {
        response.writeHead(403, {'Content-Type': 'text/html'});
        console.log(getClientIp(request) + "using HTTP" + request.httpVersion + ", Token not exist");
        response.end("The specified token does not exist.");
    }

}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');
