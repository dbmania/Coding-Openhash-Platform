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
  id$: Stream<string>,
  vTel$: Stream<string>,
  gps$: Stream<string>,
  mac$: Stream<string>,
  time$: Stream<string>,
}

function intent(domSource: DOMSource): Actions {
  return {
    // TEAM: add 'event' from SFDriver. 
    id$: domSource.select('.idInput').events('input')
      .map(inputEv => domSource.select('.addId').events('click').mapTo(inputEv))
      .flatten()
      .map(inputEv => (inputEv.target as HTMLInputElement).value),

      // unique IPv6 address of the zsl
    vTel$: domSource.select('.vTelInput').events('input')
      .map(inputEv => domSource.select('.addvTel').events('click').mapTo(inputEv))
      .flatten()
      .map(inputEv => (inputEv.target as HTMLInputElement).value),

      // GPS data from the device when generating the zsl
    gps$: domSource.select('.gpsInput').events('input')
      .map(inputEv => domSource.select('.addGps').events('click').mapTo(inputEv))
      .flatten()
      .map(inputEv => (inputEv.target as HTMLInputElement).value),

      // MAC address of the device when generating the zsl
    mac$: domSource.select('.macInput').events('input')
      .map(inputEv => domSource.select('.addMac').events('click').mapTo(inputEv))
      .flatten()
      .map(inputEv => (inputEv.target as HTMLInputElement).value),

      // The time of zsl generation.
    time$: domSource.select('.timeInput').events('input')
      .map(inputEv => domSource.select('.addTime').events('click').mapTo(inputEv))
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

  const idReducer$ = actions.id$
    .map(content => function addReducer(prevState: State): State {
      return {
        list: prevState.list.concat({content, key: String(Date.now())}),
      };
    });
    const vTelReducer$ = actions.vTel$
      .map(content => function vTelReducer(prevState: State): State {
        return {
          list: prevState.list.concat({content, key: String(Date.now())}),
        };
      });
  const gpsReducer$ = actions.gps$
    .map(content => function gpsReducer(prevState: State): State {
      return {
        list: prevState.list.concat({content, key: String(Date.now())}),
      };
    });
  const macReducer$ = actions.mac$
    .map(content => function macReducer(prevState: State): State {
      return {
        list: prevState.list.concat({content, key: String(Date.now())}),
      };
    });
  const timeReducer$ = actions.time$
    .map(content => function timeReducer(prevState: State): State {
      return {
        list: prevState.list.concat({content, key: String(Date.now())}),
      };
    });

  return xs.merge(initReducer$, idReducer$, vTelReducer$, gpsReducer$, macReducer$, timeReducer$);
}

function view(listVNode$: Stream<VNode>): Stream<VNode> {
  return listVNode$.map(ulVNode =>
    div([
      span('Generate Zsl Account:'),
      input('.idInput', {attrs: {type: 'text'}}),
      button('.addId', 'Add ID'),
      input('.vTelInput', {attrs: {type: 'text'}}),
      button('.addvTel', 'Add vTel'),
      input('.gpsInput', {attrs: {type: 'text'}}),
      button('.addGps', 'Add GPS'),
      input('.macInput', {attrs: {type: 'text'}}),
      button('.addMac', 'Add MAC Address'),
      input('.timeInput', {attrs: {type: 'text'}}),
      button('.addTime', 'Add Time'),
      ulVNode
    ])
  );
}

export default function initZsl(sources: Sources): Sinks {
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
