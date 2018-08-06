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
var isolate_1 = require("@cycle/isolate");
var dom_1 = require("@cycle/dom");
var cycle_onionify_1 = require("cycle-onionify");
var Counter_1 = require("./Counter");
var Item_1 = require("./Item");
function intent(domSource) {
    return {
        add$: domSource.select('.input').events('input')
            .map(function (inputEv) { return domSource.select('.add').events('click').mapTo(inputEv); })
            .flatten()
            .map(function (inputEv) { return inputEv.target.value; }),
    };
}
function model(actions) {
    var initReducer$ = xstream_1.default.of(function initReducer(prev) {
        if (prev) {
            return prev;
        }
        else {
            return { list: [] };
        }
    });
    var addReducer$ = actions.add$
        .map(function (content) { return function addReducer(prevState) {
        return __assign({}, prevState, { list: prevState.list.concat({
                content: content,
                count: prevState.counter.count,
                key: String(Date.now()),
            }) });
    }; });
    return xstream_1.default.merge(initReducer$, addReducer$);
}
function view(listVNode$, counterVNode$) {
    return xstream_1.default.combine(listVNode$, counterVNode$)
        .map(function (_a) {
        var ulVNode = _a[0], counterVNode = _a[1];
        return dom_1.div([
            counterVNode,
            dom_1.span('New task:'),
            dom_1.input('.input', { attrs: { type: 'text' } }),
            dom_1.button('.add', 'Add'),
            ulVNode
        ]);
    });
}
var List = cycle_onionify_1.makeCollection({
    item: Item_1.default,
    itemKey: function (state) { return state.key; },
    itemScope: function (key) { return key; },
    collectSinks: function (instances) { return ({
        DOM: instances.pickCombine('DOM')
            .map(function (itemVNodes) { return dom_1.ul(itemVNodes); }),
        onion: instances.pickMerge('onion'),
    }); }
});
var listLens = {
    get: function (state) {
        return state.list.map(function (item) { return (__assign({}, item, { count: state.counter.count })); });
    },
    set: function (state, listState) {
        var count = state.counter ?
            (listState.find(function (item) { return item.count !== state.counter.count; }) || state.counter).count :
            0;
        var newList = listState.map(function (item) { return (__assign({}, item, { count: count })); });
        return {
            counter: {
                count: count
            },
            list: newList,
        };
    },
};
function TodoApp(sources) {
    var listSinks = isolate_1.default(List, { onion: listLens })(sources);
    var counterSinks = isolate_1.default(Counter_1.default, { onion: 'counter' })(sources);
    var actions = intent(sources.DOM);
    var parentReducer$ = model(actions);
    var listReducer$ = listSinks.onion;
    var counterReducer$ = counterSinks.onion;
    var reducer$ = xstream_1.default.merge(parentReducer$, listReducer$, counterReducer$);
    var vdom$ = view(listSinks.DOM, counterSinks.DOM);
    return {
        DOM: vdom$,
        onion: reducer$,
    };
}
exports.default = TodoApp;
//# sourceMappingURL=TodoApp.js.map