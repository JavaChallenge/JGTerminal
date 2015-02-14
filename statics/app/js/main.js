$(function () {
    var EventSocket = require('eventsocket');
    window.app = {};
    app.port = 7001;
    app.host = '127.0.0.1';
    app.eventSocket = new EventSocket(app.port, app.host);

    var connecting = templates.connecting();
    var error = templates.error();
    var main = templates.main();

    connecting.$.appendTo('body');
    error.$.addClass('hidden').appendTo('body');
    main.$.addClass('hidden').appendTo('body');

    app.eventSocket.on('connect', function () {
        app.eventSocket.emit('token', _.repeat('0', 32));
    });
    app.eventSocket.on('init', function () {
        connecting.$.addClass('hidden');
        main.$.removeClass('hidden');
        error.$.addClass('hidden');
    });
    app.eventSocket.on('disconnect', function () {
        connecting.$.addClass('hidden');
        main.$.addClass('hidden');
        error.$.removeClass('hidden');
    });
    app.eventSocket.on('error', function () {
        connecting.$.addClass('hidden');
        main.$.addClass('hidden');
        error.$.removeClass('hidden');
    });
});