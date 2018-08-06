"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = require("xstream");
var dom_1 = require("@cycle/dom");
function Counter(sources) {
    var action$ = xstream_1.default.merge(sources.DOM.select('.decrement').events('click').map(function (ev) { return -1; }), sources.DOM.select('.increment').events('click').map(function (ev) { return +1; }));
    var state$ = sources.onion.state$;
    var vdom$ = state$.map(function (state) {
        return dom_1.div([
            dom_1.button('.decrement', 'Decrement'),
            dom_1.button('.increment', 'Increment'),
            dom_1.p('Counter: ' + state.count)
        ]);
    });
    var initReducer$ = xstream_1.default.of(function initReducer(prevState) {
        if (prevState) {
            return prevState;
        }
        else {
            return { count: 0 };
        }
    });
    var updateReducer$ = action$
        .map(function (num) { return function updateReducer(prevState) {
        return { count: prevState.count + num };
    }; });
    var reducer$ = xstream_1.default.merge(initReducer$, updateReducer$);
    return {
        DOM: vdom$,
        onion: reducer$,
    };
}
exports.default = Counter;
//# sourceMappingURL=Counter.js.map