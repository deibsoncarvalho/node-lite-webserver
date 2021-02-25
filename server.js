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

    let fileName = Url(req.url).pathname

    if(fileName === '/') {
        fileName = defaultIndex;
    } else if (!(fileName.split('/').pop().indexOf('.') > -1)) {
        fileName = path.join(fileName, defaultIndex);
    }

    const fullPath = path.join(rootFolder, fileName);
    const extension = fileName.substr(fileName.lastIndexOf('.') + 1);

    console.log(`request: ${fileName}`)
    
    fs.readFile(fullPath, (err, data) => {
        if(err) {
            res.writeHead(404);
            res.end();
            console.log(`Not found: ${fullPath}`)
        } else {
            res.writeHead(200, {
                                'Content-Type': types[extension] || 'text/plain',
                                'Content-Length': data.length
                               });
            res.end(data);
            console.log(`found: ${fullPath}`)
        }
    });

});

// rename sys process
process.title = 'MyWebServer';

// start listen de web server process
webserver.listen(port, () => {
    console.log(`Server started on host http://${ port==80 ? hostname : hostname +':'+ port }`);
   }  
);
