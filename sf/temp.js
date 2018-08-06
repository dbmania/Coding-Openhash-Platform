"use strict";
exports.__esModule = true;
var run_1 = require("@cycle/run");
var react_native_1 = require("@cycle/react-native");
function main(sources) {
    var inc = Symbol();
    var inc$ = sources.react.select(inc).events('click');
    var count$ = inc$.fold(function (count) { return count + 1; }, 0);
    var elem$ = count$.map(function (i) {
        return react_native_1.TouchableOpacity(inc, [
            react_native_1.View([
                react_native_1.Text("Counter: " + i),
            ])
        ]);
    });
    return {
        react: elem$
    };
}
run_1.run(main, {
    react: react_native_1.makeReactNativeDriver('MyApp')
});
