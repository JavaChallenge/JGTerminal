(function () {
    var events = require('events');
    var log = require('debug')('JGF:io');
    var io = new (function () {
        var rooms = {};
        this.to = function (room) {
            var r = rooms[room];
            if (r == undefined) {
                r = new events.EventEmitter();
                rooms[room] = r;
            }
            return r;
        };
    })();

    window.io = io;

    window.ioClient = function () {
        var ioSocket = new IOSocket();
        var socket = ioSocket.serverSocket;
        var _view = null;

        socket.on('join', function (view) {
            _view = view;
        });

        io.to('_clients')
            .on('info', function (info) {
                log('info');
                log(info);
                socket.emit('info', info);

                _(info.views)
                    .each(function (view) {
                        io
                            .to(view)
                            .on('turn', function (turn, data) {
                                if (view == _view) {
                                    socket.emit('turn', turn, data);
                                }
                            });
                        io.to(view)
                            .on('diff', function (diff) {
                                log('diff');
                                if (view == _view) {
                                    socket.emit('diff', diff);
                                }
                            });
                    })
                    .value();
            });

        io.to('_clients')
            .on('map', function (map) {
                log('map');
                socket.emit('map', map);
            });

        setTimeout(function () {
            socket.emit('connect');
        }, 100);

        return {
            socket: ioSocket.serverSocket,
            connect: function () {
                return ioSocket.clientSocket;
            }
        };
    };
})();