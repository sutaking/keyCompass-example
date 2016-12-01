'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
//import EventEmitterMixin from '../../node_modules/react-event-emitter-mixin/EventEmitterMixin';
import EventEmitterMixin from 'react-event-emitter-mixin'

var Constant = {
    DIRECTION: {
        LEFT: 'left',
        RIGHT: 'right',
        UP: 'up',
        DOWN: 'down'
    },
    DEFAULT: {
        DEPTH: 0,
        GROUP: 'default',
        KEY_MAP: {
            LEFT: 37,
            RIGHT: 39,
            UP: 38,
            DOWN: 40,
            ENTER: 13
        },
        DISTANCE_CALCULATION_STRATEGY: 'default'
    }
};

var sequence = 0;

var NameGenerator = {
    get: function() {
        return 'focusable-' + sequence++;
    }
};

var NAMESPACE = '.focusable';

var MOUSE_EVENTS = {
    mouseenter: 'focus',
    mouseleave: 'blur',
    click: 'select'
};

var FOCUSABLE_EVENTS = ['focused', 'blurred', 'selected'];

var Util = {
    NameGenerator: NameGenerator,

    isFocusable: function(item) {
        return item ? item.props.focusable !== undefined : false;
    },

    isElement: function(item) {
        return isElementNode(getElementNode(item));
    },

    isVisible: function(item) {
        // TODO isVisible implement
        return true;
    },

    getData: function(item) {
        if (!Util.isFocusable(item)) {
            return null;
        }
        return getFocusableData(item);
    },

    setData: function(item, option) {
        if (!Util.isFocusable(item)) {
            return null;
        }
        var data = {};
        Object.assign(data, getFocusableData(item), option);
        return setFocusableData(item, data);
    },

    bindMouseEvent: function(componment, callback) {
        componment.setState({ handleMouseEvent: callback });
        return this;
    },

    bindFocusableEvent: function(componment, callback) {
        FOCUSABLE_EVENTS.forEach(function(focusableEvent) {
            componment.eventEmitter('on', focusableEvent, callback); //TODO +NAMESPACE
        });
        return this;
    },

    unbindEvent: function(componment) {
        /*if (Util.isElement(element)) {
            $(element).off(NAMESPACE);
        }
        componment && componment.eventEmitter('off', NAMESPACE); //TODO NAMESPACE
        */
        return this;
    }
};

function isFunction(fn) {
    return fn instanceof Function;
}

function toString(data) {
    return data && data + '';
}

function getFocusableData(item) {

    var data = item.focusableData || {};
    var nextFocus = {};

    Object.keys(Constant.DIRECTION).forEach(function(key) {
        var direction = Constant.DIRECTION[key];
        var property = 'focusableNextFocus' + capitalize(direction);
        var value = data[property];

        if (value || value === null) {
            nextFocus[direction] = toString(value);
        }
    });
    return {
        depth: data.focusableDepth,
        group: toString(data.focusableGroup),
        name: toString(data.focusableName),
        initialFocus: data.focusableInitialFocus,
        disabled: data.focusableDisabled,
        nextFocus: nextFocus
    };
}

function setFocusableData(item, option) {
    item.focusableData = {
        focusableDepth: Number.isFinite(option.depth) ? option.depth : Constant.DEFAULT.DEPTH,
        focusableGroup: option.group || Constant.DEFAULT.GROUP,
        focusableName: option.name || NameGenerator.get(),
        focusableInitialFocus: option.initialFocus === true,
        focusableDisabled: option.disabled === true
    };

    option.nextFocus && Object.keys(option.nextFocus).forEach(function(direction) {
        var property = 'focusableNextFocus' + capitalize(direction);
        var value = option.nextFocus[direction];

        if (value || value === null) {
            item.focusableData[property] = value;
        }
    });

    return item.focusableData.focusableName;
}

function getElementNode(target) {
    return target; //target && (target instanceof $) ? target[0] : target;
}

function isElementNode(target) {
    return target && target.nodeType === Node.ELEMENT_NODE ? true : false;
}

function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.substr(1) : str;
}

