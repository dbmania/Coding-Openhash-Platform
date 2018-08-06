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
        console.log('Item state update');
        return dom_1.li('.item', [
            dom_1.span('.content', state.content + " "),
            dom_1.span('.delete', '(delete)'),
            dom_1.span('.trim', '(trim)')
        ]);
    });
    var deleteReducer$ = sources.DOM
        .select('.delete').events('click')
        .mapTo(function removeReducer(prevState) {
        return void 0;
    });
    var trimReducer$ = sources.DOM
        .select('.trim').events('click')
        .mapTo(function trimReducer(prevState) {
        return __assign({}, prevState, { content: prevState.content.slice(0, -1) });
    });
    var reducer$ = xstream_1.default.merge(deleteReducer$, trimReducer$);
    return {
        DOM: vdom$,
        onion: reducer$,
    };
}
exports.default = Item;
//# sourceMappingURL=Item.js.map