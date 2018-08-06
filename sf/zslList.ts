
/*
// this function is the parent of zslFactory function.

// The StateSource type comes from onionify and you can import it as such:

import {StateSource} from 'cycle-onionify';
Then, you can compose nested state types in the parent component file:

import {State as ChildState} from './Child';

export interface State {
  list: Array<ChildState>;
}

// See some example code at examples/advanced for more details.
 //*/