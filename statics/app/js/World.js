(function () {
    var _ = require('lodash');
    var log = require('debug')('JGF:World');

    function World() {
        var world = this;
        var board = templates.board();
        world.board = board;
        world.set3d = function (_3d) {
            log('3d', _3d);
            board.set3d(_3d);
        };

        var statics = {};
        var dynamics = {};
        var staticsByPos = {};

        world.setMapSize = function (mapsize) {
            board.setMapSize(mapsize);
        };

        world.staticsAt = function (x, y) {
            return staticsByPos[[x, y]];
        };

        world.setMap = function (map) {
            var mapById = {};
            _(map)
                .each(function (item) {
                    mapById[item.id] = true;
                    if (statics[item.id] == undefined) {
                        statics[item.id] = templates.staticObject();
                        statics[item.id].appendTo(world);
                        staticsByPos[[item.position.x, item.position.y]] = statics[item.id];
                    }
                    statics[item.id].setData(item, true);
                })
                .value();
            _(statics)
                .each(function (item, id) {
                    if (mapById[id] == undefined) {
                        item.remove();
                        delete statics[id];
                        delete staticsByPos[[item.position.x, item.position.y]];
                    }
                })
                .value();
        };

        world.setDiff = function (diff) {
            log('set diff');
            _(diff)
                .each(function (item) {
                    if (statics[item.id] == undefined) {
                        statics[item.id] = templates.staticObject();
                        staticsByPos[[item.position.x, item.position.y]] = statics[item.id];
                    }
                    statics[item.id].setData(item, true);
                })
                .value();
        };

        world.setTurn = function (data) {
            _(data.statics)
                .each(function (item) {
                    if (statics[item.id] == undefined) {
                        statics[item.id] = templates.staticObject();
                        statics[item.id].appendTo(world);
                    }
                    statics[item.id].setData(item);
                })
                .value();
            var itemsById = {};
            _(data.dynamics)
                .each(function (item) {
                    itemsById[item.id] = true;
                    if (dynamics[item.id] == undefined) {
                        dynamics[item.id] = templates.dynamicObj();
                        dynamics[item.id].appendTo(world);
                    }
                    dynamics[item.id].setData(item);
                })
                .value();

            _(dynamics)
                .each(function (item, id) {
                    if (itemsById[id] == undefined) {
                        item.remove();
                        delete dynamics[id];
                    }
                })
                .value();
        };

    }

    window.World = World;
})();