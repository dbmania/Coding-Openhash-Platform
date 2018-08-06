"use strict";
// Standard Currency(Nip) shall be issued by each nation, and made by Team Jupeter. 
// SC(Nip) is just a ledger like other blockchains.
// To keep exchange rate among various nations which issue SC, SC is distributed to nations according their economy size in the world economy. 
// for example, if the amount of SC is one trillion, then two billion SC shall be given to Korea.
// By allocating IPv6 address on each invidual SC entity, we can trace the usage of each individual currency to prevent theft, robbery, scam...
// Each nation has one central bank, a function, and this function shall distribute SC to commercial banks of each nation. 
// The fiat currency of each nation can be exchanged with SC distributed to the nation. 
// At start, the exchange rate between SC and each fiat currency is based on US dollar. the exchange rate between USD and SC is one to one. 
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = require("xstream");
var isolate_1 = require("@cycle/isolate");
var dom_1 = require("@cycle/dom");
var cycle_onionify_1 = require("cycle-onionify");
var Item_1 = require("./Item");
function intent(domSource) {
    return {
        // TEAM: add 'event' from SFDriver. 
        add$: domSource.select('.input').events('input')
            .map(function (inputEv) { return domSource.select('.add').events('click').mapTo(inputEv); })
            .flatten()
            .map(function (inputEv) { return inputEv.target.value; }),
    };
}
function model(actions) {
    var initReducer$ = xstream_1.default.of(function initReducer(prev) {
        return {
            list: [],
        };
    });
    var addReducer$ = actions.add$
        .map(function (content) { return function addReducer(prevState) {
        return {
            list: prevState.list.concat({ content: content, key: String(Date.now()) }),
        };
    }; });
    return xstream_1.default.merge(initReducer$, addReducer$);
}
function view(listVNode$) {
    return listVNode$.map(function (ulVNode) {
        return dom_1.div([
            dom_1.span('Init Bank Account:'),
            dom_1.input('.input', { attrs: { type: 'text' } }),
            dom_1.button('.add', 'Add'),
            ulVNode
        ]);
    });
}
function IssueNip(sources) {
    var List = cycle_onionify_1.makeCollection({
        item: Item_1.default,
        itemKey: function (s) { return s.key; },
        itemScope: function (key) { return key; },
        collectSinks: function (instances) { return ({
            DOM: instances.pickCombine('DOM')
                .map(function (itemVNodes) { return dom_1.ul(itemVNodes); }),
            onion: instances.pickMerge('onion')
        }); }
    });
    var listSinks = isolate_1.default(List, 'list')(sources);
    var action$ = intent(sources.DOM);
    var parentReducer$ = model(action$);
    var listReducer$ = listSinks.onion;
    var reducer$ = xstream_1.default.merge(parentReducer$, listReducer$);
    var vdom$ = view(listSinks.DOM);
    return {
        DOM: vdom$,
        onion: reducer$,
    };
}
exports.default = IssueNip;
//# sourceMappingURL=IssueNip.js.map