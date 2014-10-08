'use strict';

var zmq = require('zmq');
var Events = require('../').Events;


var publisher, socket;

publisher = process.env.PUBLISHER || 'tcp://127.0.0.1:12345';

socket = zmq.socket('sub');
socket.identity = 'github-event-subscriber-' + process.pid;
socket.connect(publisher);
socket.subscribe(Events.PUSH);
socket.subscribe(Events.PULL_REQUEST);
socket.on('message', function(type/*, identity*/, event) {
    type = type.toString();
    event = JSON.parse(event.toString());
    console.log(event.id, type, new Date(event.created_at));
});