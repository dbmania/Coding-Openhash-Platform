import xs from 'xstream';
import {run} from '@cycle/run';
import {makeDOMDriver} from '@cycle/dom';
import onionify from 'cycle-onionify';
import Spaceweb from './Spaceweb';

const main = onionify(Spaceweb);

run(main, {
  DOM: makeDOMDriver('#main-container')
});
