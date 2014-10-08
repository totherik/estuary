#!/usr/bin/env node

var zmq = require('zmq');
var util = require('util');
var arroyo = require('arroyo');
var minimist = require('minimist');
var eid = require('../lib/eid');


var argv, eidfile, options;

// Parse arguments.
argv = minimist(process.argv.slice(2), {
    alias: {
        token:    't',
        event_id: 'e',
        url:      'u',
        address:  'a',
        identity: 'i'
    },
    defaults: {
        token:    process.env.GITHUB_TOKEN,
        event_id: process.env.GITHUB_EVENT_ID,
        url:      process.env.GITHUB_EVENT_URL || 'https://api.github.com/events',
        address:  process.env.ZEROMQ_SOCKET_ADDRESS || 'tcp://127.0.0.1:12345',
        identity: process.env.ZEROMQ_SOCKET_IDENTITY || 'github-event-publisher-%d'
    }
});


// Setup eidfile
eidfile = eid('./estuary.eid');


// Create arroyo arguments.
options = {
    url: argv.url,
    lastEventId: argv.event_id || eidfile.read(),
    headers: {}
};

if (argv.token) {
    options.headers['Authorization'] = 'token ' + argv.token;
}


// Initialize socket and start streaming
socket = zmq.socket('pub');
socket.identity = util.format(argv.identity, process.pid);
socket.bind(argv.address, function (err) {
    var eventStream;

    if (err) {
        throw err;
    }

    eventStream = arroyo(options);

    eventStream.on('error', function (err) {
        console.error(err);
    });

    eventStream.on('data', function (event) {
        socket.send(event.type, zmq.ZMQ_SNDMORE);
//        socket.send(socket.identity, zmq.ZMQ_SNDMORE);
        socket.send(JSON.stringify(event));
        eidfile.write(event.id);
    });
});
