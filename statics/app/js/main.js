$(function () {
    var EventSocket = require('eventsocket');
    var events = require('events');
    var log = require('debug')('JGF:main');

    window.app = {};

    app.consts = {};
    app.consts.MAX_CELL_ENERGY = 100;
    app.consts.MAX_BLOCK_RESOURCE = 300;

    app.tPort = 7001;
    app.uPort = 7000;
    app.host = '127.0.0.1';
    if (process.env.JGF_HOST !== undefined) {
        app.host = process.env.JGF_HOST;
    }
    app.eventSocket = new EventSocket(app.tPort, app.host);

    var expandBtn = templates.expandBtn();
    expandBtn.$.appendTo('body');
    var loadingModal = templates.loadingModal();
    var fileModal = templates.fileModal();
    var startGameModal = templates.startGameModal();
    var client = null;
    var display = null;

    loadingModal.show();

    fileModal.on('newGame', function (val) {
        if (process.env.JGF_MAP_PATH !== undefined) {
            val = process.env.JGF_MAP_PATH;
        }
        app.eventSocket.emit('command', 'newGame', [val]);
        fileModal.hide();
        startGameModal.show();
        setTimeout(function () {

            client = new Client(window.io, app.uPort, app.host);
            var ioConnection = ioClient();
            ioConnection.socket.on('join', function (view) {
                var data = client.getViewData(view);
                io.to(view)
                    .emit('diff', data);
            });
            display = new Display(ioConnection.connect(), client);
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