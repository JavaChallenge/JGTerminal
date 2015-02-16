(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define("templates", ['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.templates = factory(jQuery);
    }
})(this, function($) {
    var templates = {};
    templates.board = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $boardContainer = $('<div/>')
            .addClass("board-container board3d")
            .appendTo($root);
        
        var $board = $('<div/>')
            .addClass("board")
            .appendTo($boardContainer);
        //   end $board
        //  end $boardContainer
        
        // start script 1
        
            var events = require('events');
        
            var log = require('debug')('JGF:board');
            var diffLog = require('debug')('JGF:diff');
            $.extend(obj, events.EventEmitter.prototype);
        
            var statics = {};
            var dynamics = {};
        
            obj.setMapSize = function (size) {
                $board.width(24 * size.width);
                $board.height(27 * size.height);
        
            };
        
            obj.setMap = function (map) {
                var mapById = {};
                _(map)
                        .each(function (item) {
                            mapById[item.id] = true;
                            if (statics[item.id] == undefined) {
                                statics[item.id] = templates.staticObject();
                                statics[item.id].$.appendTo($board);
                            }
                            statics[item.id].setData(item, true);
                        })
                        .value();
                _(statics)
                        .each(function (item, id) {
                            log('-------');
                            log(arguments);
                            if (mapById[id] == undefined) {
                                item.remove();
                                delete statics[id];
                            }
                        })
                        .value();
            };
        
            obj.setDiff = function (diff) {
                log('set diff');
                diffLog(diff);
                _(diff)
                        .each(function (item) {
                            if (statics[item.id] == undefined) {
                                statics[item.id] = templates.staticObject();
                            }
                            statics[item.id].setData(item, true);
                        })
                        .value();
            };
        
            obj.on('turn', function (data) {
                _(data.statics)
                        .each(function (item) {
                            if (statics[item.id] == undefined) {
                                statics[item.id] = templates.staticObject();
                                statics[item.id].$.appendTo($board);
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
                                dynamics[item.id].$.appendTo($board);
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
            });
        
        
        
        //  end script 1
        
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    templates.connecting = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $div1 = $('<div/>')
            .addClass("container")
            .appendTo($root);
        
        var $div2 = $('<div/>')
            .addClass("row")
            .appendTo($div1);
        
        var $div3 = $('<div/>')
            .addClass("col-xs-12 text-center")
            .appendTo($div2);
        
        var $i1 = $('<i/>')
            .addClass("fa fa-circle-o-notch fa-spinner fa-5x")
            .appendTo($div3);
        //     end $i1
        //    end $div3
        //   end $div2
        //  end $div1
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    templates.dynamicObj = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $item = $('<div/>')
            .appendTo($root);
        //  end $item
        
        // start script 1
        
        
            function setPos($d, x, y) {
                $d.css('left', x * 24);
                $d.css('bottom', (y - 0.5 * (x % 2)) * 27);
            }
        
            var _item;
            obj.setData = function (item) {
                _item = item;
                setPos($item, item.position.x, item.position.y);
                $item.attr('data-type', item.type);
            };
        
            obj.getData = function(){
                return _item;
            };
        
            obj.remove = function(){
                obj.$.remove();
            }
        
        
        //  end script 1
        
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    templates.error = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $div1 = $('<div/>')
            .addClass("container")
            .appendTo($root);
        
        var $div2 = $('<div/>')
            .addClass("row")
            .appendTo($div1);
        
        var $div3 = $('<div/>')
            .addClass("col-xs-12 text-center")
            .appendTo($div2);
        
        var $i1 = $('<i/>')
            .addClass("fa fa-warning fa-5x text-danger")
            .appendTo($div3);
        //     end $i1
        
        var $br1 = $('<br/>')
            .appendTo($div3);
        //     end $br1
        
        var $h11 = $('<h1/>')
            .addClass("text-danger")
            .appendTo($div3);
        $h11.append(document.createTextNode("Connection Failed"));
        //     end $h11
        
        var $strong1 = $('<strong/>')
            .appendTo($div3);
        $strong1.append(document.createTextNode("Check your server"));
        //     end $strong1
        
        var $tryBtn = $('<button/>')
            .addClass("btn btn-default")
            .appendTo($div3);
        $tryBtn.append(document.createTextNode("try again"));
        //     end $tryBtn
        //    end $div3
        //   end $div2
        //  end $div1
        
        // start script 1
        
            $tryBtn.on('click', function () {
                console.log('reconnect');
                app.eventSocket.connect(app.tPort);
            });
        
        //  end script 1
        
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    templates.fileModal = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $modal = $('<div/>')
            .addClass("modal fade")
            .attr("tabindex", "-1")
            .appendTo($root);
        
        var $div2 = $('<div/>')
            .addClass("modal-dialog")
            .appendTo($modal);
        
        var $div3 = $('<div/>')
            .addClass("modal-content")
            .appendTo($div2);
        
        var $div4 = $('<div/>')
            .addClass("modal-header")
            .appendTo($div3);
        
        var $title = $('<h4/>')
            .addClass("modal-title")
            .appendTo($div4);
        $title.append(document.createTextNode("Choose map"));
        //      end $title
        //     end $div4
        
        var $body = $('<div/>')
            .addClass("modal-body")
            .appendTo($div3);
        
        var $div6 = $('<div/>')
            .addClass("text-center")
            .appendTo($body);
        
        var $fileInput = $('<input/>')
            .addClass("hidden")
            .attr("type", "file")
            .appendTo($div6);
        //       end $fileInput
        
        var $btn = $('<button/>')
            .addClass("btn btn-default")
            .attr("type", "button")
            .appendTo($div6);
        
        var $i1 = $('<i/>')
            .addClass("fa fa-connectdevelop fa-5x")
            .appendTo($btn);
        //        end $i1
        
        var $br1 = $('<br/>')
            .appendTo($btn);
        //        end $br1
        $btn.append(document.createTextNode("Choose map"));
        //       end $btn
        
        var $br2 = $('<br/>')
            .appendTo($div6);
        //       end $br2
        
        var $br3 = $('<br/>')
            .appendTo($div6);
        //       end $br3
        
        var $fileName = $('<pre/>')
            .addClass("hide")
            .appendTo($div6);
        //       end $fileName
        //      end $div6
        //     end $body
        
        var $footer = $('<div/>')
            .addClass("modal-footer")
            .appendTo($div3);
        
        var $newBtn = $('<button/>')
            .addClass("btn btn-success disabled")
            .attr("type", "button")
            .appendTo($footer);
        $newBtn.append(document.createTextNode("New game"));
        
        var $i2 = $('<i/>')
            .addClass("fa fa-chevron-right fa-fw")
            .appendTo($newBtn);
        //       end $i2
        //      end $newBtn
        //     end $footer
        //    end $div3
        //   end $div2
        //  end $modal
        
        // start script 1
        
            obj.$modal = $modal;
            obj.$title = $title;
            obj.$body = $body;
            obj.$footer = $footer;
        
            var events = require('events');
            $.extend(obj, events.EventEmitter.prototype);
        
            $modal.modal({
                keyboard: false,
                backdrop: 'static'
            });
        
            obj.show = function () {
                $modal.appendTo('body');
                $modal.modal('show');
            };
            obj.hide = function () {
                $modal.modal('hide');
                $modal.remove();
            };
        
            obj.$btn = $btn;
            $btn.on('click', function () {
                $fileInput.click();
            });
            $fileInput.on('change', function () {
                var val = $fileInput.val();
                if (val) {
                    $fileName.text(val);
                    $newBtn.removeClass('disabled');
                    $fileName.removeClass('hide');
                } else {
                    $fileName.text('');
                    $newBtn.addClass('disabled');
                    $fileName.addClass('hide');
                }
            });
            $newBtn.on('click', function () {
                var val = $fileInput.val();
                obj.emit('newGame', val);
            });
        
        
        //  end script 1
        
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    templates.loadingModal = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $modal = $('<div/>')
            .addClass("modal fade")
            .attr("tabindex", "-1")
            .appendTo($root);
        
        var $div2 = $('<div/>')
            .addClass("modal-dialog")
            .appendTo($modal);
        
        var $div3 = $('<div/>')
            .addClass("modal-content")
            .appendTo($div2);
        
        var $div4 = $('<div/>')
            .addClass("modal-header")
            .appendTo($div3);
        
        var $title = $('<h4/>')
            .addClass("modal-title")
            .appendTo($div4);
        $title.append(document.createTextNode("Connecting ..."));
        //      end $title
        //     end $div4
        
        var $body = $('<div/>')
            .addClass("modal-body")
            .appendTo($div3);
        
        var $div6 = $('<div/>')
            .addClass("text-center")
            .appendTo($body);
        
        var $icon = $('<i/>')
            .addClass("fa fa-spin fa-spinner fa-5x")
            .appendTo($div6);
        //       end $icon
        
        var $text = $('<div/>')
            .appendTo($div6);
        //       end $text
        //      end $div6
        //     end $body
        
        var $footer = $('<div/>')
            .addClass("modal-footer")
            .appendTo($div3);
        
        var $tryBtn = $('<button/>')
            .addClass("btn btn-default")
            .attr("type", "button")
            .appendTo($footer);
        $tryBtn.append(document.createTextNode("Try again"));
        //      end $tryBtn
        //     end $footer
        //    end $div3
        //   end $div2
        //  end $modal
        
        // start script 1
        
            obj.$modal = $modal;
            obj.$title = $title;
            obj.$body = $body;
            obj.$footer = $footer;
        
            $modal.modal({
                keyboard: false,
                backdrop: 'static'
            });
        
            obj.show = function () {
                $modal.appendTo('body');
                $modal.modal('show');
            };
            obj.hide = function () {
                $modal.modal('hide');
                $modal.remove();
            };
            $tryBtn.on('click', function () {
                app.eventSocket.connect(app.tPort, app.host);
            });
            app.eventSocket.on('error', function () {
                $icon
                        .removeClass('fa-spin fa-spinner')
                        .addClass('text-danger fa-warning');
                $text
                        .addClass('text-danger')
                        .text('Connection failed')
            });
        
        //  end script 1
        
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    templates.main = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $div1 = $('<div/>')
            .addClass("container-fluid")
            .appendTo($root);
        
        var $div2 = $('<div/>')
            .addClass("row")
            .appendTo($div1);
        
        var $div3 = $('<div/>')
            .addClass("col-xs-12")
            .appendTo($div2);
        
        var $h11 = $('<h1/>')
            .addClass("text-center")
            .appendTo($div3);
        $h11.append(document.createTextNode("JG Terminal"));
        //     end $h11
        //    end $div3
        //   end $div2
        
        var $div4 = $('<div/>')
            .addClass("row")
            .appendTo($div1);
        
        var $div5 = $('<div/>')
            .addClass("col-xs-6")
            .appendTo($div4);
        
        var $h21 = $('<h2/>')
            .appendTo($div5);
        $h21.append(document.createTextNode("Choose map"));
        //     end $h21
        //    end $div5
        
        var $div6 = $('<div/>')
            .addClass("col-xs-6")
            .appendTo($div4);
        
        var $fileInput = $('<input/>')
            .addClass("hidden")
            .attr("type", "file")
            .appendTo($div6);
        //     end $fileInput
        
        var $fileBtn = $('<button/>')
            .addClass("btn btn-default btn-block")
            .appendTo($div6);
        
        var $i1 = $('<i/>')
            .addClass("fa fa-file fa-3x")
            .appendTo($fileBtn);
        //      end $i1
        //     end $fileBtn
        
        var $fileOutput = $('<span/>')
            .addClass("text-muted")
            .appendTo($div6);
        //     end $fileOutput
        //    end $div6
        //   end $div4
        
        var $div7 = $('<div/>')
            .addClass("row")
            .appendTo($div1);
        
        var $div8 = $('<div/>')
            .addClass("col-xs-6")
            .appendTo($div7);
        
        var $h22 = $('<h2/>')
            .appendTo($div8);
        $h22.append(document.createTextNode("New game"));
        //     end $h22
        //    end $div8
        
        var $div9 = $('<div/>')
            .addClass("col-xs-6")
            .appendTo($div7);
        
        var $newGame = $('<button/>')
            .addClass("btn btn-default btn-block")
            .appendTo($div9);
        
        var $i2 = $('<i/>')
            .addClass("fa fa-plus-square fa-3x")
            .appendTo($newGame);
        //      end $i2
        //     end $newGame
        //    end $div9
        //   end $div7
        
        var $div10 = $('<div/>')
            .addClass("row")
            .appendTo($div1);
        
        var $div11 = $('<div/>')
            .addClass("col-xs-6")
            .appendTo($div10);
        
        var $h23 = $('<h2/>')
            .appendTo($div11);
        $h23.append(document.createTextNode("Run client"));
        //     end $h23
        //    end $div11
        
        var $div12 = $('<div/>')
            .addClass("col-xs-6")
            .appendTo($div10);
        
        var $pre1 = $('<pre/>')
            .appendTo($div12);
        $pre1.append(document.createTextNode("$ python main.py\n$ java main.class\n$ ./main.out\n$ node index.js"));
        //     end $pre1
        //    end $div12
        //   end $div10
        
        var $div13 = $('<div/>')
            .addClass("row")
            .appendTo($div1);
        
        var $div14 = $('<div/>')
            .addClass("col-xs-6")
            .appendTo($div13);
        
        var $h24 = $('<h2/>')
            .appendTo($div14);
        $h24.append(document.createTextNode("Start game"));
        //     end $h24
        //    end $div14
        
        var $div15 = $('<div/>')
            .addClass("col-xs-6")
            .appendTo($div13);
        
        var $startBtn = $('<button/>')
            .addClass("btn btn-default btn-block")
            .appendTo($div15);
        
        var $i3 = $('<i/>')
            .addClass("fa fa-play fa-3x")
            .appendTo($startBtn);
        //      end $i3
        //     end $startBtn
        //    end $div15
        //   end $div13
        
        var $div16 = $('<div/>')
            .addClass("row")
            .appendTo($div1);
        
        var $div17 = $('<div/>')
            .addClass("col-xs-6")
            .appendTo($div16);
        
        var $h25 = $('<h2/>')
            .appendTo($div17);
        $h25.append(document.createTextNode("Controls"));
        //     end $h25
        //    end $div17
        
        var $btnGroupContainer = $('<div/>')
            .addClass("col-xs-6 text-center")
            .appendTo($div16);
        
        var $div19 = $('<div/>')
            .addClass("btn-group")
            .appendTo($btnGroupContainer);
        
        var $resumeBtn = $('<button/>')
            .addClass("btn btn-default")
            .appendTo($div19);
        
        var $i4 = $('<i/>')
            .addClass("fa fa-play fa-2x")
            .appendTo($resumeBtn);
        //       end $i4
        //      end $resumeBtn
        
        var $pauseBtn = $('<button/>')
            .addClass("btn btn-default")
            .appendTo($div19);
        
        var $i5 = $('<i/>')
            .addClass("fa fa-pause fa-2x")
            .appendTo($pauseBtn);
        //       end $i5
        //      end $pauseBtn
        
        var $stopBtn = $('<button/>')
            .addClass("btn btn-default")
            .appendTo($div19);
        
        var $i6 = $('<i/>')
            .addClass("fa fa-stop fa-2x")
            .appendTo($stopBtn);
        //       end $i6
        //      end $stopBtn
        //     end $div19
        //    end $btnGroupContainer
        //   end $div16
        
        var $div20 = $('<div/>')
            .addClass("row")
            .appendTo($div1);
        
        var $div21 = $('<div/>')
            .addClass("col-xs-12")
            .appendTo($div20);
        
        var $output = $('<pre/>')
            .attr("id", "output")
            .appendTo($div21);
        //     end $output
        
        var $form = $('<form/>')
            .appendTo($div21);
        
        var $input = $('<input/>')
            .addClass("form-control")
            .attr("type", "text")
            .appendTo($form);
        //      end $input
        //     end $form
        //    end $div21
        //   end $div20
        //  end $div1
        
        // start script 1
        
        
            function appendTerminal(line) {
                var $span = $('<span>').text(line);
                $output
                        .append($span)
                        .append('\n')
                        .prop({
                            scrollTop: $output[0].scrollHeight
                        });
                return $span;
            }
        
            function command(name, args) {
                app.eventSocket.emit('command', name, args || []);
                var argStr = _(args)
                        .map(_.ary(JSON.stringify, 1))
                        .join(' ');
                appendTerminal('$ ' + name + ' ' + argStr).addClass('text-success bolder');
            }
        
            app.eventSocket.on('init', function (lines) {
                appendTerminal('init').addClass('text-danger bolder');
                _.each(lines, function (line) {
                    appendTerminal(line).addClass('text-danger');
                })
            });
        
            app.eventSocket.on('report', function (lines) {
                appendTerminal('report').addClass('text-danger bolder');
                _.each(lines, function (line) {
                    appendTerminal(line).addClass('text-danger');
                })
            });
        
            app.eventSocket.on('connect', function (lines) {
                appendTerminal('-- connect --').addClass('text-muted');
            });
            app.eventSocket.on('disconnect', function (lines) {
                appendTerminal('-- disconnect --').addClass('text-muted');
            });
            app.eventSocket.on('error', function (lines) {
                appendTerminal('-- error --').addClass('text-muted');
            });
        
            $form.on('submit', function (e) {
                e.preventDefault();
                var val = $input.val();
                val = _.trim(val);
                if (val) {
                    var args = val.split(/\s+/);
                    var name = args.shift();
                    command(name, args);
                    $input.val('');
                }
                return false;
            });
        
            $fileInput.on('change', function () {
                var val = $fileInput.val();
                if (val) {
                    var path = require('path');
                    var name = path.basename(val);
                    $fileOutput.text(name + ' selected.');
                } else {
                    $fileOutput.text('');
                }
            });
        
            $fileBtn.on('click', function () {
                $fileInput.click();
            });
        
            $newGame.on('click', function () {
                var val = $fileInput.val();
                if (val) {
                    command('newGame', [val]);
                }
            });
        
            $startBtn.on('click', function () {
                command('startGame');
            });
        
            $resumeBtn.on('click', function () {
                command('resumeGame');
            });
            $pauseBtn.on('click', function () {
                command('pauseGame');
            });
        
            $stopBtn.on('click', function () {
                command('endGame');
            });
        
            $resumeBtn.tooltip({container: $btnGroupContainer, title: 'Resume game'});
            $pauseBtn.tooltip({container: $btnGroupContainer, title: 'Pause game'});
            $stopBtn.tooltip({container: $btnGroupContainer, title: 'End game'});
        
        
        //  end script 1
        
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    templates.modal = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $modal = $('<div/>')
            .addClass("modal fade")
            .attr("tabindex", "-1")
            .appendTo($root);
        
        var $div2 = $('<div/>')
            .addClass("modal-dialog")
            .appendTo($modal);
        
        var $div3 = $('<div/>')
            .addClass("modal-content")
            .appendTo($div2);
        
        var $div4 = $('<div/>')
            .addClass("modal-header")
            .appendTo($div3);
        
        var $title = $('<h4/>')
            .addClass("modal-title")
            .appendTo($div4);
        $title.append(document.createTextNode("" + (data.title == undefined ? "" : data.title) + ""));
        //      end $title
        //     end $div4
        
        var $body = $('<div/>')
            .addClass("modal-body")
            .appendTo($div3);
        //     end $body
        
        var $footer = $('<div/>')
            .addClass("modal-footer")
            .appendTo($div3);
        //     end $footer
        //    end $div3
        //   end $div2
        //  end $modal
        
        // start script 1
        
            obj.$modal = $modal;
            obj.$title = $title;
            obj.$body = $body;
            obj.$footer = $footer;
        
            $modal.modal({
                keyboard: false,
                backdrop: 'static'
            });
        
            obj.show = function () {
                $modal.appendTo('body');
                $modal.modal('show');
            };
            obj.hide = function () {
                $modal.modal('hide');
                $modal.remove();
            };
        
        //  end script 1
        
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    templates.startGameModal = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $modal = $('<div/>')
            .addClass("modal fade")
            .attr("tabindex", "-1")
            .appendTo($root);
        
        var $div2 = $('<div/>')
            .addClass("modal-dialog")
            .appendTo($modal);
        
        var $div3 = $('<div/>')
            .addClass("modal-content")
            .appendTo($div2);
        
        var $div4 = $('<div/>')
            .addClass("modal-header")
            .appendTo($div3);
        
        var $title = $('<h4/>')
            .addClass("modal-title")
            .appendTo($div4);
        $title.append(document.createTextNode("Run clients"));
        //      end $title
        //     end $div4
        
        var $body = $('<div/>')
            .addClass("modal-body")
            .appendTo($div3);
        
        var $div6 = $('<div/>')
            .addClass("text-center")
            .appendTo($body);
        
        var $pre1 = $('<pre/>')
            .appendTo($div6);
        $pre1.append(document.createTextNode("$ python main.py\n$ java main.class\n$ ./main.out\n$ node index.js"));
        //       end $pre1
        //      end $div6
        //     end $body
        
        var $footer = $('<div/>')
            .addClass("modal-footer")
            .appendTo($div3);
        
        var $startBtn = $('<button/>')
            .addClass("btn btn-success disabled")
            .attr("type", "button")
            .appendTo($footer);
        $startBtn.append(document.createTextNode("Start game"));
        //      end $startBtn
        //     end $footer
        //    end $div3
        //   end $div2
        //  end $modal
        
        // start script 1
        
            obj.$modal = $modal;
            obj.$title = $title;
            obj.$body = $body;
            obj.$footer = $footer;
        
            var events = require('events');
            $.extend(obj, events.EventEmitter.prototype);
        
            $modal.modal({
                keyboard: false,
                backdrop: 'static'
            });
        
            obj.show = function () {
                $modal.appendTo('body');
                $modal.modal('show');
            };
            obj.hide = function () {
                $modal.modal('hide');
                $modal.remove();
            };
            $startBtn.on('click', function () {
                obj.emit('startGame');
            });
            app.eventSocket.on('report', function (args) {
                if (args && args[0] == 'ready') {
                    $startBtn
                            .removeClass('disabled');
                }
            });
        
        //  end script 1
        
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    templates.staticObject = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $item = $('<div/>')
            .addClass("block")
            .appendTo($root);
        
        var $i = $('<i/>')
            .addClass("static-icon fa fa-fw")
            .appendTo($item);
        //   end $i
        //  end $item
        
        // start script 1
        
        
            function setPos($d, x, y) {
                $d.css('left', x * 24);
                $d.css('bottom', (y - 0.5 * (x % 2)) * 27);
            }
        
            var _item;
            obj.setData = function (item, force) {
                if (force == undefined) {
                    force = false;
                }
                if ((_item && item.turn < _item.turn) && !force) {
                    return;
                }
                _item = item;
                setPos($item, item.position.x, item.position.y);
                $item.attr('data-type', item.type);
                if (item.other && item.other.height !== undefined) {
                    $item.attr('data-height', item.other.height);
                }
        
                if (item.type == 'none') {
                    $i.attr('class', 'static-icon fa fa-fw');
                }
        
                if (item.type == 'normal') {
                    $i.attr('class', 'static-icon fa fa-fw');
                }
                if (item.type == 'resource') {
                    $i.attr('class', 'static-icon fa fa-fw fa-pagelines');
                }
                if (item.type == 'mitosis') {
                    $i.attr('class', 'static-icon fa fa-fw fa-share-alt');
                }
            };
        
            obj.getData = function () {
                return _item;
            };
        
            obj.remove = function(){
                obj.$.remove();
            }
        
        
        //  end script 1
        
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    templates.topNav = function (data, opts) {
        // generated by jQfy 1.3.8
        opts = $.extend({}, opts);
        data = $.extend({}, data);
        var obj = {};
        var $root = $('<div/>');
        
        var $nav1 = $('<nav/>')
            .addClass("navbar navbar-default navbar-fixed-top")
            .appendTo($root);
        
        var $div1 = $('<div/>')
            .addClass("navbar-header")
            .appendTo($nav1);
        
        var $a1 = $('<a/>')
            .addClass("navbar-brand")
            .attr("href", "#")
            .appendTo($div1);
        $a1.append(document.createTextNode("Mitosis"));
        //    end $a1
        //   end $div1
        
        var $ul1 = $('<ul/>')
            .addClass("nav navbar-nav")
            .appendTo($nav1);
        
        var $3dli = $('<li/>')
            .addClass("active")
            .appendTo($ul1);
        
        var $3dBtn = $('<a/>')
            .appendTo($3dli);
        $3dBtn.append(document.createTextNode("3D/2D"));
        //     end $3dBtn
        //    end $3dli
        
        var $li2 = $('<li/>')
            .appendTo($ul1);
        
        var $closeBtn = $('<a/>')
            .attr("href", "#")
            .appendTo($li2);
        $closeBtn.append(document.createTextNode("Stop Server"));
        //     end $closeBtn
        //    end $li2
        //   end $ul1
        
        var $p1 = $('<p/>')
            .addClass("navbar-text")
            .appendTo($nav1);
        $p1.append(document.createTextNode("Views:"));
        //   end $p1
        
        var $views = $('<ul/>')
            .addClass("nav navbar-nav")
            .appendTo($nav1);
        //   end $views
        //  end $nav1
        
        // start script 1
        
            var events = require('events');
            $.extend(obj, events.EventEmitter.prototype);
        
            obj.setView = function (view) {
                $views.find('li').removeClass('active');
                _views[view].addClass('active');
                obj.emit('view', view);
            };
        
            var _views = {};
            var _3d = true;
        
            $3dBtn.on('click', function (e) {
                e.preventDefault();
                _3d = !_3d;
                if (_3d) {
                    $3dli.addClass('active');
                } else {
                    $3dli.removeClass('active');
                }
                obj.emit('3d', _3d);
                return false;
            });
        
            $closeBtn.on('click', function (e) {
                e.preventDefault();
                obj.emit('close');
                return false;
            });
        
            obj.setViews = function (views) {
                _views = {};
                $views.empty();
                _(views)
                        .each(function (view) {
                            var $li = $('<li></li>').appendTo($views);
                            var $a = $('<a></a>').text(view).appendTo($li);
        
                            _views[view] = $li;
        
                            $a.on('click', function (e) {
                                e.preventDefault();
                                obj.setView(view);
                                return false;
                            });
                        })
                        .value();
            };
        
        //  end script 1
        
        // end $root
        var output = $root.contents();
        obj.$ = output;
        return obj;
    };
    
    return templates;
});
