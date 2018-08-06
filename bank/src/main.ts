import xs from 'xstream';
import {run} from '@cycle/run';
import {makeDOMDriver} from '@cycle/dom';
import onionify from 'cycle-onionify';
import IssueNip from './IssueNip';

const main = onionify(IssueNip);

run(main, {
  DOM: makeDOMDriver('#main-container')
});
