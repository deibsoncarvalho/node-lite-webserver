'use strict';

const http = require('http'),
      fs = require('fs'),
      config = require('./config'),
      Url = require('url-parse'),
      types = config.types,
      rootFolder = config.rootFolder,
      hostname = config.hostname || 'localhost',
      port = config.port || '8080',
      defaultIndex = config.defaultIndex || 'index.html',
      path = require('path');

const webserver = http.createServer();

webserver.on('request', (req, res) => {

    let fileName = Url(req.url).pathname;
    
    console.log(`URL: ${req.url}`);
    
    if(fileName === '/') {
        fileName = defaultIndex;
    } else if (!(fileName.split('/').pop().indexOf('.') > -1)) {
        fileName = path.join(fileName, defaultIndex);
    } 

    let fullPath = path.join(rootFolder, fileName);
    const extension = fileName.substr(fileName.lastIndexOf('.') + 1);

    console.log(`request: ${fileName}`)
    
    fs.readFile(fullPath, (err, data) => {
        if(err) {
            console.log(`Not found: ${fullPath}`)

            fullPath = path.join(rootFolder, '404.html');

            fs.readFile(fullPath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end();
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Content-Length': data.length
                       });
                    res.end(data);        
                }
            });
                        
        } else {
            res.writeHead(200, {
                                'Content-Type': types[extension] || 'text/plain',
                                'Content-Length': data.length
                               });
            res.end(data);
            console.log(`found: ${fullPath}`);
        }
    });

});

// rename sys process
process.title = 'LiteWebServer';

// start listen de web server process
webserver.listen(port, () => {
    console.log(`Server started on host http://${ port==80 ? hostname : hostname +':'+ port }`);
   }  
);
