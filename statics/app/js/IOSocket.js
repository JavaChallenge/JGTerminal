(function () {
    var events = require('events');
    var _ = require('lodash');

    function IOSocket() {
        var ioSocket = this;

        var c2s = new events.EventEmitter(); // emit from client to server on
        var s2c = new events.EventEmitter(); // emit from server to client on

        var ss = {};
        var cs = {};

        cs.on = _.bind(s2c.on, s2c);
        ss.emit = _.bind(s2c.emit, s2c);

        ss.on = _.bind(c2s.on, c2s);
        cs.emit = _.bind(c2s.emit, c2s);

        ioSocket.serverSocket = ss;
        ioSocket.clientSocket = cs;
    }

    window.IOSocket = IOSocket;
})();