(function () {
    var _ = require('lodash');
    var log = require('debug')('JGF:display');

    function Display(client) {
        var topNav = templates.topNav();
        var board = templates.board();
        board.$.appendTo('body');
        topNav.$.appendTo('body');
        var _map = [];
        var _view = null;
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

        client.io
            .to('_clients')
            .on('info', function (info) {
                topNav.setViews(info.views);
                topNav.setView('global');
                board.setMapSize(info.mapSize);

                _(info.views)
                    .each(function (view) {
                        client.io
                            .to(view)
                            .on('turn', function (turn, data) {
                                if (view == _view) {
                                    board.emit('turn', data);
                                }
                            });
                        client.io
                            .to(view)
                            .on('diff', function (diff) {
                                if (view == _view) {
                                    board.setDiff(diff);
                                }
                            });
                    })
                    .value();
            });
        client.io
            .to('_clients')
            .on('map', function (map) {
                _map = map;
                board.setMap(map);
            });
    }

    window.Display = Display;
})();