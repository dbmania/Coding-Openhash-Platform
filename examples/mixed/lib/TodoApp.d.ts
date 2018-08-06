import { Stream } from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { StateSource } from 'cycle-onionify';
import { State as CounterState } from './Counter';
import { State as ItemState } from './Item';
export declare type ItemStateWithKey = ItemState & {
    key: string;
};
export declare type State = {
    list: Array<ItemStateWithKey>;
    counter?: CounterState;
};
export declare type Reducer = (prev?: State) => State | undefined;
export declare type Sources = {
    DOM: DOMSource;
    onion: StateSource<State>;
};
export declare type Sinks = {
    DOM: Stream<VNode>;
    onion: Stream<Reducer>;
};
export declare type Actions = {
    add$: Stream<string>;
};
export default function TodoApp(sources: Sources): Sinks;
