"use strict";
// https://docs.google.com/spreadsheets/d/1wzqpUUgSrumrRh1rye5Uh6dqLt8rnP_jmBPY8nohpPQ/edit#gid=1676738175&range=G6
Object.defineProperty(exports, "__esModule", { value: true });
// Read MAC address, IP address, GPS from the device which has connected to the Spaceweb.
// Every user(human or thing) should sign into his/her/its chrome browser to use OP.
var xstream_1 = require("xstream");
var isolate_1 = require("@cycle/isolate");
var dom_1 = require("@cycle/dom");
var cycle_onionify_1 = require("cycle-onionify");
var Item_1 = require("./Item");
function intent(domSource) {
    return {
        // TEAM: add 'event' from SFDriver. 
        id$: domSource.select('.idInput').events('input')
            .map(function (inputEv) { return domSource.select('.addId').events('click').mapTo(inputEv); })
            .flatten()
            .map(function (inputEv) { return inputEv.target.value; }),
        // unique IPv6 address of the zsl
        vTel$: domSource.select('.vTelInput').events('input')
            .map(function (inputEv) { return domSource.select('.addvTel').events('click').mapTo(inputEv); })
            .flatten()
            .map(function (inputEv) { return inputEv.target.value; }),
        // GPS data from the device when generating the zsl
        gps$: domSource.select('.gpsInput').events('input')
            .map(function (inputEv) { return domSource.select('.addGps').events('click').mapTo(inputEv); })
            .flatten()
            .map(function (inputEv) { return inputEv.target.value; }),
        // MAC address of the device when generating the zsl
        mac$: domSource.select('.macInput').events('input')
            .map(function (inputEv) { return domSource.select('.addMac').events('click').mapTo(inputEv); })
            .flatten()
            .map(function (inputEv) { return inputEv.target.value; }),
        // The time of zsl generation.
        time$: domSource.select('.timeInput').events('input')
            .map(function (inputEv) { return domSource.select('.addTime').events('click').mapTo(inputEv); })
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
    var idReducer$ = actions.id$
        .map(function (content) { return function addReducer(prevState) {
        return {
            list: prevState.list.concat({ content: content, key: String(Date.now()) }),
        };
    }; });
    var vTelReducer$ = actions.vTel$
        .map(function (content) { return function vTelReducer(prevState) {
        return {
            list: prevState.list.concat({ content: content, key: String(Date.now()) }),
        };
    }; });
    var gpsReducer$ = actions.gps$
        .map(function (content) { return function gpsReducer(prevState) {
        return {
            list: prevState.list.concat({ content: content, key: String(Date.now()) }),
        };
    }; });
    var macReducer$ = actions.mac$
        .map(function (content) { return function macReducer(prevState) {
        return {
            list: prevState.list.concat({ content: content, key: String(Date.now()) }),
        };
    }; });
    var timeReducer$ = actions.time$
        .map(function (content) { return function timeReducer(prevState) {
        return {
            list: prevState.list.concat({ content: content, key: String(Date.now()) }),
        };
    }; });
    return xstream_1.default.merge(initReducer$, idReducer$, vTelReducer$, gpsReducer$, macReducer$, timeReducer$);
}
function view(listVNode$) {
    return listVNode$.map(function (ulVNode) {
        return dom_1.div([
            dom_1.span('Generate Zsl Account:'),
            dom_1.input('.idInput', { attrs: { type: 'text' } }),
            dom_1.button('.addId', 'Add ID'),
            dom_1.input('.vTelInput', { attrs: { type: 'text' } }),
            dom_1.button('.addvTel', 'Add vTel'),
            dom_1.input('.gpsInput', { attrs: { type: 'text' } }),
            dom_1.button('.addGps', 'Add GPS'),
            dom_1.input('.macInput', { attrs: { type: 'text' } }),
            dom_1.button('.addMac', 'Add MAC Address'),
            dom_1.input('.timeInput', { attrs: { type: 'text' } }),
            dom_1.button('.addTime', 'Add Time'),
            ulVNode
        ]);
    });
}
function initZsl(sources) {
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
exports.default = initZsl;
//# sourceMappingURL=InitZsl.js.map