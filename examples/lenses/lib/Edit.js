"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = require("@cycle/dom");
function Edit(sources) {
    var state$ = sources.onion.state$;
    var vdom$ = state$.map(function (state) {
        return dom_1.label([
            'Edit: ',
            dom_1.input('.content', {
                attrs: { type: 'text' },
                props: { value: state.content },
            })
        ]);
    });
    var editReducer$ = sources.DOM
        .select('.content').events('input')
        .map(function (ev) {
        return function editReducer(prevState) {
            return { content: ev.target.value };
        };
    });
    return {
        DOM: vdom$,
        onion: editReducer$,
    };
}
exports.default = Edit;
//# sourceMappingURL=Edit.js.map