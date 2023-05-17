const net = require('net');
const mysql = require('mysql');

const client = new net.Socket();

client.connect(8888, '127.0.0.1', function() {
    console.log('Connected');
});

client.on('data', function(data) {
    console.log('Received: ' + data);
    client.write('testtt');
});

client.on('close', function() {
    console.log('Connection closed');
});