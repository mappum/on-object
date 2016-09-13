var test = require('tape')
var EventEmitter = require('events')
var OnObject = require('../')

test('use as EventEmitter replacement', function (t) {
  t.plan(5)

  var emitter = new OnObject()
  t.ok(emitter instanceof EventEmitter, 'emitter is an EventEmitter')
  t.equal(emitter.on('abc', function () {
    t.pass('abc event listener called')
  }), emitter, 'original .on method returns emitter instance')
  emitter.emit('abc')

  var events = {
    xyz: function () {
      t.pass('xyz event listener called')
    }
  }
  t.equal(emitter.on(events), events, 'new .on method returns event object')
  emitter.emit('xyz')
})

test('wrap an EventEmitter', function (t) {
  t.plan(5)

  var emitter = new EventEmitter()
  var wrapped = OnObject(emitter)
  t.equal(wrapped, emitter, 'wrapping returns original EventEmitter instance')
  t.equal(emitter.on('abc', function () {
    t.pass('abc event listener called')
  }), emitter, 'original .on method returns emitter instance')
  emitter.emit('abc')

  var events = {
    xyz: function () {
      t.pass('xyz event listener called')
    }
  }
  t.equal(emitter.on(events), events, 'new .on method returns event object')
  emitter.emit('xyz')
})
