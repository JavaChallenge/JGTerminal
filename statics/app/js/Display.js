(function () {
    var _ = require('lodash');
    var log = require('debug')('JGF:display');

    function Display(io) {
        var topNav = templates.topNav();
        var board = templates.board();
        var infoBoard = templates.info();
        topNav.$.appendTo('body');
        infoBoard.$.appendTo('body');
        board.$.appendTo('body');
        var _map = [];
        var _view = null;
        this.getView = function () {
            return _view;
        };
        topNav.on('view', function (view) {
            log(view);
            _view = view;
            io.emit('join', view);
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
                log('info');
                log(info);
                topNav.setViews(info.views);
                topNav.setView('global');
                board.setMapSize(info.mapSize);
            });
        io
            .on('map', function (map) {
                log('map');
                //log(map);
                _map = map;
                board.setMap(map);
            });
        io
            .on('diff', function (diff) {
                log('diff');
                //log(diff);
                board.setMap(_map);
                board.setDiff(diff);
            });
        io
            .on('turn', function (turn, data) {
                //log('turn' + turn);
                //log(data);
                infoBoard.emit('turn', turn);
                board.emit('turn', data);
            });

    }

    window.Display = Display;
})();