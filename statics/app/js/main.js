$(function () {
    var EventSocket = require('eventsocket');
    var events = require('events');

    window.app = {};
    app.tPort = 7001;
    app.uPort = 7000;
    app.host = '127.0.0.1';
    app.eventSocket = new EventSocket(app.tPort, app.host);

    var loadingModal = templates.loadingModal();
    var fileModal = templates.fileModal();
    var startGameModal = templates.startGameModal();
    var client = null;
    var display = null;

    loadingModal.show();

    var io = new (function () {
        var iooo = this;
        var rooms = {};
        iooo.to = function (room) {
            var r = rooms[room];
            if (r == undefined) {
                r = new events.EventEmitter();
                rooms[room] = r;
            }
            return r;
        };
    })();

    fileModal.on('newGame', function (val) {
        app.eventSocket.emit('command', 'newGame', [val]);
        fileModal.hide();
        startGameModal.show();
        setTimeout(function () {

            client = new Client(io, app.uPort, app.host);
            display = new Display(io, client);
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