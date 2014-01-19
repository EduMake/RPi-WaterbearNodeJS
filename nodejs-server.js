//require.paths.unshift(__dirname + '/lib');

var fs = require('fs'),
    ws = require('ws'),
    util = require('util'),
    url = require('url'),
    http = require('http'),
    path = require('path'),
    mime = require('mime'),
    vm = require('vm');


    
var httpServer = http.createServer( function(request, response) {
    var aURL = url.parse(request.url, true);
    var pathname = aURL.pathname;
    var bSuccess = null;
    
    if(pathname === "/run")
    {
        //console.log("aURL =", aURL);
        if(typeof aURL.query.code !== 'null' && aURL.query.code.trim().length > 0)
        {
            
            process.once('uncaughtException', function(error) { // This could be a problem and need to be .on( but that might exceed the max of 10
                bSuccess = false;
                console.log('Caught exception: ' + error);
                response.writeHead(500, {'Content-Type': 'text/html'});
                console.log("error =", error);
                response.write(error.toString());
                response.end(); 
                return;
            });
            
            console.log("aURL.query.code =", aURL.query.code);
            
            fs.writeFile("test.js", aURL.query.code);
            bSuccess = true;
            
            try{
                eval(aURL.query.code);
                //vm.runInThisContext(aURL.query.code);
            } 
            catch(error){
                bSuccess = false;
                response.writeHead(500, {'Content-Type': 'text/html'});
                console.log("error =", error);
                response.write(error.toString());
                response.end(); 
                return;
            }
            
        }
        
        
        if(bSuccess)
        {
            //console.log("response =", response);
            console.log("bSuccess =", bSuccess);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(aURL.query.callback+"(true)");
            response.end();
        }
        else
        {
            //console.log("response =", response);
            response.writeHead(500, {'Content-Type': 'text/html'});
            
            error = "Didn't Succeed";
            console.log("error =", error);
            response.write(error);
            response.end(); 
        }
        
    }
    else
    {
        if (pathname === "/")
        {
          pathname = "index.html";
        }
        var filename = path.join(process.cwd(), 'waterbear', pathname);
    
        fs.exists(filename, function(exists) {
            if (!exists) {
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found");
                response.end();
                return;
            }
    
            response.writeHead(200, {'Content-Type': mime.lookup(filename)});
            fs.createReadStream(filename, {
                'flags': 'r',
                'encoding': 'binary',
                'mode': 666,
                'bufferSize': 4 * 1024
            }).addListener("data", function(chunk) {
                response.write(chunk, 'binary');
            }).addListener("close",function() {
                response.end();
            });
        });
    }
});


httpServer.listen(8000);