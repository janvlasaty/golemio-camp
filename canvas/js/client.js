

// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

// var server = '10.180.0.105:1337';
// var server = '10.0.0.11:1337'
// var server = 'campserver.francecentral.cloudapp.azure.com:8080';
// var server = 'golemiodemo.westeurope.cloudapp.azure.com/api/';
// server = '26537db3.ngrok.io/'
var server = 'rabin.golemio.cz/prague-live-server'
// var server = '7e11fb1a.ngrok.io'
var connection = {}
function connect() {

    connection = new WebSocket('wss://'+server+'?type=canvas');

    connection.onopen = function () {
        // connection is opened and ready to use
        console.log('Connected as canvas!');

        Message.update(
            'Připojeno ke Golemio API :-).', 
            '1000px', 2000)
    };

    connection.onclose = function(e) {
        console.log('Socket is closed. Reconnect will be attempted in 30 seconds.', e.reason);
        setTimeout(function() {
          connect();
        }, 30000);
      };

    connection.onerror = function (error) {
        // an error occurred when sending/receiving data
        console.log('error!!');
    };

    connection.onmessage = function (message) {
        // try to decode json (I assume that each message
        // from server is json)
        try {
            var json = JSON.parse(message.data);
            //console.log('This is JSON: ',json);
            //console.log(json);
            react(json);
        } catch (e) {
            console.error('Error ',e);
            return;
        }
        // handle incoming message
    };
}
setTimeout(function() { connect(); }, 10000)


function react(message) {
    switch (message.metadata.type) {

        case 'updateData':
            break;

        case 'state':
            break;  

        case 'eval':
            eval(message.data);
            break;
            
        default:
            console.log(message);
            break;

    }

}