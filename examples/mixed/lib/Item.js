"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = require("xstream");
var dom_1 = require("@cycle/dom");
function Item(sources) {
    var state$ = sources.onion.state$;
    var vdom$ = state$.map(function (state) {
        return dom_1.li('.item', [
            dom_1.span('.content', state.content + " "),
            dom_1.span('.delete', '(delete)'),
            dom_1.button('.decrement', 'Decrement'),
            dom_1.button('.increment', 'Increment'),
            dom_1.span('.count', "" + state.count),
        ]);
    });
    var removeReducer$ = sources.DOM
        .select('.delete').events('click')
        .mapTo(function removeReducer(prevState) {
        return void 0;
    });
    var counterReducer$ = xstream_1.default.merge(sources.DOM.select('.increment').events('click').mapTo(+1), sources.DOM.select('.decrement').events('click').mapTo(-1)).map(function (delta) { return function counterReducer(prev) {
        return __assign({}, prev, { count: prev.count + delta });
    }; });
    var reducer$ = xstream_1.default.merge(removeReducer$, counterReducer$);
    return {
        DOM: vdom$,
        onion: reducer$,
    };
}
exports.default = Item;
//# sourceMappingURL=Item.js.map