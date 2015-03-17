/*
 combined files :

 gallery/autoResponsive/1.2/config
 gallery/autoResponsive/1.2/anim
 gallery/autoResponsive/1.2/linkedlist
 gallery/autoResponsive/1.2/gridsort
 gallery/autoResponsive/1.2/base
 gallery/autoResponsive/1.2/plugin/hash
 gallery/autoResponsive/1.2/plugin/drag
 gallery/autoResponsive/1.2/plugin/loader
 gallery/autoResponsive/1.2/index

 */
/**
 * @Description:    ��ҳ����Ӧ����ȫ������ģ��
 * @Author:         dafeng.xdf[at]taobao.com
 * @Date:           2013.3.5
 */
KISSY.add('gallery/autoResponsive/1.2/config',function () {
    'use strict';
    var EMPTY = '';

    /**
     * @name Config
     * @param {String}  container            �������
     * @param {String}  selector             ��Ԫѡ����
     * @param {String}  filter               ��Ԫ������
     * @param {String}  fixedSelector        [*]ռλѡ����
     * @param {String}  priority             ����ѡ����
     * @param {Number}  gridWidth            ��Сդ��Ԫ���<code>px</code>
     * @param {Object}  unitMargin           ��Ԫ����߾�<code>px</code>
     * @param {Boolean} closeAnim            �Ƿ�رն�����Ĭ�Ͽ�����
     * @param {Number}  duration             ���䶯��ʱ�䣬����ֻ���IEϵ����Ч
     * @param {String}  easing               ���䶯�����ӣ�����ֻ���IEϵ����Ч
     * @param {String}  direction            ������ʼ���򣨿�ѡֵ��<code>'right'</code>��
     * @param {Boolean} random               ������򿪹أ�Ĭ�Ϲرգ�
     * @param {String}  sortBy               �����㷨����ѡֵ��<code>'grid'</code>��<code>'cell'</code>��Ĭ��Ϊ<code>'grid'</code>��
     * @param {Boolean} autoHeight           �����߶�����Ӧ���أ�Ĭ��Ϊtrue��
     * @param {Boolean} suspend              ��Ⱦ��������Ƿ�֧�ֹ��𣨹���ʱ������ִ�н���UI�߳� | Ĭ��Ϊtrue��
     * @param {Array}   plugins              �������
     * @param {Boolean} autoInit             �Ƿ��Զ���ʼ����Ĭ��Ϊtrue��
     * @param {Boolean} closeResize          �Ƿ�ر�resize�󶨣�Ĭ�ϲ��رգ�
     * @param {Number}  resizeFrequency      resize����Ƶ��
     * @param {Array}   whensRecountUnitWH   ���¼��㵥Ԫ��ߵ���Ϊʱ�̣���ѡֵ��<code>'closeResize', 'adjust'</code>��
     * @param {Number}  delayOnResize        resizeʱ�ӳ���Ⱦ����Ҫ�ǽ��css3������ҳ��ڵ����Ը��²���ʱ���µ���Ⱦʱ���������ݲ�׼ȷ����[��ʱ����취]
     * @param {Boolean} landscapeOrientation ���ַ�������Ϊ����Ĭ��Ϊfalse������
     */
    function Config() {
        return {
            container: {value: EMPTY},
            selector: {value: EMPTY},
            filter: {value: EMPTY},
            fixedSelector: {value: EMPTY},
            priority: {value: EMPTY},
            gridWidth: {value: 10},
            unitMargin: {value: {x: 0, y: 0}},
            closeAnim: {value: false},
            duration: {value: 1},
            easing: {value: 'easeNone'},
            direction: {value: 'left'},
            random: {value: false},
            sortBy: {value: EMPTY},
            autoHeight: {value: true},
            closeResize: {value: false},
            autoInit: {value: true},
            plugins: {value: []},
            suspend: {value: true},
            cache: {value: false},
            resizeFrequency: {value: 200},
            whensRecountUnitWH: {value: []},
            delayOnResize: {value: -1},
            landscapeOrientation: {value:false}
        };
    }
    return Config;
});
/**
 * @Description: ����css3�͵Ͱ汾���������Ч��
 * @Author:      dafeng.xdf[at]taobao.com
 * @Date:        2013.3.5
 */
