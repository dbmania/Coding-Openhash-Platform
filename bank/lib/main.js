"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var run_1 = require("@cycle/run");
var dom_1 = require("@cycle/dom");
var cycle_onionify_1 = require("cycle-onionify");
var IssueNip_1 = require("./IssueNip");
var main = cycle_onionify_1.default(IssueNip_1.default);
run_1.run(main, {
    DOM: dom_1.makeDOMDriver('#main-container')
});
//# sourceMappingURL=main.js.map