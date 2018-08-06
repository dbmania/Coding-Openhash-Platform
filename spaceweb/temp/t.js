"use strict";
exports.__esModule = true;
var fromDiagram_1 = require("xstream/extra/fromDiagram");
var throttle_1 = require("xstream/extra/throttle");
var stream = fromDiagram_1["default"]('--1-2-----3--4----5|')
    .compose(throttle_1["default"](60));
stream.addListener({
    next: function (i) { return console.log(i); },
    error: function (err) { return console.error(err); },
    complete: function () { return console.log('completed'); }
});
