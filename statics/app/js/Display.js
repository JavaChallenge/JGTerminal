(function () {
    var _ = require('lodash');
    var log = require('debug')('JGF:display');

    function Display(io, client) {
        var topNav = templates.topNav();
        var board = templates.board();
        board.$.appendTo('body');
        topNav.$.appendTo('body');
        var _map = [];
        var _view = null;
        this.getView = function () {
            return _view;
        };
        topNav.on('view', function (view) {
            log(view);
            _view = view;
            board.setMap(_map);
            var diff = client.getViewData(view);
            board.setDiff(diff);
        });
        topNav.on('3d', function (_3d) {
            if (_3d) {
                board.$.addClass('board3d');
            } else {
                board.$.removeClass('board3d');
            }
        });

        topNav
            .on('close', function () {
                app.eventSocket.emit('command', 'exit', []);
            });

        io
            .on('info', function (info) {
                topNav.setViews(info.views);
                topNav.setView('global');
                board.setMapSize(info.mapSize);
            });
        io
            .on('map', function (map) {
                _map = map;
                board.setMap(map);
            });
        io
            .on('diff', function (diff) {
                board.setDiff(diff);
            });
        io
            .on('turn', function (turn, data) {
                board.emit('turn', data);
            });

    }

    window.Display = Display;
})();