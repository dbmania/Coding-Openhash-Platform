import { Stream } from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { StateSource } from 'cycle-onionify';
import { State as ItemState } from './Item';
export interface State {
    list: Array<ItemState & {
        key: string;
    }>;
}
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
