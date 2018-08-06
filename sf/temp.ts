import xs from 'xstream';
import {run} from '@cycle/run';
import {makeReactNativeDriver, TouchableOpacity, View, Text} from '@cycle/react-native';

function main(sources) {
  const inc = Symbol();
  const inc$ = sources.react.select(inc).events('click');

  const count$ = inc$.fold(count => count + 1, 0);

  const elem$ = count$.map(i =>
    TouchableOpacity(inc, [
      View([
        Text(`Counter: ${i}`),
      ])
    ]),
  );

  return {
    react: elem$,
  };
}

run(main, {
  react: makeReactNativeDriver('MyApp'),
});