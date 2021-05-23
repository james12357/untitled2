function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

const http = require('http');
const filesystem = require('fs');
const URL = require("url");
const number = parseInt(String(Math.random() * 1000));
console.log(number);
http.createServer(function (request, response) {
    let args = URL.parse(request.url, true).query;
    let pathname = URL.parse(request.url).pathname;
    if ((args.token && (args.token === number.toString())) || pathname.substr(1) === "favicon.ico") {
        filesystem.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write("The specified file does not exist.");
                console.log(getClientIp(request) + " using HTTP" + request.httpVersion + " not found " + pathname.substr(1) + " on this server");
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data.toString());
                console.log(getClientIp(request) + " using HTTP" + request.httpVersion + " Successfully got " + pathname.substr(1));
            }
            response.end();
        });
    }else if(pathname.substr(1) === "getToken") {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        console.log(getClientIp(request) + " using HTTP" + request.httpVersion + " Successfully got token");
        response.end(String(number));
    }else if(pathname.substr(1) === "redirect"){
        response.writeHead(200, {'Content-Type': 'text/html'});
        console.log(getClientIp(request) + " using HTTP" + request.httpVersion + " Successfully got redirect page");
        let to = args.to;
        if(args.to){response.end("<html lang='zh'><body><a href='"+to+"?token="+number+"'>click me</a></body></html>");
        } else {
            response.end("<html lang='zh'><body><a href='testa.html?token="+number+"'>click me</a></body></html>");
        }

    } else {
        response.writeHead(403, {'Content-Type': 'text/html'});
        console.log(getClientIp(request) + " using HTTP" + request.httpVersion + " Token not exist");
        response.end("The specified token does not exist.");
    }


}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/testa.html?token=' + number);
