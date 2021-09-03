let exec = require('child_process').exec,
    minimist = require('minimist'),
    child,
    request = require('request'),
    argv,
    port;

argv = minimist(process.argv.slice(2));
port = argv.mockPort || '9092';
child = exec('java -jar wiremock/WireMock-additions-1.1.jar ' + port,
    function (error, stdout, stderr) {
        if (error !== null) {
            console.log('Wiremock already running. Shutting down server');
            request({url: 'http://localhost:' + port + '/__admin/shutdown', method: 'POST'},
                function (error, response, body) {
                    if (error) {
                        console.log(String(error));
                    } else {
                        console.log('Restarting server');
                        setTimeout(function () { // Make sure it's down before restarting it (Seems to happen on Windows machines)
                            child = exec('java -jar wiremock/WireMock-additions-1.1.jar ' + port,
                                function (error, stdout, stderr) {
                                    if (error !== null) {
                                        console.log('Unable to restart Wiremock server: ', error);
                                    }
                                });

                            child.stdout.on('data', function (data) {
                                console.log(String(data));
                            });
                            child.stderr.on('data', function (data) {
                                console.log(String(data));
                            });
                        }, 2000);
                    }
                });
        } else {
            console.log('Unable to start Wiremock server: ', error);
        }
    });

child.stdout.on('data', function (data) {
    console.log(String(data));
});
child.stderr.on('data', function (data) {
    console.log(String(data));
});
