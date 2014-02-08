var fs = require('fs'),
    ws = require('ws'),
    util = require('util'),
    url = require('url'),
    http = require('http'),
    path = require('path'),
    mime = require('mime'),
    vm = require('vm');

var bSuccess = true;
var childprocesses = [];


process.on('SIGINT',function(){
  for (var kid in childprocesses) {
    if( childprocesses.hasOwnProperty( kid ) )
    {
      childprocesses[kid].kill('SIGINT');
    }
  }
});

var httpServer = http.createServer( function(request, response) {
    var aURL = url.parse(request.url, true);
    
    var pathname = aURL.pathname;
    //console.log("request =", request);
    //console.log("pathname =", pathname);
    
    /*// TODO : add another signal path to close al childprocesses processes 
    launch without and end on maybe we add a tidy up for each libarary 
    the is running text becomes a link to kill the process? so it runs until its stopped
    and doing a new run does a term first?
    would need to do cp.kill('SIGTERM')
    
    maybe a seperate page that lets you see the staus 
    */
    
    
    if(pathname === "/run")
    {
      //console.log("aURL =", aURL);
      
      if(typeof aURL.query.code !== 'null')
      {
        
        console.log("aURL.query.code =", aURL.query.code);
        
        fs.writeFile("current.js", aURL.query.code);
        
        var spawn = require('child_process').spawn,
        ls    = spawn('node', ['current.js']);
        
        console.log("ls.pid =", ls.pid);
        
        childprocesses[ls.pid] = ls;
        
        
        
        childprocesses[ls.pid].stdout.on('data', function (data) {
          console.log('stdout: ' + data);
          response.writeHead(200, {'Content-Type': 'text/html'});
          //response.write(aURL.query.callback+"("+JSON.stringify(aURL.query.code)+")");
          response.write(aURL.query.callback+"({\"status\":\"running\", \"pid\":"+ls.pid+"})");
          response.end();
        });

        childprocesses[ls.pid].stderr.on('data', function (data) {
          console.log('stderr: ' + data);
          bSuccess = false;
          child.stderr.on('data', function (data) {
          if (/^execvp\(\)/.test(data)) {
            response.writeHead(500, {'Content-Type': 'text/html'});
            response.write(aURL.query.callback+"({\"status\":\"error\", \"pid\":"+ls.pid+",\"error\":data})");
            response.end();
          }
          
        });

        childprocesses[ls.pid].on('exit', function (code) {
          console.log('childprocesses process exited with code ' + code);
          response.writeHead(200, {'Content-Type': 'text/html'});
          //response.write(aURL.query.callback+"("+JSON.stringify(aURL.query.code)+")");
          response.write(aURL.query.callback+"({\"status\":\"success\", \"pid\":"+ls.pid+"})");
          response.end();
          
        });

        var bSuccess = true;
        
      }
      
    }
    else if(pathname === "/kill")
    {
      if(typeof aURL.query.id !== 'null')
      {
        if(typeof childprocesses[ls.pid] !== 'null')
        {
          childprocesses[ls.pid].kill('SIGINT');
        }
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
