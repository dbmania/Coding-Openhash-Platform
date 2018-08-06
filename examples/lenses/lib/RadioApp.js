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
var Edit_1 = require("./Edit");
var Item_1 = require("./Item");
function RadioApp(sources) {
    var initReducer$ = xstream_1.default.of(function initReducer(prev) {
        var currentIndex = 0;
        return {
            list: ['one', 'two', 'three', 'four'].map(function (item, i) {
                return ({ content: item, selected: i === currentIndex });
            }),
            currentIndex: currentIndex,
        };
    });
    var listLens = {
        get: function (state) { return state.list; },
        set: function (state, childState) {
            var idx = childState.findIndex(function (item, i) {
                return item.selected && state.currentIndex !== i;
            });
            var newCurrentIndex = idx === -1 ? state.currentIndex : idx;
            var newList = childState.map(function (item, i) {
                return (__assign({}, item, { selected: i === newCurrentIndex }));
            });
            return {
                currentIndex: newCurrentIndex,
                list: newList,
            };
        }
    };
    var selectedLens = {
        get: function (state) { return state.list[state.currentIndex]; },
        set: function (state, childState) { return (__assign({}, state, { list: state.list.map(function (item, i) {
                return i === state.currentIndex ? __assign({}, item, childState) : item;
            }) })); }
    };
    var List = cycle_onionify_1.makeCollection({
        item: Item_1.default,
        itemKey: function (state, index) { return String(index); },
        itemScope: function (key) { return key; },
        collectSinks: function (instances) { return ({
            DOM: instances.pickCombine('DOM')
                .map(function (itemVNodes) { return dom_1.div({ style: { marginTop: '20px' } }, itemVNodes); }),
            onion: instances.pickMerge('onion'),
        }); }
    });
    var listSinks = isolate_1.default(List, { onion: listLens })(sources);
    var listVDom = listSinks.DOM;
    var listReducer$ = listSinks.onion;
    var editSinks = isolate_1.default(Edit_1.default, { onion: selectedLens })(sources);
    var editVDom = editSinks.DOM;
    var editReducer$ = editSinks.onion;
    var vdom$ = xstream_1.default.combine(listVDom, editVDom)
        .map(function (_a) {
        var listVNode = _a[0], editVNode = _a[1];
        return dom_1.div([
            editVNode,
            listVNode
        ]);
    });
    var reducer$ = xstream_1.default.merge(initReducer$, listReducer$, editReducer$);
    return {
        DOM: vdom$,
        onion: reducer$,
    };
}
exports.default = RadioApp;
//# sourceMappingURL=RadioApp.js.map