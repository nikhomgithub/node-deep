//NodeJs is a server-build-in 
const http=require('http');

return http
    .create((req,res)=>{
        res.end('test');
    })
    .listen(8080);

//request come to this server, server send back
//but typically it is not just node to be a direct web server

//Normal achitect are
// User -> Nginx or Apache port (80 or 443 depen on use ssl or not) -> NodeJS (express)
// Nginx server is good as image server  to render to user (node is not good as image server)

// we use nginx to reverse proxy (decide which server should response to request )
// to run nodeJS server use command $node server.js    it will wait for user request