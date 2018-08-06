
/*
// Model would hold the definitions for the reducer streams, and return that as one reducer$ stream. Model would not return state$, as it would traditionally. Overall, onionify works well with the MVI pattern:

// Intent: maps DOM source to an action stream.
// Model: maps action streams to a reducer stream.
// View: maps state stream to virtual DOM stream.

function main(sources) {
    const state$ = sources.onion.state$;
    const action$ = intent(sources.DOM);
    const reducer$ = model(action$);
    const vdom$ = view(state$);
  
    const sinks = {
      DOM: vdom$,
      onion: reducer$,
    };
    return sinks;
  }
//*/