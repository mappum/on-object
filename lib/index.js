'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var EventEmitter = require('events');

function objectCall(method) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (_typeof(args[0]) !== 'object') return method.apply(undefined, args);
  var events = args[0];
  for (var event in events) {
    method(event, events[event]);
  }
  return events;
}

function objectMethod(emitter, methodName) {
  var method = emitter[methodName].bind(emitter);
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return objectCall.apply(undefined, [method].concat(args));
  };
}

module.exports = function (emitter) {
  if (!emitter) emitter = new EventEmitter();
  emitter.on = objectMethod(emitter, 'on');
  emitter.once = objectMethod(emitter, 'once');
  emitter.removeListener = objectMethod(emitter, 'removeListener');
  return emitter;
};