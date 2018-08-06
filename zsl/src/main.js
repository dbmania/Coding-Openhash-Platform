// this function shall count the number of events such as initializing zsls.
import xs from 'xstream';
import run from '@cycle/run';
import {div, p, makeDOMDriver} from '@cycle/dom';
import onionify from 'cycle-onionify';

function main(sources) {
  const state$ = sources.onion.state$;
  const vdom$ = state$.map(state => 
    div([
      p('Zsl Counter: ' + state.count)
    ])
  );

  const initialReducer$ = xs.of(function initialReducer() { return 0; });

  // TEAM: change the code below to reflect the creation and the deletion of zsls. 
  // The event shall come from SFDriver function. So, this function shall listen SFDriver's zsl-generation event. 
  const addOneReducer$ = xs.periodic(1000)
    .mapTo(function addOneReducer(prev) { return prev + 1; });
  const reducer$ = xs.merge(initialReducer$, addOneReducer$);

  return {
    DOM: vdom$,
    onion: reducer$,
  };
}

const wrappedMain = onionify(main);

run(wrappedMain, {
  DOM: makeDOMDriver('#main-container'),
});
