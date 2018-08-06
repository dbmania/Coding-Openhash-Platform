import { Stream } from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { StateSource } from 'cycle-onionify';
import { State as ItemState } from './Item';
export declare type State = {
    list: Array<ItemState>;
    currentIndex: number;
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
export default function RadioApp(sources: Sources): Sinks;