KISSY.add('gallery/autoResponsive/1.2/anim',function (S) {
    'use strict';
    var D = S.DOM, Anim = S.Anim,

        letIE10 = S.UA.ie < 11,

        prefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''],

        animType = letIE10 ? 'fixedAnim' : 'css3Anim';

    /**
     * @name AutoAnim
     * @class css����������֡�ظ�
     * @constructor
     */
    function AutoAnim(cfg) {
        this.cfg = cfg;
        this._init();
    }

    S.augment(AutoAnim, {
        _init: function () {
            this[animType]();
        },
        /**
         * supply css ua prefix
         */
        cssPrefixes: function (styleKey, styleValue) {
            var fixedRule = {};

            for (var i = 0, len = prefixes.length; i < len; i++) {
                fixedRule[prefixes[i] + styleKey] = styleValue;
            }

            return fixedRule;
        },
        /**
         * css3����Ч��
         */
        css3Anim: function () {
            /*
             * css3Ч���������
             * Ϊ�˼��ٶ����ȡcss3ģʽȥ��duration���ã���Ϊcss�ж�ȡ
             */
            var cfg = this.cfg;
            // TODO �Ż��㣺��Ȼcss3Anim��ѭ���У����Կ��ǽ���cfg.direction !== 'right'�����ж��������߼��������ᣬ�Լӿ�ú�����ִ��
            D.css(cfg.elm, this.cssPrefixes('transform', 'translate(' + ((cfg.direction !== 'right') ? cfg.x : (cfg.owner.gridSort.containerWH - cfg.elm.__width - cfg.x)) + 'px,' + cfg.y + 'px) '));

            // ��Ԫ����󴥷�
            cfg.owner.fire('afterUnitArrange', {
                autoResponsive: {     // TODO �Ż��㣺��Ȼ�Ǹ��Զ����¼����Σ�û��Ҫ�ٶ��һ�� 'autoResponsive' key
                    elm: cfg.elm,
                    position: {
                        x: cfg.x,
                        y: cfg.y
                    },
                    frame: cfg.owner.frame
                }
            });
            S.log('css3 anim success');
        },
        /**
         * ����ģ��css3����
         */
        fixedAnim: function () {
            var cfg = this.cfg,
                cssRules = {'top': cfg.y};

            if (cfg.closeAnim) {
                this.noneAnim();
                return;
            }

            cssRules[cfg.direction == 'right' ? 'right' : 'left'] = cfg.x;

            new Anim(cfg.elm, cssRules, cfg.duration, cfg.easing, function () {

                // ��Ԫ����󴥷�
                cfg.owner.fire('afterUnitArrange', {
                    autoResponsive: {
                        elm: cfg.elm,
                        position: {
                            x: cfg.x,
                            y: cfg.y
                        },
                        frame: cfg.owner.frame
                    }
                });
            }).run();
            S.log('kissy anim success');
        },
        /**
         * �޶���
         */
        noneAnim: function () {
            var cfg = this.cfg;

            D.css(cfg.elm, {
                left: cfg.x,
                top: cfg.y
            });

            // ��Ԫ����󴥷�
            cfg.owner.fire('afterUnitArrange', {
                autoResponsive: {
                    elm: cfg.elm,
                    position: {
                        x: cfg.x,
                        y: cfg.y
                    },
                    frame: cfg.owner.frame
                }
            });
            S.log('maybe your anim is closed');
        }
    });
    return AutoAnim;
}, {requires: ['dom', 'anim']});

/**
 * @Description: ����һ��˫�����������
 * @Author:      dafeng.xdf[at]taobao.com
 * @Date:        2013.3.5
 */
