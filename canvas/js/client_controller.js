

// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

// var server = '10.180.0.105:1337';
// var server = 'localhost:1337';
var server = 'rabin.golemio.cz/prague-live-server';
var connection = {}

var url = new URL(window.location.href);
var key = url.searchParams.get("key");

function connect() {
    connection = new WebSocket('wss://'+server+'?type=controller&key='+key);

    connection.onopen = function () {
        // connection is opened and ready to use
        console.log('Connected as controller!!');
    };


    connection.onclose = function(e) {
        console.log('Socket is closed. Reconnect will be attempted in 10 seconds.', e.reason);
        setTimeout(function() {
        connect();
        }, 10000);
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
            react(json)
        } catch (e) {
            console.error('Error ',e);
            return;
        }
        // handle incoming message
    };
}
connect();

function react(message) {
    switch (message.metadata.type) {            
        default:
            console.log(message);
            break;
    }
}

function sendMessage(message) {
    connection.send(JSON.stringify(message))
}

function evalInConsole(string) {
    sendMessage({metadata:{type:'sendToCanvas'},data:{metadata:{type:'eval'},data:string}})
}