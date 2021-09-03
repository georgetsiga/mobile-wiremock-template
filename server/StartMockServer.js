var forever = require('forever'),
    exec = require('child_process').exec,
    child,
    request = require('request'),
    foreverPath = "node_modules/.bin/";

if (process.platform === 'win32') foreverPath = "node_modules\\.bin\\";

child = exec(foreverPath + 'forever stopall',
    function(error, stdout, stderr) {
        forever.startDaemon('./StartServer.js', {
            "uid": "mockServer"
        });
        console.log("Mock server started");
        if (error !== null) {
            console.log(error);
        }
    });

child.stderr.on('data', function(data) {
    console.log(data);
});