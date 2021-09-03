//var request = require('request');
var forever = require('forever');
forever.stopAll();


//request({
//    url: 'http://localhost:8887/__admin/shutdown',
//    method: 'POST'
//}, function(error, response, body) {
//    if (error) {
//        console.log("Error stopping Wiremck. Possibly already stopped");
//    } else {
//        console.log("Wiremock stopped");
//    }
//});