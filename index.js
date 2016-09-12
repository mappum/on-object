'use strict'

const EventEmitter = require('events')

function objectCall (method, ...args) {
  if (typeof args[0] !== 'object') return method(...args)
  var events = args[0]
  for (const event in events) {
    method(event, events[event])
  }
  return events
}

function objectMethod (emitter, methodName) {
  var method = emitter[methodName].bind(emitter)
  return function (...args) {
    return objectCall(method, ...args)
  }
}

module.exports = function (emitter) {
  if (!emitter) emitter = new EventEmitter()
  emitter.on = objectMethod(emitter, 'on')
  emitter.once = objectMethod(emitter, 'once')
  emitter.removeListener = objectMethod(emitter, 'removeListener')
  return emitter
}
