// Get GPS cordinate of the user when his/her/its device connects to OP.
// https://developers.google.com/web/fundamentals/native-hardware/user-location/

// https://docs.google.com/spreadsheets/d/1wzqpUUgSrumrRh1rye5Uh6dqLt8rnP_jmBPY8nohpPQ/edit#gid=1676738175&range=G6

// Read MAC address, IP address, GPS from the device which has connected to the Spaceweb.

// Every user(human or thing) should sign into his/her/its chrome browser to use OP.


import xs, {Stream} from 'xstream';
import isolate from '@cycle/isolate';
import {div, span, input, button, ul, VNode, DOMSource} from '@cycle/dom';
import {StateSource, makeCollection} from 'cycle-onionify';
import Item, {State as ItemState, Sources as ItemSources} from './Item';

export interface State {
  list: Array<ItemState & {key: string}>;
}

export type Reducer = (prev?: State) => State | undefined;

export type Sources = {
  DOM: DOMSource;
  onion: StateSource<State>;
}

export type Sinks = {
  DOM: Stream<VNode>;
  onion: Stream<Reducer>;
}

export type Actions = {
  add$: Stream<string>,
}

function intent(domSource: DOMSource): Actions {
  return {
    // TEAM: add 'event' from SFDriver. 
    add$: domSource.select('.input').events('input')
      .map(inputEv => domSource.select('.add').events('click').mapTo(inputEv))
      .flatten()
      .map(inputEv => (inputEv.target as HTMLInputElement).value),
  };
}

function model(actions: Actions): Stream<Reducer> {
  const initReducer$ = xs.of(function initReducer(prev?: State): State {
    return {
      list: [],
    };
  });

  const addReducer$ = actions.add$
    .map(content => function addReducer(prevState: State): State {
      return {
        list: prevState.list.concat({content, key: String(Date.now())}),
      };
    });

  return xs.merge(initReducer$, addReducer$);
}

function view(listVNode$: Stream<VNode>): Stream<VNode> {
  return listVNode$.map(ulVNode =>
    div([
      span('Init Bank Account:'),
      input('.input', {attrs: {type: 'text'}}),
      button('.add', 'Add'),
      ulVNode
    ])
  );
}

function getGeolocation(sources: Sources): Sinks {
  const List = makeCollection({
    item: Item,
    itemKey: (s: any) => s.key,
    itemScope: (key: string) => key,
    collectSinks: (instances: any) => ({
      DOM: instances.pickCombine('DOM')
        .map((itemVNodes: Array<VNode>) => ul(itemVNodes)),
      onion: instances.pickMerge('onion')
    })
  });

  const listSinks = isolate(List, 'list')(sources as any);
  const action$ = intent(sources.DOM);
  const parentReducer$ = model(action$);
  const listReducer$ = listSinks.onion as any as Stream<Reducer>;
  const reducer$ = xs.merge(parentReducer$, listReducer$);
  const vdom$ = view(listSinks.DOM);

  return {
    DOM: vdom$,
    onion: reducer$,
  }
}
