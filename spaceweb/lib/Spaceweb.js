"use strict";
// https://docs.google.com/spreadsheets/d/1wzqpUUgSrumrRh1rye5Uh6dqLt8rnP_jmBPY8nohpPQ/edit#gid=1676738175&range=G6
Object.defineProperty(exports, "__esModule", { value: true });
// Read MAC address, IP address, GPS from the device which has connected to the Spaceweb.
// Every user(human or thing) should sign into his/her/its chrome browser to use OP.
// TEAM: 
// Both isolate and onionify are for state management to prevent mixing data or component.
var xstream_1 = require("xstream");
var isolate_1 = require("@cycle/isolate"); // seperate components or data horizontally.
var dom_1 = require("@cycle/dom");
var cycle_onionify_1 = require("cycle-onionify"); // seperate components or data in onion style.
var Item_1 = require("./Item");
function intent(domSource) {
    return {
        // XMPP ejabberd id of the generated zsl. 
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
        // The bank balance of the generated zsl.
        bankBalance$: domSource.select('.bankInput').events('input')
            .map(function (inputEv) { return domSource.select('.addBankBalance').events('click').mapTo(inputEv); })
            .flatten()
            .map(function (inputEv) { return inputEv.target.value; }),
        // The energy balance of the generated zsl.
        energyBalance$: domSource.select('.energyInput').events('input')
            .map(function (inputEv) { return domSource.select('.addEnergyBalance').events('click').mapTo(inputEv); })
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
    var bankBalanceReducer$ = actions.bankBalance$
        .map(function (content) { return function bankBalanceReducer(prevState) {
        return {
            list: prevState.list.concat({ content: content, key: String(Date.now()) }),
        };
    }; });
    var energyBalanceReducer$ = actions.energyBalance$
        .map(function (content) { return function energyBalanceReducer(prevState) {
        return {
            list: prevState.list.concat({ content: content, key: String(Date.now()) }),
        };
    }; });
    return xstream_1.default.merge(initReducer$, idReducer$, vTelReducer$, gpsReducer$, macReducer$, timeReducer$, bankBalanceReducer$, energyBalanceReducer$);
}
function view(listVNode$) {
    return listVNode$.map(function (ulVNode) {
        return dom_1.div([
            dom_1.h('h3', 'Generate Zsl ID:'),
            dom_1.input('.idInput', { attrs: { type: 'text' } }),
            dom_1.button('.addId', 'Generate'),
            dom_1.h('h3', 'Generate Virtual Telephone Num:'),
            dom_1.input('.vTelInput', { attrs: { type: 'number' } }),
            dom_1.button('.addvTel', 'Generate'),
            dom_1.h('h3', 'Get GPS coordinate:'),
            dom_1.input('.gpsInput', { attrs: { type: 'number' } }),
            dom_1.button('.addGps', 'Get'),
            dom_1.h('h3', 'Get Mac Address:'),
            dom_1.input('.macInput', { attrs: { type: 'number' } }),
            dom_1.button('.addMac', 'Get'),
            dom_1.h('h3', 'Get Generation Time:'),
            dom_1.input('.timeInput', { attrs: { type: 'date' } }),
            dom_1.button('.addTime', 'Get'),
            dom_1.h('h3', 'Initialize Bank Account:'),
            dom_1.input('.bankInput', { attrs: { type: 'number' } }),
            dom_1.button('.addBankBalance', 'Init'),
            dom_1.h('h3', 'Initialize Energy Account:'),
            dom_1.input('.energyInput', { attrs: { type: 'number' } }),
            dom_1.button('.addEnergyBalance', 'Init'),
            ulVNode
        ]);
    });
}
function Spaceweb(sources) {
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
exports.default = Spaceweb;
//# sourceMappingURL=Spaceweb.js.map