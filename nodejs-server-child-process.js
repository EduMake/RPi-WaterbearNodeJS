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
    //console.log("request =", request);
    //console.log("pathname =", pathname);
    
    if(pathname == "/run")
    {
      //console.log("aURL =", aURL);
      
      if(typeof aURL.query.code !== 'null')
      {
        
        console.log("aURL.query.code =", aURL.query.code);
        
        fs.writeFile("current.js", aURL.query.code);
        
        var spawn = require('child_process').spawn,
        ls    = spawn('nodejs', ['current.js']);

        ls.stdout.on('data', function (data) {
          console.log('stdout: ' + data);
          response.writeHead(200, {'Content-Type': 'text/html'});
          //response.write(aURL.query.callback+"("+JSON.stringify(aURL.query.code)+")");
          response.write(aURL.query.callback+"(true)");
          response.end();
        });

        ls.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
          bSuccess = false;
          response.writeHead(500, {'Content-Type': 'text/html'});
          response.write(error);
          response.end();

        });

        ls.on('close', function (code) {
          console.log('child process exited with code ' + code);
          response.writeHead(200, {'Content-Type': 'text/html'});
          //response.write(aURL.query.callback+"("+JSON.stringify(aURL.query.code)+")");
          response.write(aURL.query.callback+"(true)");
          response.end();
          
        });

        var bSuccess = true;
        try{
          //eval(aURL.query.code);
	  
        } 
        catch(error){
        }
        
        if(bSuccess)
        {
        }
      }
      
      /*
          socket.on('commit-run-file', function(data) {
      console.log(data);
      if (data && data.file) {
        data.file.username = socket.handshake.session.username;
      }

      exec_helper.execute_program(data.file, false);
      git_helper.commit_push_and_save(data.file, "Modified " + data.file.name, function(err, status) {
        socket.emit('commit-file-complete', {message: "Save was successful"});
      });
    });

    socket.on('stop-script-execution', function(data) {
      exec_helper.stop_program(data.file, false);
    });


      
      */
      
      
    }
    
    if (pathname == "/")
    {
      pathname = "index.html";
    }
    var filename = path.join(process.cwd(), 'waterbear', pathname);

    path.exists(filename, function(exists) {
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
            'mode': 0666,
            'bufferSize': 4 * 1024
        }).addListener("data", function(chunk) {
            response.write(chunk, 'binary');
        }).addListener("close",function() {
            response.end();
        });
    });
});


httpServer.listen(8000);