function NearestFocusableFinderProvider() {
    var instance = null;

    var strategies = {};
    var beforeDistanceCalculationHandlers = [];
    var currentDistanceCalculationStrategy = Constant.DEFAULT.DISTANCE_CALCULATION_STRATEGY;

    function getWindow(elem) {
        return (elem != null && elem === elem.window) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offsetPosition(elem) {
        var docElem, win, box = { top: 0, left: 0 },
            doc = elem && elem.ownerDocument;
        if (!doc) {
            return;
        }
        docElem = doc.documentElement;
        box = elem.getBoundingClientRect();
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function getPosition(target) {
        var element = ReactDOM.findDOMNode(target);
        var offset = offsetPosition(element);
        return {
            left: offset.left,
            top: offset.top,
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    }

    strategies[Constant.DEFAULT.DISTANCE_CALCULATION_STRATEGY] = (function() {
        var OPPOSITE_DIRECTION = {
            left: 'right',
            right: 'left',
            up: 'down',
            down: 'up'
        };

        function getMiddlePointOnTheEdge(position, direction) {
            var point = {
                x: position.left,
                y: position.top
            };

            switch (direction) {
                case Constant.DIRECTION.RIGHT: // when direction is right or left 
                    point.x += position.width;
                case Constant.DIRECTION.LEFT:
                    point.y += position.height / 2;
                    break;
                case Constant.DIRECTION.DOWN: // when direction is down or up 
                    point.y += position.height;
                case Constant.DIRECTION.UP:
                    point.x += position.width / 2;
                    break;
            }

            return point;
        }

        function isCorrespondingDirection(fromPoint, toPoint, direction) {
            switch (direction) {
                case Constant.DIRECTION.LEFT:
                    return fromPoint.x >= toPoint.x;
                case Constant.DIRECTION.RIGHT:
                    return fromPoint.x <= toPoint.x;
                case Constant.DIRECTION.UP:
                    return fromPoint.y >= toPoint.y;
                case Constant.DIRECTION.DOWN:
                    return fromPoint.y <= toPoint.y;
            }

            return false;
        }

        return function(from, to, direction) {
            var fromPoint = getMiddlePointOnTheEdge(from, direction);
            var toPoint = getMiddlePointOnTheEdge(to, OPPOSITE_DIRECTION[direction]);

            if (isCorrespondingDirection(fromPoint, toPoint, direction)) {
                return Math.sqrt(Math.pow(fromPoint.x - toPoint.x, 2) + Math.pow(fromPoint.y - toPoint.y, 2));
            }

            return Infinity;
        };
    })();

    this.registerDistanceCalculationStrategy = function(name, strategy, override) {
        if (override === false && isFunction(strategies[name])) {
            throw new Error('The given name "' + name + '" is already registered. If you want to override it, please do not pass the third parameter.');
        }

        strategies[name] = strategy;
        return this;
    };

    this.useDistanceCalculationStrategy = function(name) {
        if (!name) {
            currentDistanceCalculationStrategy = Constant.DEFAULT.DISTANCE_CALCULATION_STRATEGY;
        } else if (isFunction(strategies[name])) {
            currentDistanceCalculationStrategy = name;
        } else {
            console.warn('The given name "' + name + '" is not registered yet. Using "' + currentDistanceCalculationStrategy + '" instead.');
        }
        return this;
    };

    this.getRegisteredDistanceCalculationStrategies = function() {
        return Object.keys(strategies);
    };

    this.getCurrentDistanceCalculationStrategy = function() {
        return currentDistanceCalculationStrategy;
    };

    this.addBeforeDistanceCalculationHandler = function(handler) {
        if (isFunction(handler)) {
            beforeDistanceCalculationHandlers.push(handler);
            return true;
        }

        return false;
    };

    this.removeBeforeDistanceCalculationHandler = function(handler) {
        var index = beforeDistanceCalculationHandlers.indexOf(handler);

        if (index > -1) {
            beforeDistanceCalculationHandlers.splice(index, 1);
            return true;
        }

        return false;
    };

    this.getInstance = function() {
        if (instance === null) {
            instance = createNearestFocusableFinder();
            return instance;
        }

        return instance;
    };

    function createNearestFocusableFinder() {
        var slice = Array.prototype.slice;
        var focusableComponents = {};
        var observer;

        var nearestFocusableFinder = {
            getInitial: function(depth, group) {
                var initial;

                depth = depth || Constant.DEFAULT.DEPTH;
                group = group || Constant.DEFAULT.GROUP;

                Object.keys(focusableComponents).some(function(name) {
                    var focusable = focusableComponents[name];
                    var data = Util.getData(focusable);

                    if (Util.isVisible(focusable) && (!data.disabled || focusable.controllerProvider.isFocusWhenDisabled()) && data.depth === depth && data.group === group) {
                        initial = focusable;
                        return true;
                    }
                });

                return initial;
            },

            getNearest: function(target, direction) {
                var distance, bestMatch, bestDistance = Infinity;
                var targetPosition, neighborPosition;
                var targetFocusableData;

                if (Util.isFocusable(target) && (targetFocusableData = Util.getData(target))) {

                    targetPosition = getPosition(target);

                    Object.keys(focusableComponents).forEach(function(name) {
                        var focusable = focusableComponents[name];
                        var neighborFocusableData = Util.getData(focusable);

                        if (focusable !== target && Util.isVisible(focusable) && (!neighborFocusableData.disabled) && targetFocusableData.depth === Util.getData(focusable).depth) {
                            if (beforeDistanceCalculationHandlers.some(function(handler) {
                                    return handler(focusable) === false;
                                })) {
                                return;
                            }

                            neighborPosition = getPosition(focusable);
                            distance = strategies[currentDistanceCalculationStrategy](targetPosition, neighborPosition, direction);

                            if (distance < bestDistance) {
                                bestMatch = focusable;
                                bestDistance = distance;
                            }
                        }
                    });
                }
                return bestMatch;
            },
            $$put: function(focusable, option) {
                var name;

                if (Util.isFocusable(focusable) && (name = Util.setData(focusable, option))) {
                    focusableComponents[name] = focusable;
                }

                return this;
            },
            $$get: function(name) {
                return focusableComponents[name];
            }
            //,
            //$$remove: function(target) {
            //}
        };

        function iterate(nodeList, callback, useSetData) {
            slice.call(nodeList).forEach(function(node) {
                if (Util.isElement(node) && Util.isFocusable(node)) {
                    if (useSetData === true) {
                        callback(Util.setData(node), node);
                    } else {
                        callback(Util.getData(node).name, node);
                    }
                }
            });
        }

        /*if (window.MutationObserver) {
            observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        iterate(mutation.addedNodes, function(name, addedNode) {
                            $.caph.focus.$$toAvailable(addedNode);
                        }, true);

                        iterate(mutation.removedNodes, function(name, removedNode) {
                            Util.unbindEvent(nearestFocusableFinder.$$remove(removedNode));
                        });
                    }
                });
            });

            observer.observe(document, {
                childList: true,
                subtree: true
            });
        }*/

        return nearestFocusableFinder;
    }
}

function ControllerProvider() {
    var instance = null;

    var NAMESPACE = '.focus-controller';
    var GROUP_PREFIX = 'group:';

    var initialDepth = Constant.DEFAULT.DEPTH;
    var initialGroup = {};

    var currentKeyMap = Constant.DEFAULT.KEY_MAP;

    var beforeHandlers = [];
    var afterHandlers = [];

    var noop = function() {};

    var callbacks = {
        focused: noop,
        blurred: noop,
        selected: noop
    };

    var focusWhenDisabled = false;

    function addHandler(target, handler) {
        if (isFunction(handler)) {
            target.push(handler);
            return true;
        }

        return false;
    }

    function byOrder(a, b) {
        return a.order - b.order;
    }

    function removeHandler(target, handler) {
        var index = target.indexOf(handler);

        if (index > -1) {
            target.splice(index, 1);
            return true;
        }

        return false;
    }

    function setCallback(type, callback) {
        if (isFunction(callback)) {
            callbacks[type] = callback;
        }
    }

    initialGroup[Constant.DEFAULT.DEPTH] = Constant.DEFAULT.GROUP;

    this.setInitialDepth = function(depth) {
        initialDepth = depth;
        return this;
    };

    this.setInitialGroupOfDepth = function(depth, group) {
        var data = {};

        if (group === undefined) {
            group = depth;
            depth = Constant.DEFAULT.DEPTH;
        }
        //TODO
        /*if ($.isPlainObject(group)) {
            data = group;
        } else {*/
        data[depth] = group;
        //}
        Object.assign(initialGroup, data);
        return this;
    };

    this.setKeyMap = function(keyMap) {
        Object.assign(currentKeyMap, keyMap);
        return this;
    };

    this.getKeyMap = function() {
        return Object.assign({}, currentKeyMap);
    };

    this.addBeforeKeydownHandler = function(handler, order) {
        if (addHandler(beforeHandlers, handler)) {
            handler.order = order || 0;
            beforeHandlers.sort(byOrder);
            return true;
        }

        return false;
    };

    this.addAfterKeydownHandler = function(handler) {
        return addHandler(afterHandlers, handler);
    };

    this.removeBeforeKeydownHandler = function(handler) {
        return removeHandler(beforeHandlers, handler);
    };

    this.removeAfterKeydownHandler = function(handler) {
        return removeHandler(afterHandlers, handler);
    };

    this.setFocusWhenDisabled = function(bool) {
        focusWhenDisabled = bool;
        return this;
    };

    this.isFocusWhenDisabled = function() {
        return focusWhenDisabled;
    };

    this.getInstance = function() {
        if (instance === null) {
            instance = createController();
            return instance;
        }
        return instance;
    };

    this.onFocused = function(callback) {
        setCallback('focused', callback);
        return this;
    };

    this.onBlurred = function(callback) {
        setCallback('blurred', callback);
        return this;
    };

    this.onSelected = function(callback) {
        setCallback('selected', callback);
        return this;
    };

    function createController() {
        var nearestFocusableFinder = focusable.nearestFocusableFinderProvider.getInstance();

        var currentDepth = initialDepth;
        var currentGroup = initialGroup[initialDepth] || Constant.DEFAULT.GROUP;
        var currentFocusItem;

        var initialFocusItem = {},
            previousFocusedItem = {};

        function getNextFocusItem(direction) {
            var previousItem;
            var nextFocusItemName, nextFocusItem, nextFocusItemData;

            if (currentFocusItem) {
                nextFocusItemName = Util.getData(currentFocusItem).nextFocus[direction];
                if (nextFocusItemName === undefined) {
                    return nearestFocusableFinder.getNearest(currentFocusItem, direction);
                }
                if (nextFocusItemName) {
                    if (nextFocusItemName.indexOf(GROUP_PREFIX) === 0) {
                        return nextFocusItemName.replace(GROUP_PREFIX, '');
                    }

                    nextFocusItem = nearestFocusableFinder.$$get(nextFocusItemName);

                    if (Util.isVisible(nextFocusItem)) {
                        nextFocusItemData = Util.getData(nextFocusItem);

                        if ((!nextFocusItemData.disabled || focusWhenDisabled) && Util.getData(currentFocusItem).depth === nextFocusItemData.depth) {
                            return nextFocusItem;
                        }
                    }
                }

                return null;
            }
            previousItem = getItem(previousFocusedItem);
            if (previousItem) {
                return previousItem;
            }
            return getInitialFocusItem();
        }

        function getInitialFocusItem(depth, group) {
            return getItem(initialFocusItem, depth, group) || nearestFocusableFinder.getInitial(normalizeDepth(depth), normalizeGroup(group));
        }

        function blurItem(item, originalEvent) {
            var data;

            if (Util.isFocusable(item)) {
                data = Util.getData(item);

                if (data.depth === currentDepth) {
                    trigger(item, 'blurred', [originalEvent]);

                    if (item === currentFocusItem) {
                        setItem(previousFocusedItem, item);
                        currentFocusItem = null;
                    }
                }
            }
        }

        function focusItem(item, originalEvent) {
            var data;
            if (Util.isFocusable(item) && item !== currentFocusItem) {
                data = Util.getData(item);
                if (data.depth === currentDepth && (!data.disabled || focusWhenDisabled)) {
                    if (currentFocusItem) {
                        blurItem(currentFocusItem, originalEvent);
                    }
                    trigger(item, 'focused', [originalEvent]);
                    currentGroup = data.group;
                    currentFocusItem = item;
                }
            }
        }

        function selectItem(item, originalEvent) {
            if (Util.isFocusable(item) && Util.isVisible(item)) {
                if (item === currentFocusItem && !Util.getData(item).disabled) {
                    trigger(item, 'selected', [originalEvent]);
                } else {
                    focusItem(item, originalEvent);
                }
            } else {
                item = getItem(previousFocusedItem);

                if (item) {
                    focusItem(item, originalEvent);
                } else {
                    focusItem(item = getInitialFocusItem(), originalEvent);
                }
            }
        }

        function trigger(item, type, param) {
            item && item.eventEmitter('emit', type, item, type, param);
        }

        function setItem(target, item, depth, group) {
            depth = normalizeDepth(depth);
            group = normalizeGroup(group);

            target[depth] = target[depth] || {};
            target[depth][group] = item;
        }

        function getItem(target, depth, group) {
            var item;

            depth = normalizeDepth(depth);
            group = normalizeGroup(group);

            /*if (Util.isVisible(item = target[depth] && target[depth][group]) && (!Util.getData(item).disabled || focusWhenDisabled)) {
                return item;
            }*/
            return item = target[depth] && target[depth][group];
            //return null;
        }

        function normalizeDepth(depth) {
            return depth === undefined ? currentDepth : depth;
        }

        function normalizeGroup(group) {
            return group === undefined ? currentGroup : group;
        }

        function normalizeItem(item) {
            if (!item) {
                return currentFocusItem;
            }
            return typeof item === 'string' ? nearestFocusableFinder.$$get(item) : item;
        }

        function changeDisabled(item, bool, callback) {
            var data;

            if (Util.isFocusable(item = Util.getElement(item))) {
                data = Util.getData(item);

                if (data.disabled !== bool) {
                    data.disabled = bool;
                    Util.setData(item, data);

                    if (callback) {
                        callback(item);
                    }
                }
            }
        }

        var controller = {
            getCurrentDepth: function() {
                return currentDepth;
            },
            getCurrentGroup: function() {
                return currentGroup;
            },
            getCurrentFocusItem: function() {
                return currentFocusItem;
            },
            setDepth: function(depth, group, useHistory) {
                var nextFocusItem, nextGroup;

                if (Number.isFinite(depth) && currentDepth !== depth) {
                    if (useHistory === false) {
                        nextFocusItem = getInitialFocusItem(depth, nextGroup = initialGroup[depth] || focusable.Constant.DEFAULT.GROUP);
                    } else {
                        nextFocusItem = getItem(previousFocusedItem, depth, nextGroup = group || initialGroup[depth] || focusable.Constant.DEFAULT.GROUP) || getInitialFocusItem(depth, nextGroup);
                    }

                    if (nextFocusItem) {
                        blurItem(currentFocusItem);

                        currentDepth = depth;
                        currentGroup = nextGroup;

                        focusItem(nextFocusItem);
                    }
                }
                return this;
            },
            setGroup: function(group) {
                var nextFocusItem;

                if (group && currentGroup !== group && (nextFocusItem = getItem(previousFocusedItem, currentDepth, group) || getInitialFocusItem(currentDepth, group))) {
                    blurItem(currentFocusItem);
                    currentGroup = group;
                    focusItem(nextFocusItem);
                }

                return this;
            },
            focus: function(item, originalEvent) {
                focusItem(normalizeItem(item), originalEvent);
                return this;
            },

            blur: function(item, originalEvent) {
                blurItem(normalizeItem(item), originalEvent);
                return this;
            },
            select: function(item, originalEvent) {
                selectItem(normalizeItem(item), originalEvent);
                return this;
            },
            enable: function(item) {
                changeDisabled(normalizeItem(item), false, function(element) {
                    //$(element).removeClass(DISABLED_CLASS_NAME); TODO
                });
                return this;
            },
            disable: function(item) {
                changeDisabled(normalizeItem(item), true, function(element) {
                    if (element === currentFocusItem) {
                        //blurItem(currentFocusItem, $.Event('disabled'));
                        //TODO
                    }
                    //$(element).addClass(DISABLED_CLASS_NAME); TODO
                });
                return this;
            },

            $$getNextFocusItem: getNextFocusItem,
            $$getInitialFocusItem: getInitialFocusItem,

            $$setInitialFocusItem: function(item) {
                var data;

                if (Util.isFocusable(item)) {
                    data = Util.getData(item);
                    if (data.initialFocus) {
                        setItem(initialFocusItem, item, data.depth, data.group);
                    }
                }
                return this;
            },

            $$invoke: function(type, originalEvent /*, event, originalEvent*/ ) {
                var callback = callbacks[type];
                if (callback) {
                    callback(type, originalEvent);
                }
            },

            $$unbind: function() {
                //(document).off(NAMESPACE);
            }
        };

        window.onload = function(event) {
            setTimeout(function() {
                focusItem(getItem(initialFocusItem), event);
            }, 0);
        }

        document.onkeydown = function(event) {
            var keyCode = event.keyCode || event.which || event.charCode;
            var nextFocusItem;

            /*if (beforeHandlers.some(function(handler) {
                    return handler({
                        event: event,
                        previousFocusedItem: getItem(previousFocusedItem),
                        currentFocusItem: currentFocusItem
                    }, controller) === false;
                })) {
                return;
            }*/

            switch (keyCode) {
                case currentKeyMap.LEFT:
                    nextFocusItem = getNextFocusItem(Constant.DIRECTION.LEFT);
                    break;
                case currentKeyMap.RIGHT:
                    nextFocusItem = getNextFocusItem(Constant.DIRECTION.RIGHT);
                    break;
                case currentKeyMap.UP:
                    nextFocusItem = getNextFocusItem(Constant.DIRECTION.UP);
                    break;
                case currentKeyMap.DOWN:
                    nextFocusItem = getNextFocusItem(Constant.DIRECTION.DOWN);
                    break;
                case currentKeyMap.ENTER:
                    selectItem(currentFocusItem, event);
                    break;
            }

            if (nextFocusItem) {
                if (typeof nextFocusItem === 'string') {
                    controller.setGroup(nextFocusItem);
                } else {
                    blurItem(currentFocusItem, event);
                    focusItem(nextFocusItem, event);

                    //TODO: This may need Refactoring
                    nextFocusItem.focus(keyCode);
                }
            }

            afterHandlers.forEach(function(handler) {
                handler({
                    event: event,
                    previousFocusedItem: getItem(previousFocusedItem),
                    currentFocusItem: currentFocusItem
                }, controller);
            });
        }

        return controller;
    }
}

var FOCUSED_CLASS_NAME = 'focused';
var DISABLED_CLASS_NAME = 'disabled';

function toggleDisabledClass(target) {
    var className = target.state.className;
    target.setState({
        classNames: target.focusableData.focusableDisabled ? (className + ' ' + DISABLED_CLASS_NAME) : className.replace(DISABLED_CLASS_NAME, '')
    });
}

function toggleClass(target, type) {
    var className = target.state.className;
    switch (type) {
        case 'focused':
            target.setState({
                className: className + ' ' + FOCUSED_CLASS_NAME
            });
            break;
        case 'blurred':
            target.setState({
                className: className.replace(FOCUSED_CLASS_NAME, '')
            });
            break;
    }
}

var Activation = {
    mixins: [EventEmitterMixin],
    
    componentWillMount: function() {
        var nearestFocusableFinder = focusable.nearestFocusableFinderProvider.getInstance();
        var controller = focusable.controllerProvider.getInstance();

        if (!nearestFocusableFinder.$$get(Util.getData(this).name)) {
            nearestFocusableFinder.$$put(this, this.props.focusable);
            controller.$$setInitialFocusItem(this);

            toggleDisabledClass(this);

            Util.bindMouseEvent(this, function(event) {
                console.log('bindMouseEvent cb, event:' + event.type);

                var target = event.currentTarget || event.target;

                if (controller.$$ignoreMouseEvent !== true && this.focusableData.focusableDepth === controller.getCurrentDepth()) {
                    controller[MOUSE_EVENTS[event.type]](this, event);
                }
            }.bind(this));

            Util.bindFocusableEvent(this, function(target, type, originalEvent /*event, originalEvent*/ ) {
                if (this === target) {
                    toggleClass(target, type);
                    controller.$$invoke(type, originalEvent);
                }
            });
            focusable.controllerProvider.onFocused(this.props.onFocused);
            focusable.controllerProvider.onBlurred(this.props.onBlurred);
            focusable.controllerProvider.onSelected(this.props.onSelected);
        }
    }
};

var focusable = {
    Constant: Constant,
    Util: Util,
    controllerProvider: new ControllerProvider(),
    nearestFocusableFinderProvider: new NearestFocusableFinderProvider(),
    activation: Activation
};

module.exports = focusable;