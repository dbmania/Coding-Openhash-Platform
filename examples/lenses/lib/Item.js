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
var dom_1 = require("@cycle/dom");
function Item(sources) {
    var state$ = sources.onion.state$;
    var vdom$ = state$.map(function (state) {
        var style = { width: '120px', height: '20px', backgroundColor: state.selected ? 'yellow' : '' };
        return dom_1.div(dom_1.button('.item', { style: style }, state.content));
    });
    var selectReducer$ = sources.DOM
        .select('.item').events('click')
        .mapTo(function selectReducer(prevState) {
        return __assign({}, prevState, { selected: true });
    });
    return {
        DOM: vdom$,
        onion: selectReducer$,
    };
}
exports.default = Item;
//# sourceMappingURL=Item.js.map