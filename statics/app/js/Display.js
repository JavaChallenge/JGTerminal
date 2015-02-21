(function () {
    var _ = require('lodash');
    var log = require('debug')('JGF:display');

    function Display(io) {
        var topNav = templates.topNav();
        var world = new World();
        var infoBoard = templates.info();
        topNav.$.appendTo('body');
        infoBoard.$.appendTo('body');
        world.board.$.appendTo('body');
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
            log('3d', _3d);
            world.set3d(_3d);
        });
        topNav.set3d(true);

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
                world.setMapSize(info.mapSize);
            });
        io
            .on('map', function (map) {
                log('map');
                _map = map;
                world.setMap(map);
            });
        io
            .on('diff', function (diff) {
                log('diff');
                world.setMap(_map);
                world.setDiff(diff);
            });
        io
            .on('turn', function (turn, data) {
                infoBoard.setTurn(turn);
                world.setTurn(data);
            });

    }

    window.Display = Display;
})();