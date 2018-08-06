// ML module, particulary NLP module.
// coordinate function in OP
// all functions in OP shall give their return values to SFDriver.
// any function which require any return value from other functions shall ask SFDriver. 
// no direct communication among functions except SFDriver. 
// SFDriver ask jno function to generate hash from a return value of a function.
// SFDriver deliver the hash of a function to upper supul server.
// notice that supul server itself is just a function. 
// SFDriver also is a funtion with unique IPv6 address. 

/*
// make main.ts file

import xs from 'xstream';
import {run} from '@cycle/run';
import {makeDOMDriver} from '@cycle/dom';
import onionify from 'cycle-onionify';
import TodoApp from './TodoApp';

const main = onionify(TodoApp);

run(main, {
  DOM: makeDOMDriver('#main-container')
});

//*/
