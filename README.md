# Small static web server for testing web pages.

written in Node, the script only provides files in html, js, css and simple images.

I repeat, it is very simple, it does not provide the necessary structure for an automated test, staging or production web server. 

**Nowhere use this script in production! There are no security, stability or performance policies for a real server.**

## Install

Download the zipped folder, extract and at the root, run the command:

~~~
npm install
~~~

## Use

To use the server, after installation, run the command:

~~~
npm start
~~~

## Basic Config

For change port or hostname, edit file **_config.json_**, in **root**. Default port is **_80_** and hostname **_localhost_**. 

~~~
{
    "rootFolder": "./public",
    "defaultIndex": "/index.html",
    "hostname": "localhost",
    "port": "80",
    "types" : {
        "htm": "text/html",
        "html": "text/html",
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "png": "image/png",
        "css": "text/css",
        "js": "text/javascript",
        "json": "application/json",
        "ico": "image/x-icon",
        "webp": "image/webp",
        "svg": "image/svg+xml",
        "xml": "text/xml"
    }
}
~~~


