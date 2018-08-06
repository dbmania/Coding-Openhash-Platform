// Standard Currency(Nip) shall be issued by each nation, and made by Team Jupeter. 
// SC(Nip) is just a ledger like other blockchains.
// To keep exchange rate among various nations which issue SC, SC is distributed to nations according their economy size in the world economy. 
// for example, if the amount of SC is one trillion, then two billion SC shall be given to Korea.
// By allocating IPv6 address on each invidual SC entity, we can trace the usage of each individual currency to prevent theft, robbery, scam...
// Each nation has one central bank, a function, and this function shall distribute SC to commercial banks of each nation. 
// The fiat currency of each nation can be exchanged with SC distributed to the nation. 
// At start, the exchange rate between SC and each fiat currency is based on US dollar. the exchange rate between USD and SC is one to one. 


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
  console.log('add$')

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
      console.log('addReducer');
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

export default function IssueNip(sources: Sources): Sinks {
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