KISSY.add('gallery/autoResponsive/1.2/linkedlist',function (S) {
    'use strict';
    /**
     * @name LinkedList
     * @class ˫���������
     * @constructor
     */
    function LinkedList(cfg) {
        var self = this;
        self.length = 0;
        self.head = null;
        self.tail = null;
        self.type = cfg.type || true;
        self.query = [];
        self.init();
    }

    S.augment(LinkedList, {
        /**
         * ��ʼ���������������
         */
        init: function () {
            S.augment(Array, {
                shuffle: function () {
                    for (var j, x, i = this.length;
                         i;
                         j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
                    return this;
                }
            });
        },
        /**
         * �����ڵ�
         */
        add: function (value) {
            var self = this;
            if (self.type) {
                self.query.push(value);
                return;
            }
            var node = {
                value: value,
                next: null,//ǰ��
                prev: null//���
            };
            if (self.length == 0) {
                self.head = self.tail = node;
            } else {
                self.tail.next = node;
                node.prev = self.tail;
                self.tail = node;
            }
            self.length++;
        },
        /**
         * ɾ���ڵ�
         */
        remove: function (index) {
            var self = this;
            if (index > self.length - 1 || index < 0) {
                return null;
            }
            var node = self.head,
                i = 0;
            if (index == 0) {
                self.head = node.next;
                if (self.head == null) {
                    self.tail = null;
                }
                else {
                    self.head.previous = null;
                }
            }
            else if (index == self.length - 1) {
                node = self.tail;
                self.tail = node.prev;
                self.tail.next = null;
            }
            else {
                while (i++ < index) {
                    node = node.next;
                }
                node.prev.next = node.next;
                node.next.prev = node.prev;
            }
            self.length--;
        },
        /**
         * ��ȡ����ֵ
         */
        get: function (index) {
            var self = this;
            if (self.type) {
                return self.query[index];
            }
            return self.node(index).value;
        },
        /**
         * ��������ڵ�
         */
        node: function (index) {
            var self = this;
            if (index > self.length - 1 || index < 0) {
                return null;
            }
            var node = self.head,
                i = 0;
            while (i++ < index) {
                node = node.next;
            }
            return node;
        },
        /**
         * ���½ڵ�ֵ
         */
        update: function (index, value) {
            var self = this;
            if (self.type) {
                self.query[index] = value;
                return;
            }
            self.node(index).value = value;
        },
        /**
         * ����query����
         * @returns {Number}
         */
        size: function(){
            return this.query.length || this.length;
        }
    });
    return LinkedList;
});
/**
 * @Description:    ��������
 * @Author:         dafeng.xdf[at]taobao.com
 * @Date:           2013.3.5
 * @Todo:           gridSort
 */
KISSY.add('gallery/autoResponsive/1.2/gridsort',function (S, AutoAnim, LinkedList) {
    'use strict';
    var D = S.DOM, EMPTY = '';

    /**
     * @name GridSort
     * @class դ�񲼾��㷨
     */
    function GridSort() {
    }

    GridSort.prototype = {
        init: function (cfg, owner) {
            this.cfg = cfg;
            cfg.owner = owner;

            var items = S.query(cfg.selector, cfg.container);
            switch (cfg.sortBy) {
                case EMPTY:
                case 'grid':
                default:
                    this._gridSort(items);
                    break;
                case 'cell':
                    this._cellSort(items);
                    break;
            }
        },

        _gridSort: function (items) {
            var cfg = this.cfg,
                curQuery = this._getCols();
            // ���ùؼ�֡
            this._setFrame();

            if (cfg.random) {
                items = items.shuffle();
            }

            // ����֮ǰ����beforeLocate
            cfg.owner.fire('beforeLocate', {
                autoResponsive: { // TODO �Ż��㣺��Ȼ�Ǹ��Զ����¼����Σ�û��Ҫ�ٶ��һ�� 'autoResponsive' key
                    elms: items
                }
            });

            var actions = []; // ע������Ĺ���˳��
            if (cfg.filter !== EMPTY) {
                actions.push('_filter');
            }

            if (cfg.priority !== EMPTY) {
                actions.push('_priority');
            }

            var l = actions.length, m = items.length, s = cfg.cache ? cfg.owner._lastPos : 0;

            if (l == 0) { // û�й���˵��ȫ��Ⱦ���Ǿ�ֱ����Ⱦ
                for (var i = s; i < m; i++) {
                    this._render(curQuery, items[i]);
                }
            } else { // �й�����renderQueue
                var renderQueue = []; // ��¼��ֻ�����

                actions.push('_tail');

                for (var j = s; j < m; j++) {

                    for (var t = 0, r; t < l + 1; t++) {
                        r = this[actions[t]](renderQueue, j, items[j]);

                        // ˵���õ���ȷ�Ĳ���λ�ã������벢ֹͣ�����actionsִ��
                        if (typeof r === 'number') {
                            renderQueue.splice(r, 0, j);
                            break;
                        }
                        // û�õ���ȷ����λ�ã����ξͲ�����
                        // rΪfalse��ʾ�������ִ�к����actions
                        // rΪtrue��ʾֹͣ�����actionsִ��
                        else if (typeof r === 'boolean' && r) {
                            break;
                        }
                    }
                }

                for (var k = 0, n = renderQueue.length; k < n; k++) {
                    this._render(curQuery, items[renderQueue[k]]);
                }
            }

            // ��¼һ�������Ⱦ������λ��(����һ����Ⱦ��ʼ��λ��)
            cfg.owner._lastPos = m;

            var curMinMaxColHeight = this._getMinMaxColHeight();

            // ����֮�󴥷�
            cfg.owner.fire('afterLocate', {
                autoResponsive: {
                    elms: items,
                    curMinMaxColHeight: curMinMaxColHeight,
                    frame: cfg.owner.frame
                }
            });

            // ���������߶�
            this.setHeight(curMinMaxColHeight.max);
        },
        _getCols: function () {
            var cfg = this.cfg;
            this.containerWH = cfg.landscapeOrientation ? D.outerHeight(cfg.container) :D.outerWidth(cfg.container);
            if (cfg.owner.curQuery && cfg.cache) {
                return cfg.owner.curQuery;
            } else {
                var curQuery = new LinkedList({});
                for (var i = 0, span = Math.ceil(this.containerWH / cfg.gridWidth); i < span; i++) {
                    curQuery.add(0);
                }
                return cfg.owner.curQuery = curQuery;
            }
        },
        _setFrame: function () {
            this.cfg.owner.frame++;
        },
        _filter: function (queue, idx, elm) {
            var cfg = this.cfg;
            D.show(elm);
            if (D.hasClass(elm, cfg.filter)) {
                D.hide(elm);
                return true; // ֹͣ�����actionsִ�У����Ҳ�����
            }
            return false; // ����ִ�к����actions����������ɺ����actions����
        },
        _priority: function (queue, idx, elm) {
            if (queue._priorityInsertPos == undefined) {
                queue._priorityInsertPos = 0;
            }
            var cfg = this.cfg;
            if (D.hasClass(elm, cfg.priority)) {
                return queue._priorityInsertPos++; // �ҵ��˶��еĲ���λ��
            }
            return Infinity; // �ҵ��˶��еĲ���λ�ã������е�ĩβ
        },
        /**
         * β��action��ֻ����ѵ�ǰ��idxѹջ�����ⶪʧ
         * @param queue
         * @param idx
         * @param elm
         * @private
         */
        _tail: function (queue, idx, elm) {
            return Infinity; // �ҵ��˶��еĲ���λ�ã������е�ĩβ
        },
        _render: function (curQuery, item) {
            var self = this,
                cfg = self.cfg;

            // ��������Ԫ��֮ǰ����
            cfg.owner.fire('beforeUnitArrange', {
                autoResponsive: {
                    elm: item,
                    frame: cfg.owner.frame
                }
            });

            var coordinate = self.coordinate(curQuery, item);
            // ����֮�󴥷�
            cfg.owner.fire('afterUnitArrange', {
                autoResponsive: {
                    elm: item,
                    frame: cfg.owner.frame
                }
            });
            // ���ö���
            self.asyncize(function () {
                self.callAnim(item, coordinate);
            });
        },
        coordinate: function (curQuery, elm) {
            var cfg = this.cfg,
                isRecountUnitWH = cfg.isRecountUnitWH;

            if (isRecountUnitWH || !elm.__width) {
                elm.__width = D.outerWidth(elm);
                elm.__height = D.outerHeight(elm);
            }

            return this._autoFit(curQuery, elm.__width, elm.__height);
        },
        /**
         * ����x��y������
         */
        _autoFit: function (curQuery, cW, cH) {
            var cfg = this.cfg,_position,
                num = Math.ceil((( cfg.landscapeOrientation ? cH : cW ) + cfg.unitMargin.x) / cfg.gridWidth),
                cur = this._getCur(num, curQuery);
            for (var i = cur[0], len = num + cur[0], newH = cur[1] + (cfg.landscapeOrientation ? cW : cH) + cfg.unitMargin.y; i < len; i++) {
                curQuery.update(i, newH);
            }
            _position = [cur[0] * cfg.gridWidth + cfg.unitMargin.x, cur[1] + cfg.unitMargin.y];
            return cfg.landscapeOrientation ? _position.reverse() : _position;
        },
        /**
         * ��ȡ��ǰָ��
         */
        _getCur: function (num, curQuery) {
            return this._skipALG(num, curQuery);
        },
        /**
         * ����ʽ�㷨�����汣�صģ�
         * @param num ����
         * @param curQuery
         * @returns {Array}
         * @private
         */
        _stepALG: function (num, curQuery) {
            var cur = [null, Infinity];

            for (var i = 0, len = curQuery.size(); i < len - num + 1; i++) {
                var max = 0;

                for (var j = i; j < i + num; j++) {
                    if (curQuery.get(j) > max) {
                        max = curQuery.get(j);
                    }
                }
                if (cur[1] > max) {
                    cur = [i, max];
                }
            }
            return cur;
        },
        /**
         * ��Ծʽ�㷨��������Խ�ģ�
         * @param num ����
         * @param curQuery
         * @returns {Array}
         * @private
         */
        _skipALG: function (num, curQuery) {
            var min = Infinity,
                i = 0, idx = 0;

            for (var len = curQuery.size(); i < len - num + 1; i++) {
                var max = -Infinity, curValue;

                for (var j = 0; j < num; j++) {
                    curValue = curQuery.get(i + j);
                    if (curValue >= min) {
                        i += j + 1; // �����Ծ
                        if (i > len - num) {// ������
                            max = min; // ��Ҫ���ƹ�min > max���������������Ⱦmin
                            break;
                        }

                        j = -1; // reset
                        max = -Infinity; // reset
                        continue;
                    }

                    if (curValue > max) {
                        max = curValue;
                    }
                }
                if (min > max) {
                    min = max;
                    idx = i; // ��¼λ��
                }
            }
            return [idx, min];
        },
        asyncize: function (handle) {
            var self = this,
                cfg = self.cfg;
            if (cfg.owner.get('suspend')) {
                setTimeout(function () {
                    handle.call(self);
                }, 0);
            } else {
                handle.call(self);
            }
        },
        callAnim: function (elm, coordinate) {
            var cfg = this.cfg;
            new AutoAnim({
                elm: elm,
                x: coordinate[0],
                y: coordinate[1],
                closeAnim: cfg.closeAnim,
                duration: cfg.duration,
                easing: cfg.easing,
                direction: cfg.direction,
                frame: cfg.owner.frame,
                owner: cfg.owner
            });
        },
        _getMinMaxColHeight: function () {
            var cfg = this.cfg,
                min = Infinity,
                doneQuery = cfg.owner.curQuery.query, // TODO ���ʹ�õ�����������
                max = Math.max.apply(Math, doneQuery);

            if (max == 0) { // ˵���ǿ�����
                min = 0;
            } else {
                for (var i = 0, len = doneQuery.length; i < len; i++) {
                    if (doneQuery[i] != 0 && doneQuery[i] < min) {
                        min = doneQuery[i];
                    }
                }
            }

            return {
                min: min,
                max: max
            };
        },
        /**
         * ���������߶�
         * @param height
         */
        setHeight: function (height) {
            var cfg = this.cfg;
            if (!cfg.autoHeight) {
                return;
            }
            cfg.landscapeOrientation ? D.width(cfg.container, height + cfg.unitMargin.x) :D.height(cfg.container, height + cfg.unitMargin.y);
        },
        /**
         * @deprecated �ù�����ʱδ����
         *
         * @param items
         * @private
         */
        _cellSort: function (items) {
            var self = this,
                _maxHeight = 0,
                _row = 0,
                curQuery = [];
            S.each(items, function (i, key) {
                S.log('star from here!');
                curQuery.push(self._getCells());
                //self.callAnim(i,coordinate);
            });
        },
        _getCells: function () {
            return this._getCols();
        }
    };
    return GridSort;
}, {requires: ['./anim', './linkedlist', 'dom']});
/**
 * @Description:    ��ҳ����Ӧ����Base 1.2
 * @Author:         dafeng.xdf[at]taobao.com
 * @Date:           2013.3.5
 */
KISSY.add('gallery/autoResponsive/1.2/base',function (S, Config, GridSort, Base) {
    'use strict';
    var D = S.DOM, E = S.Event, win = window;

    /**
     * @name AutoResponsive
     * @class ��ҳ����Ӧ����
     * @constructor
     * @extends Base
     */
    function AutoResponsive() {
        AutoResponsive.superclass.constructor.apply(this, arguments);

        if (!S.get(this.get('container'))) {
            S.log('can not init, lack of container!');
            return;
        }

        this.fire('beforeInit', {
            autoResponsive: this
        });

        if (this.get('autoInit')) {
            this.init();
        }

        this.fire('afterInit', {
            autoResponsive: this
        });
    }

    S.extend(AutoResponsive, Base, {
        /**
         * ��ʼ�����
         * @return  ����ʵ��
         */
        init: function () {
            this._bindEvent();
            this.initPlugins();
            this.render();
            S.log('AutoResponsive init!');
        },
        /**
         * ��ʼ���
         */
        initPlugins: function () {
            this.api = {};
            for (var i = 0, a = this.get('plugins'), len = a.length, v; i < len; i++) {
                v = a[i];
                v.init(this);
                S.mix(this.api, v.api);
            }
        },
        /**
         * ��Ⱦ������
         */
        render: function () {
            var userCfg = this.getAttrVals(),
                whensRecountUnitWH = this.get('whensRecountUnitWH');
            userCfg.isRecountUnitWH = !!whensRecountUnitWH.length;
            this.frame = this.frame || 0;
            arguments[0] && S.each(arguments[0], function (i, _key) {
                userCfg[_key] = i;
            });

            // Ӧ�ò������
            S.mix(userCfg, this.api);
            this.gridSort = this.gridSort || new GridSort();
            this.gridSort.init(userCfg, this);
        },
        /**
         * �������resize�¼�
         */
        _bind: function (handle) {
            var self = this,
                whensRecountUnitWH = self.get('whensRecountUnitWH');
            if (self.get('closeResize')) {
                return;
            }
            E.on(win, 'resize', function () {
                handle.call(self, {isRecountUnitWH: S.inArray('resize', whensRecountUnitWH)});
            });
        },
        /**
         * ����¼�������
         */
        _bindEvent: function () {
            var self = this;
            self._bind(S.buffer(function () {   // ʹ��buffer����Ҫʹ��throttle
                var delayOnResize = self.get('delayOnResize');
                self.fire('beforeResize');
                if(delayOnResize !== -1){
                    setTimeout(function(){
                        self.render(arguments);
                    },delayOnResize);
                }else{
                    self.render(arguments);
                }
                self.fire('resize'); // ������ı䴥��resize�¼�
            }, self.get('resizeFrequency'), self));
        },
        /**
         * ���²��ֵ���
         */
        adjust: function (isRecountUnitWH) {
            var whensRecountUnitWH = this.get('whensRecountUnitWH');
            this.__isAdjusting = 1;
            this.render({
                isRecountUnitWH: isRecountUnitWH || S.inArray('adjust', whensRecountUnitWH)
            });
            this.__isAdjusting = 0;
            S.log('adjust success');
        },
        isAdjusting: function () {
            return this.__isAdjusting || 0;
        },
        /**
         * �������򷽷�
         * @param {String} ѡ����
         */
        priority: function (selector) {
            this.render({
                priority: selector
            });
        },
        /**
         * ���˷���
         * @param {String} ѡ����
         */
        filter: function (selector) {
            this.render({
                filter: selector
            });
        },
        /**
         * �����߾�
         * @param {Object} �߾�
         */
        margin: function (margin) {
            this.render({
                unitMargin: margin
            });
        },
        /**
         * ��������
         * @param {String} ����
         */
        direction: function (direction) {
            this.render({
                direction: direction
            });
        },
        /**
         * �������
         */
        random: function () {
            this.render({
                random: true
            });
        },
        /**
         * �ı��������
         * @param {Object} ���ö���
         */
        changeCfg: function (cfg) {
            var self = this;
            S.each(cfg,function(i,key){
                self.set(key,i);
            });
        },
        /**
         * append ����,���ø�������Ż�����
         * @param {Object} �ڵ���󣨿���Ϊ����Ԫ�ء����Ԫ�����顢fragments���Լ�������飩
         */
        append: function (nodes) {
            D.append(nodes, this.get('container'));
            this.render({
                cache: true
            });
        },
        /**
         * dom prepend ����,�ķ�����
         * @param {Object} �ڵ���󣨿���Ϊ����Ԫ�ء����Ԫ�����顢fragments���Լ�������飩
         */
        prepend: function (nodes) {
            D.prepend(nodes, this.get('container'));
            this.render();
        }
    }, { ATTRS: new Config()});

    return AutoResponsive;

}, {requires: ['./config', './gridsort', 'base', 'dom', 'event']});
/**
 * @Description:    hash���ݡ�����·��
 * @Author:         dafeng.xdf[at]taobao.com
 * @Date:           2013.3.5
 */
KISSY.add('gallery/autoResponsive/1.2/plugin/hash',function (S) {
    'use strict';
    var AND = '&',
        EQUAL = '=';

    /**
     * @name hash
     * @class ����Ӧ����
     * @constructor
     */
    function Hash(cfg) {
        var self = this;
        self.prefix = cfg.prefix || 'ks-';
        self.api = {};
    }

    /**
     * ���ò���㿪ʼ����
     */
    S.augment(Hash, {
        init: function (owner) {
            var self = this;
            S.log('hash init!');
            if (!self.hasHash()) {
                return;
            }
            self.parse();
        },
        hasHash: function () {
            return location.hash ? true : false;
        },
        parse: function () {
            var self = this;
            self.getParam();
        },
        /**
         * ����hash
         * priority,filter
         */
        getParam: function () {
            var self = this;
            self.hash = location.hash.split(AND);
            S.each(self.hash, function (param) {
                self.getPriority(param);
                self.getFilter(param);
            });
        },
        getPriority: function (str) {
            var self = this,
                _priority = self.prefix + 'priority';
            if (str.indexOf(_priority) != -1) {
                S.mix(self.api, {
                    priority: str.split(EQUAL)[1]
                });
            }
        },
        getFilter: function (str) {
            var self = this,
                _filter = self.prefix + 'filter';
            if (str.indexOf(_filter) != -1) {
                S.mix(self.api, {
                    filter: str.split(EQUAL)[1]
                });
            }
        }
    });
    return Hash;
}, {requires: ['event']});
/**
 * @Description:    ��ק����
 * @Author:         dafeng.xdf[at]taobao.com
 * @Date:           2013.3.5
 */
KISSY.add('gallery/autoResponsive/1.2/plugin/drag',function (S) {
    'use strict';
    var E = S.Event, DD = S.DD,
        DraggableDelegate = DD.DraggableDelegate,
        Droppable = DD.Droppable;

    /**
     * @name Drag
     * @class ��ק����
     * @constructor
     */
    function Drag(cfg) {
    }

    /**
     *
     */
    S.augment(Drag, {
        init: function () {
            var self = this;
            S.log('drag init!');
        },
        _bindDrop: function (elm) {
            var self = this;
            if (self.drag != 'on') {
                return;
            }
            new Droppable({
                node: elm
            }).on("dropenter", function (ev) {
                    D.insertAfter(ev.drag.get("node"), ev.drop.get("node"));
                    self.owner.render();
                });
        },
        _bindBrag: function () {
            var self = this;
            if (self.drag != 'on') {
                return;
            }
            new DraggableDelegate({
                container: self.container,
                selector: self.selector,
                move: true
            }).on('dragstart',function (ev) {
                    var _target = ev.drag.get("node")[0];
                    this.p = {
                        left: _target.offsetLeft,
                        top: _target.offsetTop
                    };
                }).on('drag',function () {
                }).on('dragend', function (ev) {
                    D.css(ev.drag.get("node"), this.p);
                });
        }
    });
    return Drag;
}, {requires: ['event', 'dd']});
/**
 * @Description:    Loader
 * @Author:         dafeng.xdf[at]taobao.com zhuofeng.ls[at]taobao.com
 * @Date:           2013.03.05
 *
 * @Log:
 *    - 2013.07.03 zhuofeng.ls
 *      1.[!] fill loader detail functions.
 *
 *    - 2013.03.05 dafeng.xdf
 *      1.[+] build this file.
 */
KISSY.add('gallery/autoResponsive/1.2/plugin/loader',function (S) {
    'use strict';
    var D = S.DOM, E = S.Event, win = window,

        SCROLL_TIMER = 50;

    /**
     * @name Loader
     * @class ������
     * @constructor
     */
    function Loader(cfg) {
        if (!(this instanceof Loader)) {
            return new Loader(cfg);
        }

        this._makeCfg(cfg);
    }

    /**
     * ���ò���㿪ʼ����
     */
    S.augment(Loader, S.EventTarget, {
        /**
         * loader�����ʼ��
         * @public �����������ڲ����ʼ��ʱ����
         * @param owner Base���󣨼������������
         */
        init: function (owner) {

            this.owner = owner;

            this.__bindMethods();

            this._reset();

        },
        /**
         * ״̬��������
         * @private
         */
        _reset: function(){
            var self = this,
                userCfg = self.config,
                mod = userCfg.mod;

            self.__started = self.__destroyed = self.__stopped = 0;

            if (mod === 'manual') { // �ֶ�����ģʽ | ������������û��Զ���load�����������������ఴťʱ����
                // nothing to do

            } else { // �Զ�����ģʽ

                self.__onScroll(); // ��ʼ��ʱ�������һ�Σ�����Ҫ�ȳ�ʼ�� adjust ��ɺ�.

                self.start();
            }
        },
        /**
         * �û���������
         * @param cfg
         * @private
         */
        _makeCfg: function(cfg){
            cfg = {
                load: typeof cfg.load == 'function' ? cfg.load : function (success, end) {
                    S.log('AutoResponsive.Loader::_makeCfg: the load function in user\'s config is undefined!', 'warn');
                },
                diff: cfg.diff || 0,  // ����ש��Ԥ�ظ߶�
                mod: cfg.mod == 'manual' ? 'manual' : 'auto',  // load����ģʽ
                qpt: 15 // ÿ����Ⱦ��������Ԫ��������15��ʾÿ�������Ⱦ15������ש�飬������Ĳ����¸�ʱ��Ƭ�ٴ���
            };

            this.config = cfg;
        },
        /**
         * ��¶���ⲿ�ӿڣ���ҪĿ������ʹ���߿��Զ�̬�ı�loaderĳЩ���ã���mod����������Ҫ����ʵ����
         * �޸ĵ����û�������Ч
         * @param cfg
         */
        changeCfg: function(cfg){
            this.stop(); // ��ֹԭ����loader
            this._makeCfg(S.merge(this.config, cfg)); // ��������
            this._reset(); // ״̬���¼�����
        },
        /**
         * ���Զ�����ģʽ�£������Ļ����λ���Ƿ����㴥��load���ݵ�����
         * @private
         */
        __doScroll: function (e) {
            var self = this,
                owner = self.owner,
                userCfg = self.config;

            if(self.__scrollDirection === 'up')
                return;

            S.log('AutoResponsive.Loader::__doScroll...');

            if (self.__loading) {
                return;
            }
            // ������ڵ����У��Ȼ��ٿ���
            // �����еĸ߶Ȳ�ȷ�������ڲ��ʺ��ж��Ƿ��˼��������ݵ�����
            if (owner.isAdjusting()) {
                // ǡ�� __onScroll �� buffered
                self.__onScroll();
                return;
            }

            var container = S.get(owner.get('container'));
            // in case that the container's current style is 'display: none'
            if (!container.offsetWidth) {
                return;
            }

            var offsetTop = D.offset(container).top,
                diff = userCfg.diff,
                minColHeight = owner.getMinColHeight(),
                scrollTop = D.scrollTop(win),
                height = D.height(win);

            // ��̬���� | ����Ԥ������(���û�������)ʱ��������
            if (diff + scrollTop + height >= offsetTop + minColHeight) {
                self.load();
            }
        },
        /**
         * ʹ���û��Զ���load���������ݽ���loading
         * @public ���ֶ�ģʽʱ���Թ��ⲿ����
         */
        load: function () {
            var self = this,
                userCfg = self.config,
                load = userCfg.load;

            if (self.__stopped) {
                S.log('AutoResponsive.Loader::load: this loader has stopped, please to resume!', 'warn');
                return;
            }

            S.log('AutoResponsive.Loader::loading...');

            self.__loading = 1;

            load && load(success, end);

            function success(items, callback) {
                self.__addItems(items, function () {

                    callback && callback.call(self);

                    self.__doScroll(); // �����겻��һ���ٴμ��
                });

                self.__loading = 0;
            }

            function end() {
                self.stop();
            }
        },
        isLoading: function () {
            return this.__loading;
        },
        isStarted: function () {
            return this.__started;
        },
        isStopped: function () {
            return this.__stopped;
        },
        isDestroyed: function () {
            return this.__destroyed;
        },
        /**
         * ��ָ��������__appendItems����װ��ʱ��Ƭ������
         * @private
         * @param items
         * @param callback
         * @returns {*}
         */
        __addItems: function (items, callback) {
            var self = this;

            // ����һ���µ�ʱ��Ƭ���������ɵ��������û�����껹���������ֱ����������Զ����٣�
            timedChunk(items, self.__appendItems, self,function () {

                callback && callback.call(self);

                // TODO revise...
                self.fire('autoresponsive.loader.complete', {
                    items: items
                });
            }).start();

        },
        /**
         * �������в����½ڵ�
         * @private
         * @param items
         */
        __appendItems: function (items) {
            var self = this,
                owner = self.owner;

            items = S.makeArray(items);
            owner.append(items);
        },
        /**
         * ����һ�Σ��������ã�
         * 1.ΪBase�������getMaxColHeight��getMinColHeight����;
         * 2.ΪLoader�������__onScroll��__onMouseWheel˽�з���
         * @private
         */
        __bindMethods: function () {
            var self = this,
                owner = self.owner,
                curMinMaxColHeight = {min: 0, max: 0};
            owner.on('afterLocate', function (e) {
                curMinMaxColHeight = e.autoResponsive.curMinMaxColHeight;
            });
            owner.getMaxColHeight = function () {
                return curMinMaxColHeight.max;
            };
            owner.getMinColHeight = function () {
                return curMinMaxColHeight.min;
            };

            self.__onScroll = debounce(self.__doScroll, SCROLL_TIMER, self, true); // ���鲻Ҫʹ��Kissy.buffer������о�loader̫��������
            self.__onMouseWheel = function (e) {
                self.__scrollDirection = e.deltaY > 0 ? 'up' : 'down';
            };
        },
        /**
         * ����loader����load����
         * @public
         */
        start: function () {
            E.on(win, 'mousewheel', this.__onMouseWheel);
            this.resume();
        },
        /**
         * ֹͣloader����load����
         * @public
         */
        stop: function () {
            this.pause();
            E.detach(win, 'scroll', this.__onMouseWheel);
            this.__stopped = 1;
        },
        /**
         * ��ͣloader����load����
         * @public
         */
        pause: function () {
            if (this.__destroyed)
                return;

            E.detach(win, 'scroll', this.__onScroll);
        },
        /**
         * �ָ������»��ѣ�loader����load����
         * @public
         */
        resume: function () {
            var self = this;
            if (self.__destroyed) {
                return;
            }
            E.on(win, 'scroll', self.__onScroll);
            self.__started = 1;
            self.__stopped = 0;
        },
        /**
         * ֹͣloader���й���������loader����
         * @deprecated �ù�����ʱδ����
         * @public
         */
        destroy: function () {
            // TODO ...
            this.__destroyed = 1;
        }
//        Status: {INIT: 0, LOADING: 1, LOADED: 2, ERROR: 3, ATTACHED: 4}
    });

    /**
     * ʱ��Ƭ��ѯ����
     * @param items
     * @param process
     * @param context
     * @param callback
     * @returns {{}}
     */
    function timedChunk(items, process, context, callback) {

        var monitor = {}, timer, todo = []; // ������� | ÿһ��ʱ��Ƭ��������timedChunk����ά���Լ���һ���������

        var userCfg = context.config,
            qpt = userCfg.qpt || 15;

        monitor.start = function () {

            todo = todo.concat(S.makeArray(items)); // ѹ���������

            // ��ѯ����
            var polling = function () {
                var start = +new Date;
                while (todo.length > 0 && (new Date - start < 50)) {
                    var task = todo.splice(0, qpt);
                    process.call(context, task);
                }

                if (todo.length > 0) { // ������л������񣬷ŵ���һ��ʱ��Ƭ���д���
                    timer = setTimeout(polling, 25);
                    return;
                }

                callback && callback.call(context, items);

                // ���ٸù�����
                monitor.stop();
                monitor = null;
            };

            polling();
        };

        monitor.stop = function () {
            if (timer) {
                clearTimeout(timer);
                todo = [];
            }
        };

        return monitor;
    }

    /**
     * ��ͬ��kissy��buffer������β֡�������ӳ�ָ��ʱ��threshold����ִ�У�
     * ��kissy��buffer��Խ��һ���ǿ������ñ�����֡����β֡����execAsap=true��ʾ������֡��
     *
     * @param fn reference to original function
     * @param threshold
     * @param context the context of the original function
     * @param execAsap execute at start of the detection period
     * @returns {Function}
     * @private
     */
    function debounce (fn, threshold, context, execAsap) {
        var timeout; // handle to setTimeout async task (detection period)
        // return the new debounced function which executes the original function only once
        // until the detection period expires
        return function debounced() {
            var obj = context || this, // reference to original context object
                args = arguments; // arguments at execution time
            // this is the detection function. it will be executed if/when the threshold expires
            function delayed() {
                // if we're executing at the end of the detection period
                if (!execAsap)
                    fn.apply(obj, args); // execute now
                // clear timeout handle
                timeout = null;
            }

            // stop any current detection period
            if (timeout)
                clearTimeout(timeout);
            // otherwise, if we're not already waiting and we're executing at the beginning of the detection period
            else if (execAsap)
                fn.apply(obj, args); // execute now
            // reset the detection period
            timeout = setTimeout(delayed, threshold || 100);
        };
    }

    return Loader;

}, {requires: ['dom', 'event']});
/**
 * @Description: Ŀǰ�ȹ���base��effectЧ�������hash���
 * @Author:      dafeng.xdf[at]taobao.com
 * @Date:        2013.3.5
 */
KISSY.add('gallery/autoResponsive/1.2/index',function (S, AutoResponsive, Hash, Drag, Loader) {
    AutoResponsive.Hash = Hash;
    AutoResponsive.Drag = Drag;
    AutoResponsive.Loader = Loader;
    return AutoResponsive;
}, {requires: ['./base', './plugin/hash', './plugin/drag', './plugin/loader']});
