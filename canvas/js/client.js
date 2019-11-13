// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

// var server = 'api.golemio.cz/prague-live-server';
var server = 'rabin.golemio.cz/prague-live-server';
var connection = {}
function connect() {

    connection = new WebSocket('wss://'+server+'?type=canvas');

    connection.onopen = function () {
        // connection is opened and ready to use
        console.log('Connected as canvas!');
        
        Message.update(
            'Connected to Golemio API.', 
            '2500px', 1000, 'slower')
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