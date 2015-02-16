$(function () {
    var EventSocket = require('eventsocket');
    var events = require('events');
    var log = require('debug')('JGF:main');

    window.app = {};
    app.tPort = 7001;
    app.uPort = 7000;
    app.host = '127.0.0.1';
    if (process.env.JGF_HOST !== undefined) {
        app.host = process.env.JGF_HOST;
    }
    app.eventSocket = new EventSocket(app.tPort, app.host);

    var loadingModal = templates.loadingModal();
    var fileModal = templates.fileModal();
    var startGameModal = templates.startGameModal();
    var client = null;
    var display = null;

    loadingModal.show();

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

    window.ioClient = function () {
        var ioSocket = new IOSocket();
        var socket = ioSocket.serverSocket;
        var _view = null;

        socket.on('join', function (view) {
            _view = view;
            var data = client.getViewData(view);
            io.to(view)
                .emit('diff', data);
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
                                var _view = display.getView();
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

        return ioSocket.clientSocket;
    };

    fileModal.on('newGame', function (val) {
        if (process.env.JGF_MAP_PATH !== undefined) {
            val = process.env.JGF_MAP_PATH;
        }
        app.eventSocket.emit('command', 'newGame', [val]);
        fileModal.hide();
        startGameModal.show();
        setTimeout(function () {

            client = new Client(io, app.uPort, app.host);
            display = new Display(ioClient(), client);
        }, 100);
    });

    startGameModal.on('startGame', function () {
        startGameModal.hide();
        app.eventSocket.emit('command', 'startGame', []);
    });

    app.eventSocket.on('connect', function () {
        app.eventSocket.emit('token', _.repeat('0', 32));
    });

    app.eventSocket.on('init', function () {
        loadingModal.hide();
        fileModal.show();
    });

    app.eventSocket.on('disconnect', function () {
    });

    app.eventSocket.on('error', function () {
    });
});